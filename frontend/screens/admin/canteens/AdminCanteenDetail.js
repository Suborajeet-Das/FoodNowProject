import React from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ADMIN, SIZE }     from "../../../constants/Theme";
import AdminBadge          from "../components/AdminBadge";
import AdminSectionHeader  from "../components/AdminSectionHeader";

const MENU_ITEMS = [
  { id: "1", name: "Veg Thali",        price: "₹60",  category: "Meals",    available: true  },
  { id: "2", name: "Chicken Biryani",  price: "₹75",  category: "Meals",    available: true  },
  { id: "3", name: "Masala Dosa",      price: "₹35",  category: "Snacks",   available: false },
  { id: "4", name: "Cold Coffee",      price: "₹50",  category: "Beverages",available: true  },
  { id: "5", name: "Paneer Wrap",      price: "₹60",  category: "Snacks",   available: true  },
  { id: "6", name: "Filter Coffee",   price: "₹20",  category: "Beverages",available: true  },
];

const STAFF = [
  { id: "s1", name: "Raj Kumar",   role: "Chef",    status: "active" },
  { id: "s2", name: "Priya Singh", role: "Counter", status: "active" },
  { id: "s3", name: "Arun Das",    role: "Helper",  status: "inactive" },
];

export default function AdminCanteenDetail({ route, navigation }) {
  const canteen = route.params?.canteen ?? {
    id: "1",
    name: "Main Canteen",
    location: "Block A · Ground Floor",
    status: "open",
    staff: 5,
    menuItems: 24,
    todayOrders: 88,
    rating: 4.5,
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={ADMIN.text} />
        </TouchableOpacity>
        <Text style={styles.pageTitle} numberOfLines={1}>{canteen.name}</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="pencil-outline" size={18} color={ADMIN.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero Card */}
        <LinearGradient
          colors={[ADMIN.navyMid, ADMIN.navy]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIconRow}>
            <View style={styles.heroIcon}>
              <Ionicons name="storefront" size={28} color={ADMIN.accent} />
            </View>
            <AdminBadge status={canteen.status} />
          </View>
          <Text style={styles.heroName}>{canteen.name}</Text>
          <Text style={styles.heroLoc}>
            <Ionicons name="location-outline" size={13} color={ADMIN.white + "AA"} /> {canteen.location}
          </Text>
          {/* Stats row */}
          <View style={styles.heroStats}>
            {[
              { icon: "cart",     val: canteen.todayOrders, lbl: "Orders Today" },
              { icon: "people",   val: canteen.staff,       lbl: "Staff"        },
              { icon: "star",     val: canteen.rating,      lbl: "Rating"       },
            ].map((s) => (
              <View key={s.lbl} style={styles.heroStat}>
                <Text style={styles.heroStatVal}>{s.val}</Text>
                <Text style={styles.heroStatLbl}>{s.lbl}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: ADMIN.accent }]}>
            <Ionicons name="pencil" size={16} color={ADMIN.white} />
            <Text style={styles.actionBtnText}>Edit Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: ADMIN.red + "18" }]}>
            <Ionicons name="power" size={16} color={ADMIN.red} />
            <Text style={[styles.actionBtnText, { color: ADMIN.red }]}>Deactivate</Text>
          </TouchableOpacity>
        </View>

        {/* Staff Section */}
        <AdminSectionHeader title="Assigned Staff" actionLabel="Manage" />
        <View style={styles.card}>
          {STAFF.map((s, i) => (
            <View key={s.id} style={[styles.staffRow, i < STAFF.length - 1 && styles.rowBorder]}>
              <View style={styles.staffAvatar}>
                <Text style={styles.staffAvatarText}>{s.name[0]}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.staffName}>{s.name}</Text>
                <Text style={styles.staffRole}>{s.role}</Text>
              </View>
              <AdminBadge status={s.status} />
            </View>
          ))}
        </View>

        {/* Menu Items Section */}
        <AdminSectionHeader title="Menu Items" actionLabel={`${MENU_ITEMS.length} items`} />
        <View style={styles.card}>
          {MENU_ITEMS.map((item, i) => (
            <View key={item.id} style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.rowBorder]}>
              <View style={styles.menuIcon}>
                <Ionicons name="restaurant" size={16} color={ADMIN.accent} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuCategory}>{item.category}</Text>
              </View>
              <Text style={styles.menuPrice}>{item.price}</Text>
              <View style={{ width: 10 }} />
              <AdminBadge status={item.available ? "active" : "inactive"} label={item.available ? "On" : "Off"} />
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: ADMIN.offWhite },
  topBar:        { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: ADMIN.surface, borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  backBtn:       { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.offWhite, justifyContent: "center", alignItems: "center", marginRight: 12 },
  pageTitle:     { flex: 1, fontSize: SIZE.large, fontWeight: "700", color: ADMIN.text },
  editBtn:       { width: 38, height: 38, borderRadius: 10, backgroundColor: ADMIN.accentSoft, justifyContent: "center", alignItems: "center" },
  content:       { padding: 20, paddingBottom: 40 },
  hero:          { borderRadius: 20, padding: 22, marginBottom: 16 },
  heroIconRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  heroIcon:      { width: 52, height: 52, borderRadius: 16, backgroundColor: ADMIN.accent + "22", justifyContent: "center", alignItems: "center" },
  heroName:      { fontSize: SIZE.h2, fontWeight: "800", color: ADMIN.white, marginBottom: 4 },
  heroLoc:       { fontSize: SIZE.small, color: ADMIN.white + "AA" },
  heroStats:     { flexDirection: "row", justifyContent: "space-around", marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: ADMIN.white + "22" },
  heroStat:      { alignItems: "center" },
  heroStatVal:   { fontSize: SIZE.h2, fontWeight: "800", color: ADMIN.white },
  heroStatLbl:   { fontSize: SIZE.xsmall, color: ADMIN.white + "AA", marginTop: 2 },
  actionRow:     { flexDirection: "row", gap: 12, marginBottom: 22 },
  actionBtn:     { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 12, gap: 8 },
  actionBtnText: { fontWeight: "600", color: ADMIN.white, fontSize: SIZE.medium },
  card:          { backgroundColor: ADMIN.surface, borderRadius: 16, borderWidth: 1, borderColor: ADMIN.border, marginBottom: 20, overflow: "hidden" },
  staffRow:      { flexDirection: "row", alignItems: "center", padding: 16 },
  rowBorder:     { borderBottomWidth: 1, borderBottomColor: ADMIN.border },
  staffAvatar:   { width: 40, height: 40, borderRadius: 20, backgroundColor: ADMIN.navyMid, justifyContent: "center", alignItems: "center" },
  staffAvatarText:{ color: ADMIN.white, fontWeight: "700", fontSize: SIZE.medium },
  staffName:     { fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.text },
  staffRole:     { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 2 },
  menuRow:       { flexDirection: "row", alignItems: "center", padding: 14 },
  menuIcon:      { width: 34, height: 34, borderRadius: 10, backgroundColor: ADMIN.accentSoft, justifyContent: "center", alignItems: "center" },
  menuName:      { fontSize: SIZE.medium, fontWeight: "600", color: ADMIN.text },
  menuCategory:  { fontSize: SIZE.xsmall, color: ADMIN.textMuted, marginTop: 2 },
  menuPrice:     { fontSize: SIZE.medium, fontWeight: "700", color: ADMIN.navyMid },
});
