import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ICart } from '@/utils/interface';
import { colors } from '@/theme';
import { Trash2, Minus, Plus } from 'lucide-react-native';

interface CartItemsListProps {
  cartItems: ICart[];
  handleQuantityChange: (productItemId: string, newQuantity: number) => void;
  handleDeleteItem: (productItemId: string) => void;
}

export const CartItemsList = ({
  cartItems,
  handleQuantityChange,
  handleDeleteItem,
}: CartItemsListProps) => {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View className="bg-gray-100 rounded-lg p-4 mb-4 relative">
          {item.productId.discount && (
            <View className="absolute top-2 right-2 bg-red-500 py-1 px-2 rounded-md z-10">
              <Text className="text-white text-xs font-bold">{item.productId.discount}% OFF</Text>
            </View>
          )}

          <View className="flex-row">
            <Image
              source={{ uri: item.productId.productImage }}
              className="w-24 h-24 rounded-lg mr-4"
            />
            <View className="flex-1">
              <Text className="text-lg font-bold text-black">{item.productId.productName}</Text>
              <Text className="text-sm text-gray-500 mb-2">
                {item.productId.productDescription}
              </Text>
              <Text className="text-lg font-bold text-black">${item.productId.price}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center bg-white rounded-full overflow-hidden">
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.productId._id, item.itemAmount - 1)}
                className="p-2">
                <Minus size={20} color={colors.blue} />
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-bold">{item.itemAmount}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.productId._id, item.itemAmount + 1)}
                className="p-2">
                <Plus size={20} color={colors.blue} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteItem(item.productId._id)}
              className="p-2 bg-red-500 rounded-full">
              <Trash2 size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};
