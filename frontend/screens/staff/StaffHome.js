import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
import { COLORS } from "../../constants/Theme";
import { BASE_URL } from "../../api/config";

const StaffHome = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Hardcoded canteen ID for testing (until auth/login context is built)
  const CANTEEN_ID = 1;

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders/canteen/${CANTEEN_ID}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      
      // Sort so active orders are at the top, completed at the bottom
      const sorted = data.sort((a, b) => {
        const orderWeight = { PENDING: 1, PREPARING: 2, READY: 3, ARRIVED: 4, COMPLETED: 5 };
        return orderWeight[a.status] - orderWeight[b.status];
      });
      
      setOrders(sorted);
    } catch (error) {
      console.warn("API Error:", error);
      Alert.alert("Network Error", "Make sure your backend is running and BASE_URL in api/config.js is correct.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Update failed");
      
      // Refresh list to pull latest states
      fetchOrders();
    } catch (error) {
      Alert.alert("Error", "Could not update order status.");
    }
  };

  const renderStatusBadge = (status) => {
    let bgColor = "#888";
    if (status === "PENDING") bgColor = "#EA4335";
    if (status === "PREPARING") bgColor = "#FBBC05";
    if (status === "READY") bgColor = "#34A853";
    if (status === "ARRIVED") bgColor = "#9B59B6"; // Purple for ARRIVED
    if (status === "COMPLETED") bgColor = "#4285F4";

    return (
      <View style={[styles.badge, { backgroundColor: bgColor }]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    );
  };

  const renderActionButton = (order) => {
    if (order.status === "PENDING") {
      return (
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#FBBC05" }]} onPress={() => updateOrderStatus(order.orderId, "PREPARING")}>
          <Text style={styles.actionBtnText}>Start Preparing</Text>
        </TouchableOpacity>
      );
    }
    if (order.status === "PREPARING") {
      return (
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#34A853" }]} onPress={() => updateOrderStatus(order.orderId, "READY")}>
          <Text style={styles.actionBtnText}>Mark as Ready</Text>
        </TouchableOpacity>
      );
    }
    if (order.status === "READY") {
      return (
        <View style={[styles.actionBtn, { backgroundColor: "#E0E0E0" }]}>
          <Text style={[styles.actionBtnText, { color: "#777" }]}>Waiting for Pickup</Text>
        </View>
      );
    }
    if (order.status === "ARRIVED") {
      return (
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#4285F4" }]} onPress={() => updateOrderStatus(order.orderId, "COMPLETED")}>
          <Text style={styles.actionBtnText}>Complete Order</Text>
        </TouchableOpacity>
      );
    }
    return null; // COMPLETED orders have no action for staff
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Order #{order.orderId}</Text>
        {renderStatusBadge(order.status)}
      </View>

      <Text style={styles.customerName}>For: {order.userFullName || `User ID: ${order.userId}`}</Text>
      
      <View style={styles.itemsList}>
        {order.items.map((lineItem, index) => (
          <Text key={index} style={styles.itemText}>
            • {lineItem.quantity}x {lineItem.itemName}
          </Text>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalPrice}>₹{order.totalPrice}</Text>
        {renderActionButton(order)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 16 }}>
        <Header title="Orders Dashboard" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No active orders right now.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default StaffHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  customerName: {
    fontSize: 15,
    color: "#555",
    marginBottom: 12,
  },
  itemsList: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2C3E50",
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 140,
    alignItems: "center",
  },
  actionBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});
