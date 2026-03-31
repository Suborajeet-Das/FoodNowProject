import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons }    from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";

import { ADMIN, SIZE }        from "../../constants/Theme";
import AdminSectionHeader     from "./components/AdminSectionHeader";

const W = Dimensions.get("window").width;

const PERIODS = ["Today", "Week", "Month"];

const REVENUE_DATA = {
  Today: { labels: ["9am","11am","1pm","3pm","5pm","7pm"], data: [800,1200,2200,1800,2800,1600] },
  Week:  { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [3200,4800,3900,5700,6200,7100,4400] },
  Month:{ labels: ["W1","W2","W3","W4"], data: [18000,24000,21000,29000] },
};

const ORDER_DATA = {
  Today: { labels: ["9am","11am","1pm","3pm","5pm","7pm"], data: [12,18,35,28,42,22] },
  Week:  { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [45,62,51,78,88,95,60] },
  Month:{ labels: ["W1","W2","W3","W4"], data: [230,310,270,380] },
};

const TOP_ITEMS = [
  { rank: 1, name: "Veg Thali",        orders: 312, revenue: "₹18,720", trend: "+12%" },
  { rank: 2, name: "Chicken Biryani",  orders: 278, revenue: "₹20,850", trend: "+8%"  },
  { rank: 3, name: "Paneer Wrap",      orders: 195, revenue: "₹11,700", trend: "+22%" },
  { rank: 4, name: "Masala Dosa",      orders: 162, revenue: "₹8,100",  trend: "-3%"  },
  { rank: 5, name: "Cold Coffee",      orders: 140, revenue: "₹7,000",  trend: "+5%"  },
];

const CHART_CONFIG = {
  backgroundGradientFrom: ADMIN.surface,
  backgroundGradientTo:   ADMIN.surface,
  decimalPlaces: 0,
  color: (o = 1) => `rgba(129,18,47,${o})`,
  labelColor: () => ADMIN.textMuted,
  propsForDots: { r: "4", strokeWidth: "2", stroke: ADMIN.accent },
  barPercentage: 0.55,
};

export default function AdminAnalytics({ navigation }) {
  const [period, setPeriod] = useState("Week");

  const revD   = REVENUE_DATA[period];
  const ordD   = ORDER_DATA[period];
  const chartW = W - 72;

  const totalRev  = revD.data.reduce((a, b) => a + b, 0);
  const totalOrd  = ordD.data.reduce((a, b) => a + b, 0);
  const avgOrd    = (totalOrd / ordD.data.length).toFixed(0);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={ADMIN.text} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Analytics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Period Toggle */}
        <View style={styles.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, period === p && styles.periodBtnActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Pills */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryPill, { backgroundColor: ADMIN.accent + "18" }]}>
            <Text style={[styles.summaryVal, { color: ADMIN.accent }]}>₹{totalRev.toLocaleString()}</Text>
            <Text style={styles.summaryLbl}>Revenue</Text>
          </View>
          <View style={[styles.summaryPill, { backgroundColor: ADMIN.green + "18" }]}>
            <Text style={[styles.summaryVal, { color: ADMIN.green }]}>{totalOrd}</Text>
            <Text style={styles.summaryLbl}>Orders</Text>
          </View>
          <View style={[styles.summaryPill, { backgroundColor: ADMIN.purple + "18" }]}>
            <Text style={[styles.summaryVal, { color: ADMIN.purple }]}>{avgOrd}</Text>
            <Text style={styles.summaryLbl}>Avg / Day</Text>
          </View>
        </View>

        {/* Revenue Chart */}
        <AdminSectionHeader title="Revenue Trend" />
        <View style={styles.chartCard}>
          <LineChart
            data={{ labels: revD.labels, datasets: [{ data: revD.data }] }}
            width={chartW}
            height={200}
            yAxisPrefix="₹"
            chartConfig={CHART_CONFIG}
            bezier
            style={{ borderRadius: 12 }}
          />
        </View>

        {/* Orders Chart */}
        <AdminSectionHeader title="Orders Volume" />
        <View style={styles.chartCard}>
          <BarChart
            data={{ labels: ordD.labels, datasets: [{ data: ordD.data }] }}
            width={chartW}
            height={200}
            chartConfig={{
              ...CHART_CONFIG,
              color: (o = 1) => `rgba(106,10,10,${o})`,
            }}
            style={{ borderRadius: 12 }}
            showValuesOnTopOfBars
          />
        </View>

        {/* Top Items */}
        <AdminSectionHeader title="Top Menu Items" />
        <View style={styles.card}>
          {TOP_ITEMS.map((item, i) => {
            const trendUp = item.trend.startsWith("+");
            return (
              <View
                key={item.rank}
                style={[styles.itemRow, i < TOP_ITEMS.length - 1 && styles.itemBorder]}
              >
                <View style={styles.rankBubble}>
                  <Text style={styles.rankText}>#{item.rank}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemOrders}>{item.orders} orders · {item.revenue}</Text>
                </View>
                <View style={[styles.trendPill, { backgroundColor: trendUp ? ADMIN.green + "18" : ADMIN.red + "18" }]}>
                  <Ionicons name={trendUp ? "trending-up" : "trending-down"} size={12} color={trendUp ? ADMIN.green : ADMIN.red} />
                  <Text style={[styles.trendText, { color: trendUp ? ADMIN.green : ADMIN.red }]}>{item.trend}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  menuBtn:    { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center", marginRight: 12 },
  pageTitle:  { fontSize: SIZE.large, fontWeight: "700", color: ADMIN.text },
  content:    { padding: 20, paddingBottom: 40 },
  periodRow:  { flexDirection: "row", backgroundColor: ADMIN.surface, borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: ADMIN.border },
  periodBtn:  { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  periodBtnActive:{ backgroundColor: ADMIN.accent },
  periodText: { fontSize: SIZE.small, fontWeight: "600", color: ADMIN.textMuted },
  periodTextActive:{ color: ADMIN.white },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  summaryPill:{ flex: 1, borderRadius: 14, padding: 14, alignItems: "center" },
  summaryVal: { fontSize: SIZE.large, fontWeight: "700" },
  summaryLbl: { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 3 },
  chartCard:  { backgroundColor: ADMIN.surface, borderRadius: 16, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: ADMIN.border, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  card:       { backgroundColor: ADMIN.surface, borderRadius: 16, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  itemRow:    { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
  itemBorder: { borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  rankBubble: { width: 32, height: 32, borderRadius: 8, backgroundColor: ADMIN.accentSoft, justifyContent: "center", alignItems: "center" },
  rankText:   { fontSize: SIZE.xsmall, fontWeight: "700", color: ADMIN.accent },
  itemName:   { fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.text },
  itemOrders: { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 2 },
  trendPill:  { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  trendText:  { fontSize: SIZE.xsmall, fontWeight: "600" },
});
