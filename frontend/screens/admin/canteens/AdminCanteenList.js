import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ADMIN, SIZE }     from "../../../constants/Theme";
import AdminBadge          from "../components/AdminBadge";
import AdminSectionHeader  from "../components/AdminSectionHeader";

const CANTEENS = [
  {
    id: "1",
    name: "Main Canteen",
    location: "Block A · Ground Floor",
    status: "open",
    staff: 5,
    menuItems: 24,
    todayOrders: 88,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Block B Canteen",
    location: "Block B · 1st Floor",
    status: "closed",
    staff: 3,
    menuItems: 16,
    todayOrders: 0,
    rating: 4.2,
  },
  {
    id: "3",
    name: "Cafeteria",
    location: "Library Block · Ground Floor",
    status: "open",
    staff: 4,
    menuItems: 30,
    todayOrders: 54,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Hostel Canteen",
    location: "Hostel Block · Ground Floor",
    status: "inactive",
    staff: 0,
    menuItems: 10,
    todayOrders: 0,
    rating: 3.9,
  },
];

function CanteenCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Card header */}
      <View style={styles.cardHeader}>
        <View style={styles.canteenIcon}>
          <Ionicons name="storefront" size={22} color={ADMIN.accent} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.canteenName}>{item.name}</Text>
          <Text style={styles.canteenLoc}>
            <Ionicons name="location-outline" size={11} color={ADMIN.textMuted} /> {item.location}
          </Text>
        </View>
        <AdminBadge status={item.status} />
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <Stat icon="people-outline"   value={item.staff}       label="Staff"       />
        <View style={styles.statDivider} />
        <Stat icon="restaurant-outline" value={item.menuItems} label="Items"       />
        <View style={styles.statDivider} />
        <Stat icon="cart-outline"     value={item.todayOrders} label="Orders Today"/>
        <View style={styles.statDivider} />
        <Stat icon="star-outline"     value={item.rating}      label="Rating"      />
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.viewDetail}>View Details</Text>
        <Ionicons name="chevron-forward" size={14} color={ADMIN.accent} />
      </View>
    </TouchableOpacity>
  );
}

function Stat({ icon, value, label }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={14} color={ADMIN.accent} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function AdminCanteenList({ navigation }) {
  const [search, setSearch] = useState("");
  const filtered = CANTEENS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={ADMIN.text} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Canteens</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color={ADMIN.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Search */}
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={16} color={ADMIN.textMuted} style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search canteens..."
                placeholderTextColor={ADMIN.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Summary Pills */}
            <View style={styles.pillRow}>
              {[
                { label: "Total", count: CANTEENS.length,      color: ADMIN.accent },
                { label: "Open",  count: CANTEENS.filter(c=>c.status==="open").length,   color: ADMIN.green },
                { label: "Closed",count: CANTEENS.filter(c=>c.status==="closed").length, color: ADMIN.red },
              ].map((p) => (
                <View key={p.label} style={[styles.pill, { backgroundColor: p.color + "18" }]}>
                  <Text style={[styles.pillCount, { color: p.color }]}>{p.count}</Text>
                  <Text style={[styles.pillLabel, { color: p.color }]}>{p.label}</Text>
                </View>
              ))}
            </View>

            <AdminSectionHeader title={`All Canteens (${filtered.length})`} />
          </>
        }
        renderItem={({ item }) => (
          <CanteenCard
            item={item}
            onPress={() => navigation.navigate("AdminCanteenDetail", { canteen: item })}
          />
        )}
        ListFooterComponent={<View style={{ height: 30 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:       { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  menuBtn:      { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center", marginRight: 12 },
  pageTitle:    { flex: 1, fontSize: SIZE.large, fontWeight: "700", color: ADMIN.text },
  addBtn:       { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.accent, justifyContent: "center", alignItems: "center" },
  content:      { padding: 20, paddingBottom: 40 },
  searchWrap:   { flexDirection: "row", alignItems: "center", backgroundColor: ADMIN.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 16 },
  searchInput:  { flex: 1, fontSize: SIZE.medium, color: ADMIN.text },
  pillRow:      { flexDirection: "row", gap: 10, marginBottom: 20 },
  pill:         { flex: 1, borderRadius: 12, padding: 12, alignItems: "center" },
  pillCount:    { fontSize: SIZE.xlarge, fontWeight: "700" },
  pillLabel:    { fontSize: SIZE.xsmall, fontWeight: "500", marginTop: 2 },
  card:         { backgroundColor: ADMIN.surface, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: ADMIN.border, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 3 }, shadowRadius: 8, elevation: 3 },
  cardHeader:   { flexDirection: "row", alignItems: "center", padding: 16 },
  canteenIcon:  { width: 46, height: 46, borderRadius: 14, backgroundColor: ADMIN.accentSoft, justifyContent: "center", alignItems: "center" },
  canteenName:  { fontSize: SIZE.medium, fontWeight: "700", color: ADMIN.text },
  canteenLoc:   { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 3 },
  statsRow:     { flexDirection: "row", borderTopWidth: 1, borderTopColor: ADMIN.border, paddingVertical: 12 },
  stat:         { flex: 1, alignItems: "center", gap: 3 },
  statValue:    { fontSize: SIZE.medium, fontWeight: "700", color: ADMIN.text },
  statLabel:    { fontSize: 10, color: ADMIN.textMuted },
  statDivider:  { width: 1, backgroundColor: ADMIN.border },
  cardFooter:   { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderTopColor: ADMIN.border, backgroundColor: ADMIN.accentSoft },
  viewDetail:   { fontSize: SIZE.small, fontWeight: "600", color: ADMIN.accent, marginRight: 4 },
});
