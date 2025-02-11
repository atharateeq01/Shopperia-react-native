import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { fetchAllOrder } from '@/api/order';
import {
  getDateThreshold,
  matchesStatus,
  matchesDate,
  matchesAmount,
  matchesOrderName,
} from '@/utils/helper';
import { IFilterState, type IOrder } from '@/utils/interface';
import { OrderFilterModal } from '@/components/section/orderFilter';
import { OrderDetailsModal } from '@/components/section/orderDetails';
import { RenderOrderItem } from '@/components/section/RenderOrderItem';
import { EmptyCart } from '@/components/section/emptyCart';

export const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState<IFilterState>({
    statusFilter: null,
    dateFilter: null,
    amountFilter: '',
    orderName: '',
  });

  const { data: orderData } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrder,
  });

  const filteredOrders = useMemo(() => {
    if (!orderData) return [];
    const { statusFilter, dateFilter, amountFilter, orderName } = filter;
    const dateThreshold = getDateThreshold(dateFilter);
    const amountThreshold = amountFilter ? parseInt(amountFilter) : null;
    const lowerCaseOrderName = orderName?.toLowerCase() || null;

    return orderData.filter(
      (order: IOrder) =>
        matchesStatus(order, statusFilter) &&
        matchesDate(order, dateThreshold) &&
        matchesAmount(order, amountThreshold) &&
        matchesOrderName(order, lowerCaseOrderName),
    );
  }, [orderData, filter]);

  const OrderList = ({ item }: { item: IOrder }) => {
    return <RenderOrderItem item={item} setSelectedOrder={setSelectedOrder} />;
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-center text-gray-800">Your Orders</Text>
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          className="flex-row items-center">
          <Ionicons name="filter-outline" size={24} color="black" />
          <Text className="ml-2 text-gray-800">Filter</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4 bg-white rounded-full shadow-sm">
        <Ionicons name="search" size={24} color="gray" style={{ marginLeft: 12 }} />
        <TextInput
          className="flex-1 p-3 pl-2"
          placeholder="Search order name"
          value={filter.orderName}
          onChangeText={e => setFilter({ ...filter, orderName: e })}
        />
      </View>
      {filteredOrders.length === 0 ? (
        <EmptyCart textMessage="No order yet." isCart={false} />
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={item => item._id}
          renderItem={OrderList}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

      )}

      {/* Order details modal */}
      <OrderDetailsModal selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />

      {/* Order filter modal */}
      <OrderFilterModal
        filter={filter}
        filterModalVisible={filterModalVisible}
        setFilter={setFilter}
        setFilterModalVisible={setFilterModalVisible}
      />
    </View>
  );
};
