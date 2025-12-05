import React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

import StatCard from "../../components/StatCard";
import LineChartCard from "../../components/LineChartCard";
import BarChartCard from "../../components/BarChartCard";
import TopProductCard from "../../components/TopProductCard";

import logo from '../../assets/logo.png'

import {COLORS} from '../../constants/Theme'

export default function AdminHome() {
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

      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats Row */}
        <View style={styles.row}>
          <StatCard icon="🛒" title="Total Orders" value="200" />
          <StatCard icon="💰" title="Sales" value="₹10,000" />
        </View>

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
  container: { flex: 1, backgroundColor: COLORS.primary,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF3D7",
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 38,
    width: "55%",
  },

  searchPlaceholder: {
    marginLeft: 6,
    color: "#6A0A0A",
    fontSize: 14,
  },

  dashboardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FDF3D7",
    textAlign: "center",
    marginBottom: 10,
  },

  content: { 
    padding: 15 
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
