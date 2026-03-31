import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../api/config";

const OrderQR = ({ route }) => {
  // If navigated directly from Checkout, use that order straight away
  const initialOrder = route?.params?.order ?? null;
  const [activeOrder, setActiveOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(initialOrder === null); // Only show spinner if we have no order yet

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchActiveOrder = async () => {
        try {
          const res = await fetch(`${BASE_URL}/orders/my/1`); // Hardcoded userId = 1
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          // Find the most recent non-completed order
          const currentOrder = data.reverse().find(o => o.status !== "COMPLETED");
          if (isActive) {
            setActiveOrder(currentOrder || null);
          }
        } catch (err) {
          console.warn("QR Fetch Error:", err);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      // Fetch immediately (will update/confirm the order from the server)
      fetchActiveOrder();

      // Auto-refresh every 5s to reflect live status updates
      const interval = setInterval(fetchActiveOrder, 5000);

      return () => {
        isActive = false;
        clearInterval(interval);
      };
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!activeOrder) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No active order found!</Text>
        <Text style={{ color: "#aaa", marginTop: 8, fontSize: 13 }}>
          Place an order from the Menu first.
        </Text>
      </SafeAreaView>
    );
  }

  // The QR payload only needs the orderId for the Kiosk to verify it.
  const qrData = JSON.stringify({
    orderId: activeOrder.orderId,
  });

  const statusColor = {
    PENDING:   "#F39C12",
    PREPARING: "#3498DB",
    READY:     "#27AE60",
    ARRIVED:   "#9B59B6",
    COMPLETED: "#95A5A6",
  }[activeOrder.status] || "#888";

  return (
    <SafeAreaView style={styles.container}>
      {/* ---- TOP TITLE ---- */}
      <Text style={styles.title}>Your Pickup QR</Text>

      {/* ---- QR CARD ---- */}
      <View style={styles.card}>
        <QRCode value={qrData} size={220} />

        <Text style={styles.orderId}>
          Order #{activeOrder.orderId}
        </Text>

        <Text style={styles.cardNote}>
          Show this QR at the counter to verify your order
        </Text>
      </View>

      {/* ---- STATUS ---- */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{activeOrder.status}</Text>
      </View>

      {/* ---- FOOTER ---- */}
      <Text style={styles.footerNote}>Thank you for ordering with FoodNow! 🍱</Text>
    </SafeAreaView>
  );
};

export default OrderQR;

// ----------- STYLES -----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 25,
  },
  card: {
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "88%",
    alignItems: "center",
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  orderId: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "#2F1018",
  },
  cardNote: {
    marginTop: 10,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  statusBadge: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },
  footerNote: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
    fontWeight: "600",
  },
});
