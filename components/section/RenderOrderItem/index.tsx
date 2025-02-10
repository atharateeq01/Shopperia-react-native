import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { formatDate, getStatusColor } from '@/utils/helper';
import { type IOrder } from '@/utils/interface';
import { PackageIcon, ChevronRightIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RenderOrderItemProps {
  item: IOrder;
  setSelectedOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
}

export const RenderOrderItem: React.FC<RenderOrderItemProps> = ({ item, setSelectedOrder }) => {
  return (
    <TouchableOpacity
      className="mb-4 rounded-xl overflow-hidden shadow-md active:opacity-90"
      onPress={() => setSelectedOrder(item)}>
      <LinearGradient
        colors={['#ffffff', '#f7fafc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4">
        <View className="p-3">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <PackageIcon size={24} color="#3b82f6" />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-800">{item.orderName}</Text>
                <Text className="text-sm text-gray-500">{formatDate(item.createdAt)}</Text>
              </View>
            </View>
            <ChevronRightIcon size={20} color="#9ca3af" />
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-gray-800">${item.orderAmount.toFixed(2)}</Text>
            <View className={`px-3 py-1 rounded-full ${getStatusColor(item.orderStatus)}`}>
              <Text className="text-xs font-bold text-white">{item.orderStatus}</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap">
            {item.products.slice(0, 3).map((product, index) => (
              <View key={product.productId._id} className="mr-2 mb-2">
                <Image
                  source={{ uri: product.productId.productImage }}
                  className="w-20 h-20 rounded-md"
                />
                {index === 2 && item.products.length > 3 && (
                  <View className="absolute inset-0 bg-black/50 rounded-md items-center justify-center">
                    <Text className="text-white font-bold">+{item.products.length - 3}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
