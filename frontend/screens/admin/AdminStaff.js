import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ADMIN, SIZE }     from "../../constants/Theme";
import AdminBadge          from "./components/AdminBadge";
import AdminSectionHeader  from "./components/AdminSectionHeader";

const STAFF_LIST = [
  { id: "1", name: "Raj Kumar",   role: "Chef",       canteen: "Main Canteen",  status: "active",   joined: "Jan 2025" },
  { id: "2", name: "Priya Singh", role: "Counter",    canteen: "Main Canteen",  status: "active",   joined: "Mar 2024" },
  { id: "3", name: "Arun Das",    role: "Helper",     canteen: "Block B",       status: "inactive", joined: "Jun 2024" },
  { id: "4", name: "Sneha Nair",  role: "Chef",       canteen: "Cafeteria",     status: "active",   joined: "Sep 2023" },
  { id: "5", name: "Dev Sharma",  role: "Counter",    canteen: "Cafeteria",     status: "active",   joined: "Feb 2025" },
  { id: "6", name: "Mita Roy",    role: "Supervisor", canteen: "Main Canteen",  status: "active",   joined: "Aug 2022" },
  { id: "7", name: "Kiran Patel", role: "Helper",     canteen: "Block B",       status: "pending",  joined: "Mar 2025" },
];

const ROLES = ["All", "Chef", "Counter", "Supervisor", "Helper"];

function StaffCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: avatarColor(item.name) }]}>
          <Text style={styles.avatarText}>{item.name.split(" ").map(w => w[0]).join("").slice(0,2)}</Text>
        </View>

        {/* Info */}
        <View style={{ flex: 1, marginLeft: 14 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>
            <AdminBadge status={item.status} />
          </View>
          <Text style={styles.role}>{item.role}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="storefront-outline" size={12} color={ADMIN.textMuted} />
            <Text style={styles.meta}>{item.canteen}</Text>
            <View style={styles.dot} />
            <Ionicons name="calendar-outline" size={12} color={ADMIN.textMuted} />
            <Text style={styles.meta}>{item.joined}</Text>
          </View>
        </View>

        {/* Action */}
        <TouchableOpacity style={styles.moreBtn}>
          <Ionicons name="ellipsis-vertical" size={18} color={ADMIN.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function avatarColor(name) {
  const colors = [ADMIN.navyMid, ADMIN.accent, ADMIN.green, ADMIN.purple, ADMIN.orange];
  return colors[name.charCodeAt(0) % colors.length];
}

export default function AdminStaff({ navigation }) {
  const [search, setSearch] = useState("");
  const [role,   setRole]   = useState("All");

  const filtered = STAFF_LIST.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.canteen.toLowerCase().includes(search.toLowerCase());
    const matchRole   = role === "All" || s.role === role;
    return matchSearch && matchRole;
  });

  const activeCount  = STAFF_LIST.filter(s => s.status === "active").length;
  const pendingCount = STAFF_LIST.filter(s => s.status === "pending").length;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={ADMIN.text} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Staff</Text>
        <TouchableOpacity style={styles.inviteBtn}>
          <Ionicons name="person-add-outline" size={16} color={ADMIN.white} />
          <Text style={styles.inviteBtnText}>Invite</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Summary */}
            <View style={styles.summaryRow}>
              <SummaryPill label="Total Staff" count={STAFF_LIST.length} color={ADMIN.accent}  />
              <SummaryPill label="Active"      count={activeCount}       color={ADMIN.green}   />
              <SummaryPill label="Pending"     count={pendingCount}      color={ADMIN.orange}  />
            </View>

            {/* Search */}
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={16} color={ADMIN.textMuted} style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search staff or canteen..."
                placeholderTextColor={ADMIN.textMuted}
                value={search}
                onChangeText={setSearch}
              />
              {search ? (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Ionicons name="close-circle" size={18} color={ADMIN.textMuted} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Role Filter */}
            <View style={styles.filterRow}>
              {ROLES.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.filterChip, role === r && styles.filterChipActive]}
                  onPress={() => setRole(r)}
                >
                  <Text style={[styles.filterChipText, role === r && styles.filterChipTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <AdminSectionHeader title={`${filtered.length} Members`} />
          </>
        }
        renderItem={({ item }) => <StaffCard item={item} />}
        ListFooterComponent={<View style={{ height: 30 }} />}
      />
    </SafeAreaView>
  );
}

function SummaryPill({ label, count, color }) {
  return (
    <View style={[styles.summaryPill, { backgroundColor: color + "18" }]}>
      <Text style={[styles.summaryCount, { color }]}>{count}</Text>
      <Text style={[styles.summaryLabel, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:       { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  menuBtn:      { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center", marginRight: 12 },
  pageTitle:    { flex: 1, fontSize: SIZE.large, fontWeight: "700", color: ADMIN.text },
  inviteBtn:    { flexDirection: "row", alignItems: "center", backgroundColor: ADMIN.accent, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, gap: 6 },
  inviteBtnText:{ color: ADMIN.white, fontWeight: "600", fontSize: SIZE.small },
  content:      { padding: 20, paddingBottom: 40 },
  summaryRow:   { flexDirection: "row", gap: 10, marginBottom: 16 },
  summaryPill:  { flex: 1, borderRadius: 14, padding: 12, alignItems: "center" },
  summaryCount: { fontSize: SIZE.h2, fontWeight: "700" },
  summaryLabel: { fontSize: SIZE.xsmall, fontWeight: "500", marginTop: 2 },
  searchWrap:   { flexDirection: "row", alignItems: "center", backgroundColor: ADMIN.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 12 },
  searchInput:  { flex: 1, fontSize: SIZE.medium, color: ADMIN.text },
  filterRow:    { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  filterChip:   { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: ADMIN.surface, borderWidth: 1, borderColor: ADMIN.border },
  filterChipActive:{ backgroundColor: ADMIN.accent, borderColor: ADMIN.accent },
  filterChipText:  { fontSize: SIZE.small, color: ADMIN.textMuted, fontWeight: "500" },
  filterChipTextActive:{ color: ADMIN.white },
  card:         { backgroundColor: ADMIN.surface, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: ADMIN.border, padding: 16, shadowColor: "#000", shadowOpacity: 0.04, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  cardRow:      { flexDirection: "row", alignItems: "center" },
  avatar:       { width: 46, height: 46, borderRadius: 23, justifyContent: "center", alignItems: "center" },
  avatarText:   { color: ADMIN.white, fontWeight: "700", fontSize: SIZE.medium },
  nameRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 },
  name:         { fontSize: SIZE.medium, fontWeight: "700", color: ADMIN.text },
  role:         { fontSize: SIZE.small, color: ADMIN.textMuted, marginBottom: 4 },
  metaRow:      { flexDirection: "row", alignItems: "center", gap: 4 },
  meta:         { fontSize: SIZE.xsmall, color: ADMIN.textMuted },
  dot:          { width: 3, height: 3, borderRadius: 1.5, backgroundColor: ADMIN.textMuted },
  moreBtn:      { padding: 4 },
});
