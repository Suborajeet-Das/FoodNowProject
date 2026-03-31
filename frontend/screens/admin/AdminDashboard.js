import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { ADMIN, SIZE }       from "../../constants/Theme";
import AdminKPICard          from "./components/AdminKPICard";
import AdminSectionHeader    from "./components/AdminSectionHeader";
import AdminBadge            from "./components/AdminBadge";
import { BASE_URL }          from "../../api/config";

const W = Dimensions.get("window").width;

// ── Mock / Placeholder data ─────────────────────────────────────
const WEEKLY_LABELS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKLY_REVENUE = [3200, 4800, 3900, 5700, 6200, 7100, 4400];

const RECENT_ACTIVITY = [
  { id: 1, title: "New order placed",        sub: "Main Canteen · 2 min ago",   icon: "cart",           color: ADMIN.accent },
  { id: 2, title: "Staff login detected",    sub: "Raj Kumar · 8 min ago",      icon: "person",         color: ADMIN.green },
  { id: 3, title: "Menu item updated",       sub: "Veg Thali · 15 min ago",     icon: "pencil",         color: ADMIN.orange },
  { id: 4, title: "Order marked READY",      sub: "Order #42 · 22 min ago",     icon: "checkmark-circle",color: ADMIN.green },
  { id: 5, title: "Canteen B went offline",  sub: "Block B · 1 hr ago",         icon: "warning",        color: ADMIN.red },
];

const SYSTEM_STATUS = [
  { label: "Backend API",   ok: true  },
  { label: "Database",      ok: true  },
  { label: "Notifications", ok: true  },
  { label: "QR Service",    ok: false },
];

export default function AdminDashboard({ navigation }) {
  const [totalOrders, setTotalOrders]   = useState(null);
  const [totalSales,  setTotalSales]    = useState(null);
  const [loading,     setLoading]       = useState(true);
  const [refreshing,  setRefreshing]    = useState(false);

  const fetchStats = async () => {
    try {
      const res    = await fetch(`${BASE_URL}/orders`);
      const orders = await res.json();
      setTotalOrders(orders.length);
      const sales = orders.reduce((s, o) => s + (parseFloat(o.totalPrice) || 0), 0);
      setTotalSales(sales);
    } catch {
      setTotalOrders(0);
      setTotalSales(0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);
  const onRefresh = () => { setRefreshing(true); fetchStats(); };

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* ── Top Bar ───────────────────────────── */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={ADMIN.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.greeting}>{greeting}, Admin 👋</Text>
          <Text style={styles.dateText}>
            {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color={ADMIN.text} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ADMIN.accent} />}
      >
        {/* ── Hero Gradient Banner ──────────────── */}
        <LinearGradient
          colors={[ADMIN.navyMid, ADMIN.navy]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View>
            <Text style={styles.heroTitle}>FoodNow Overview</Text>
            <Text style={styles.heroSub}>Live system snapshot — updated now</Text>
          </View>
          <View style={styles.heroRight}>
            <Ionicons name="pulse" size={40} color={ADMIN.accent + "66"} />
          </View>
        </LinearGradient>

        {/* ── KPI Cards ─────────────────────────── */}
        {loading ? (
          <ActivityIndicator color={ADMIN.accent} size="large" style={{ marginVertical: 24 }} />
        ) : (
          <>
            <View style={styles.kpiRow}>
              <AdminKPICard
                icon="cart"
                label="Total Orders"
                value={totalOrders?.toString() ?? "0"}
                trend="+14%"
                trendUp
                color={ADMIN.accent}
              />
              <AdminKPICard
                icon="cash"
                label="Revenue"
                value={`₹${(totalSales ?? 0).toFixed(0)}`}
                trend="+8%"
                trendUp
                color={ADMIN.purple}
              />
            </View>
            <View style={styles.kpiRow}>
              <AdminKPICard
                icon="storefront"
                label="Active Canteens"
                value="3"
                trend="-1"
                trendUp={false}
                color={ADMIN.green}
              />
              <AdminKPICard
                icon="people"
                label="Staff Online"
                value="7"
                trend="+2"
                trendUp
                color={ADMIN.orange}
              />
            </View>
          </>
        )}

        {/* ── Weekly Revenue Chart ──────────────── */}
        <AdminSectionHeader title="Weekly Revenue" actionLabel="View All" onAction={() => navigation.navigate("AdminAnalytics")} />
        <View style={styles.chartCard}>
          <LineChart
            data={{ labels: WEEKLY_LABELS, datasets: [{ data: WEEKLY_REVENUE }] }}
            width={W - 72}
            height={180}
            yAxisPrefix="₹"
            chartConfig={{
              backgroundGradientFrom: ADMIN.surface,
              backgroundGradientTo:   ADMIN.surface,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(129, 18, 47, ${opacity})`,
              labelColor: () => ADMIN.textMuted,
              propsForDots: { r: "4", strokeWidth: "2", stroke: ADMIN.accent },
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        </View>

        {/* ── System Status ─────────────────────── */}
        <AdminSectionHeader title="System Status" />
        <View style={styles.card}>
          {SYSTEM_STATUS.map((s, i) => (
            <View key={i} style={[styles.statusRow, i < SYSTEM_STATUS.length - 1 && styles.statusBorder]}>
              <View style={[styles.statusDot, { backgroundColor: s.ok ? ADMIN.green : ADMIN.red }]} />
              <Text style={styles.statusLabel}>{s.label}</Text>
              <Text style={[styles.statusValue, { color: s.ok ? ADMIN.green : ADMIN.red }]}>
                {s.ok ? "Operational" : "Degraded"}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Recent Activity ───────────────────── */}
        <AdminSectionHeader title="Recent Activity" actionLabel="See All" />
        <View style={styles.card}>
          {RECENT_ACTIVITY.map((item, i) => (
            <View
              key={item.id}
              style={[styles.activityRow, i < RECENT_ACTIVITY.length - 1 && styles.activityBorder]}
            >
              <View style={[styles.activityIcon, { backgroundColor: item.color + "1A" }]}>
                <Ionicons name={item.icon} size={16} color={item.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:     { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  menuBtn:    { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center" },
  greeting:   { fontSize: SIZE.medium, fontWeight: "700", color: ADMIN.text },
  dateText:   { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 1 },
  notifBtn:   { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center" },
  notifDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: ADMIN.red, position: "absolute", top: 6, right: 6 },
  scroll:     { flex: 1 },
  content:    { padding: 20, paddingBottom: 40 },
  heroBanner: { borderRadius: 18, padding: 22, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  heroTitle:  { fontSize: SIZE.h2, fontWeight: "800", color: ADMIN.white },
  heroSub:    { fontSize: SIZE.small, color: ADMIN.white + "AA", marginTop: 4 },
  heroRight:  {},
  kpiRow:     { flexDirection: "row", marginHorizontal: -5, marginBottom: 0 },
  chartCard:  { backgroundColor: ADMIN.surface, borderRadius: 16, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: ADMIN.border, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  card:       { backgroundColor: ADMIN.surface, borderRadius: 16, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  statusRow:  { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
  statusBorder:{ borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  statusDot:  { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  statusLabel:{ flex: 1, fontSize: SIZE.medium, color: ADMIN.text, fontWeight: "500" },
  statusValue:{ fontSize: SIZE.small, fontWeight: "600" },
  activityRow:{ flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 },
  activityBorder:{ borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  activityIcon:{ width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  activityTitle:{ fontSize: SIZE.small, fontWeight: "600", color: ADMIN.text },
  activitySub:  { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 2 },
});
