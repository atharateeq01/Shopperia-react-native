'use client';

import { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface IOrder {
  _id: string;
  orderName: string;
  orderAmount: number;
  orderStatus: 'Delivered' | 'Processing' | 'Cancelled';
  createdAt: Date;
  Products: {
    productId: IProduct;
    discountApplied: number;
    itemAmount: number;
  }[];
}

const mockOrders: IOrder[] = [
  {
    _id: '1',
    orderName: 'Order #1234',
    orderAmount: 120,
    orderStatus: 'Delivered',
    createdAt: new Date('2023-05-15'),
    Products: [
      {
        productId: {
          _id: 'p1',
          name: 'Smartphone',
          description: 'Latest 5G smartphone',
          image: 'https://via.placeholder.com/50',
        },
        discountApplied: 20,
        itemAmount: 100,
      },
    ],
  },
  {
    _id: '2',
    orderName: 'Order #5678',
    orderAmount: 220,
    orderStatus: 'Processing',
    createdAt: new Date('2023-05-20'),
    Products: [
      {
        productId: {
          _id: 'p2',
          name: 'Laptop',
          description: 'High-performance laptop',
          image: 'https://via.placeholder.com/50',
        },
        discountApplied: 50,
        itemAmount: 200,
      },
    ],
  },
  {
    _id: '3',
    orderName: 'Order #9012',
    orderAmount: 80,
    orderStatus: 'Cancelled',
    createdAt: new Date('2023-05-25'),
    Products: [
      {
        productId: {
          _id: 'p3',
          name: 'Wireless Earbuds',
          description: 'Noise-cancelling earbuds',
          image: 'https://via.placeholder.com/50',
        },
        discountApplied: 10,
        itemAmount: 70,
      },
      {
        productId: {
          _id: 'p4',
          name: 'Wireless ',
          description: 'Noise-cancelling earbuds',
          image: 'https://via.placeholder.com/50',
        },
        discountApplied: 10,
        itemAmount: 70,
      },
    ],
  },
];

export const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [amountFilter, setAmountFilter] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const statusMatch = !statusFilter || order.orderStatus === statusFilter;
      const dateMatch = !dateFilter || order.createdAt.toDateString() === dateFilter.toDateString();
      const amountMatch = !amountFilter || order.orderAmount <= Number.parseFloat(amountFilter);
      return statusMatch && dateMatch && amountMatch;
    });
  }, [statusFilter, dateFilter, amountFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Processing':
        return '#FFC107';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderOrderItem = ({ item }: { item: IOrder }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => setSelectedOrder(item)}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderName}>{item.orderName}</Text>
        <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderAmount}>${item.orderAmount.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.orderStatus) }]}>
          <Text style={styles.statusText}>{item.orderStatus}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>

      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={itemValue => setStatusFilter(itemValue)}
            style={styles.picker}>
            <Picker.Item label="All Statuses" value="" />
            <Picker.Item label="Delivered" value="Delivered" />
            <Picker.Item label="Processing" value="Processing" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {dateFilter ? formatDate(dateFilter) : 'Select Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dateFilter || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateFilter(selectedDate);
              }
            }}
          />
        )}

        <TextInput
          style={styles.amountInput}
          placeholder="Max Amount"
          value={amountFilter}
          onChangeText={setAmountFilter}
          keyboardType="numeric"
        />
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item._id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={!!selectedOrder} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedOrder.orderName}</Text>
                  <Text style={styles.modalDate}>{formatDate(selectedOrder.createdAt)}</Text>
                  <View
                    style={[
                      styles.modalStatusBadge,
                      { backgroundColor: getStatusColor(selectedOrder.orderStatus) },
                    ]}>
                    <Text style={styles.modalStatusText}>{selectedOrder.orderStatus}</Text>
                  </View>
                </View>
                {selectedOrder.Products.map(item => (
                  <View key={item.productId._id} style={styles.productItem}>
                    <Image source={{ uri: item.productId.image }} style={styles.productImage} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{item.productId.name}</Text>
                      <Text style={styles.productDescription}>{item.productId.description}</Text>
                    </View>
                    <View style={styles.productPricing}>
                      <Text style={styles.productAmount}>${item.itemAmount.toFixed(2)}</Text>
                      <Text style={styles.productDiscount}>
                        -${item.discountApplied.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={styles.orderSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal:</Text>
                    <Text style={styles.summaryValue}>${selectedOrder.orderAmount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax:</Text>
                    <Text style={styles.summaryValue}>
                      ${(selectedOrder.orderAmount * 0.1).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryTotal}>Total:</Text>
                    <Text style={styles.summaryTotalValue}>
                      ${(selectedOrder.orderAmount * 1.1).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedOrder(null)}>
                  <Text style={styles.closeButtonText}>Close Receipt</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  dateButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  dateButtonText: {
    color: '#333',
  },
  amountInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modalStatusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  productPricing: {
    alignItems: 'flex-end',
  },
  productAmount: {
    fontSize: 16,
    color: '#333',
  },
  productDiscount: {
    fontSize: 14,
    color: '#F44336',
  },
  orderSummary: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
