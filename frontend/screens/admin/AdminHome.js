import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

import StatCard from "../../components/StatCard";
import LineChartCard from "../../components/LineChartCard";
import BarChartCard from "../../components/BarChartCard";
import TopProductCard from "../../components/TopProductCard";

import logo from '../../assets/logo.png'
import { COLORS } from '../../constants/Theme'
import { BASE_URL } from "../../api/config";

export default function AdminHome() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders`);
        if (!res.ok) throw new Error("Failed to fetch");
        const orders = await res.json();
        
        setTotalOrders(orders.length);
        
        // Calculate total sales from completed orders, or all orders depending on business logic
        // For now, let's sum up all orders placed
        const sales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        setTotalSales(sales);
      } catch (err) {
        console.warn("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        {/* Logo */}
        <Image source={logo} style={styles.logo} />

        {/* Search Box */}
        <Text style={styles.title}>Dashboard</Text>

        {/* Menu Icon */}
        <View>
          <Ionicons name="notifications" size={26} color="white" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} />
        ) : (
          <View style={styles.row}>
            <StatCard icon="🛒" title="Total Orders" value={totalOrders.toString()} />
            <StatCard icon="💰" title="Sales" value={`₹${totalSales.toFixed(2)}`} />
          </View>
        )}

        {/* Sales Overview */}
        <LineChartCard />

        {/* Top Product */}
        <TopProductCard product="Cake" />

        {/* Order Summary */}
        <BarChartCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.primary,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.primary,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  title:{
    fontSize: 20,
    color : "white",
    fontWeight: 'bold',
  },
  content: { 
    padding: 15,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
