'use client';

import React, { useRef } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, Animated } from 'react-native';
import { formatDate, getStatusColor } from '@/utils/helper';
import { type IOrder } from '@/utils/interface';
import { Button } from '@/components/common/Button';
import { ScrollView, PanGestureHandler } from 'react-native-gesture-handler';
import { XIcon } from 'lucide-react-native';

interface IOrderDetailsModalProps {
  selectedOrder: IOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
}

export const OrderDetailsModal: React.FC<IOrderDetailsModalProps> = ({
  selectedOrder,
  setSelectedOrder,
}) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (selectedOrder) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder, opacity]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSelectedOrder(null));
  };

  const onGestureEvent = Animated.event([{ nativeEvent: { translationY: translateY } }], {
    useNativeDriver: true,
  });

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === 4) {
      if (event.nativeEvent.translationY > 50) {
        closeModal();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <Modal visible={!!selectedOrder} animationType="none" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View
            style={{
              transform: [{ translateY }],
              opacity,
            }}
            className="bg-white rounded-t-3xl p-6 w-full max-h-[90%] shadow-lg">
            {selectedOrder && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={closeModal} className="absolute right-4 top-4 z-10">
                  <Text>
                    <XIcon size={24} color="#6B7280" />
                  </Text>
                </TouchableOpacity>
                <View className="items-center mb-6 pb-4">
                  <Text className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedOrder.orderName}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-3">
                    {formatDate(selectedOrder.createdAt)}
                  </Text>
                  <View className={`px-4 py-2 rounded-full border border-gray-400`}>
                    <Text
                      className={`text-lg font-bold ${getStatusColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </Text>
                  </View>
                </View>
                {selectedOrder.products.map(item => (
                  <TouchableOpacity
                    key={item.productId._id}
                    className="flex-row mb-6 pb-4 border-b border-gray-100 active:bg-gray-50 rounded-lg p-2">
                    <Image
                      source={{ uri: item.productId.productImage }}
                      className="w-20 h-20 rounded-lg mr-4"
                    />
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-800 mb-1">
                        {item.productId.productName}
                      </Text>
                      <Text className="text-sm text-gray-600 mb-2">
                        {item.productId.productDescription}
                      </Text>
                      <View className="flex-row justify-between">
                        <Text className="text-base text-gray-800 font-semibold">
                          {`$${item.productPrice.toFixed(2)}`}
                        </Text>
                        <Text className="text-base text-gray-800">{`Qty: ${item.itemAmount}`}</Text>
                      </View>
                      <Text className="text-sm text-red-500 mt-1">
                        {item.discountApplied
                          ? `-$${item.discountApplied.toFixed(2)} discount`
                          : ''}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
                <View className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-base text-gray-600">Receiver address:</Text>
                    <Text className="text-base text-gray-800 font-semibold">
                      {selectedOrder.receiverAddress}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-base text-gray-600">Receiver phone:</Text>
                    <Text className="text-base text-gray-800 font-semibold">
                      {selectedOrder.receiverPhoneNumber}
                    </Text>
                  </View>
                </View>
                <View className="mt-6 bg-green-50 p-4 rounded-lg">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-gray-800">Total:</Text>
                    <Text className="text-2xl font-bold text-green-600">
                      ${(selectedOrder.orderAmount * 1.1).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <Button buttonText="Close Receipt" onPress={closeModal} />
              </ScrollView>
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};
