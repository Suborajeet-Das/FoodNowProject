import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slices/CartSlices";
import Header from "../../components/Header";
import { BASE_URL } from "../../api/config";

const CustomerCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // ✅ Empty cart
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Start adding delicious items!</Text>
      </SafeAreaView>
    );
  }

  // ✅ Total price from merged items
  const totalPrice = cartItems.reduce((sum, cart) => {
    return sum + Number(cart.item.price) * cart.quantity;
  }, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Build DTO
      const payload = {
        userId: 1, // Hardcoded student for now
        canteenId: 1, // Hardcoded canteen for now
        items: cartItems.map((cart) => ({
          itemId: Number(cart.item.id),
          quantity: cart.quantity,
        })),
      };

      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      const orderData = await response.json();

      // Clear the local cart now that the order is placed
      dispatch(clearCart());

      // Pass the real order data to the QR screen
      navigation.navigate("QR", { order: orderData });
    } catch (error) {
      console.warn("Checkout error:", error);
      Alert.alert("Checkout Error", "Make sure your backend is running.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header title="Cart" />

        {/* Cart items */}
        {cartItems.map((cart, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={cart.item.image} style={styles.foodImage} />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.foodTitle}>{cart.item.title}</Text>
              <Text style={styles.foodPrice}>
                ₹ {cart.item.price * cart.quantity}/-
              </Text>

              <Text style={styles.metaText}>Qty: {cart.quantity}</Text>
              {cart.addition && (
                <Text style={styles.metaText}>Add: {cart.addition}</Text>
              )}
              {cart.timeSlot && (
                <Text style={styles.metaText}>Time: {cart.timeSlot}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeFromCart(index))}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Order Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.rowSpace}>
            <Text>Items Total</Text>
            <Text>₹ {totalPrice}</Text>
          </View>

          <View style={styles.rowSpace}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalText}>₹ {totalPrice}/-</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={[styles.checkoutBtn, isCheckingOut && { opacity: 0.7 }]}
          onPress={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.checkoutText}>Checkout</Text>
          )}
        </TouchableOpacity>

        {/* Extra bottom padding so last button isn't glued to bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#777",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginTop: 20,
    elevation: 5,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  foodPrice: {
    fontSize: 14,
    marginVertical: 4,
  },
  metaText: {
    color: "#555",
    fontSize: 13,
  },
  removeBtn: {
    backgroundColor: "#B00020",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryBox: {
    backgroundColor: "#f8f8f8",
    marginTop: 25,
    padding: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalText: {
    fontWeight: "700",
    fontSize: 16,
  },
  checkoutBtn: {
    backgroundColor: "#6A0A0A",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
