// 'use client';

// import type React from 'react';
// import { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Modal, Animated, Easing, Image } from 'react-native';
// import type { IProduct } from '@/utils/helper';
// import { Button } from '@/components/common/Button';
// import { Ionicons } from '@expo/vector-icons';
// import { useMutation } from '@tanstack/react-query';
// import { createCart } from '@/api/cart';

// interface IAddToCartModalProps {
//   product: IProduct;
//   isVisible: boolean;
//   onClose: () => void;
// }

// export const AddToCartModal: React.FC<IAddToCartModalProps> = ({ product, isVisible, onClose }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [animation] = useState(new Animated.Value(0));

//   const { mutate: addToCart } = useMutation({
//     mutationFn: createCart,
//     onSuccess(data, variables, context) {
//       console.log(data, variables, context);
//     },
//   });

//   useEffect(() => {
//     if (isVisible) {
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 300,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 300,
//         easing: Easing.in(Easing.ease),
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isVisible, animation]); // Added animation to dependencies

//   const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.quantity));
//   const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

//   const handleDone = () => {
//     addToCart({
//       addInCart: {
//         productId: product._id,
//         itemAmount: quantity,
//       },
//     });
//     onClose();
//   };

//   const translateY = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [300, 0],
//   });

//   return (
//   <Modal visible={!!selectedOrder} animationType="slide" transparent>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//           {selectedOrder && (
//                 <ScrollView>
//                   <View style={styles.receiptHeader}>
//                     <Text style={styles.receiptTitle}>{selectedOrder.orderName}</Text>
//                     <Text style={styles.receiptDate}>{formatDate(selectedOrder.createdAt)}</Text>
//                     <View
//                       style={[
//                         styles.statusBadge,
//                         {
//                           backgroundColor: getStatusColor(selectedOrder.orderStatus),
//                         },
//                       ]}>
//                       <Text style={styles.statusText}>{selectedOrder.orderStatus}</Text>
//                     </View>
//                   </View>
//                   {selectedOrder.Products.map(item => (
//                     <View key={item.productId._id} style={styles.productItem}>
//                       <Image source={{ uri: item.productId.image }} style={styles.productImage} />
//                       <View style={styles.productInfo}>
//                         <Text style={styles.productName}>{item.productId.name}</Text>
//                         <Text style={styles.productDescription}>{item.productId.description}</Text>
//                       </View>
//                       <View style={styles.productPricing}>
//                         <Text style={styles.productAmount}>${item.itemAmount.toFixed(2)}</Text>
//                         <Text style={styles.productDiscount}>
//                           -${item.discountApplied.toFixed(2)}
//                         </Text>
//                       </View>
//                     </View>
//                   ))}
//                   <View style={styles.receiptSummary}>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryLabel}>Subtotal:</Text>
//                       <Text style={styles.summaryValue}>${selectedOrder.orderAmount.toFixed(2)}</Text>
//                     </View>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryLabel}>Tax:</Text>
//                       <Text style={styles.summaryValue}>
//                         ${(selectedOrder.orderAmount * 0.1).toFixed(2)}
//                       </Text>
//                     </View>
//                     <View style={styles.summaryRow}>
//                       <Text style={styles.summaryTotal}>Total:</Text>
//                       <Text style={styles.summaryTotal}>
//                         ${(selectedOrder.orderAmount * 1.1).toFixed(2)}
//                       </Text>
//                     </View>
//                   </View>
//                   <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedOrder(null)}>
//                     <Text style={styles.closeButtonText}>Close Receipt</Text>
//                   </TouchableOpacity>
//                 </ScrollView>
//               )}
//             </View>
//           </View>
//         </Modal>
//   );
// };
