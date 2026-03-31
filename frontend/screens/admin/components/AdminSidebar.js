import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ADMIN, SIZE } from "../../../constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NAV_ITEMS = [
  { key: "AdminDashboard", label: "Dashboard",     icon: "grid" },
  { key: "AdminAnalytics", label: "Analytics",     icon: "bar-chart" },
  { key: "AdminCanteens",  label: "Canteens",      icon: "storefront" },
  { key: "AdminStaff",     label: "Staff",          icon: "people" },
  { key: "AdminSystem",    label: "System Control", icon: "settings" },
];

export default function AdminSidebar(props) {
  const { state, navigation } = props;
  // Get current active route name
  const activeRouteName = state?.routes?.[state?.index]?.name;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* ── Brand Header ─────────────────────── */}
      <View style={styles.brand}>
        <View style={styles.logoWrap}>
          <Ionicons name="fast-food" size={22} color={ADMIN.accent} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.brandName}>FoodNow</Text>
          <Text style={styles.brandSub}>Admin Panel</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── Navigation Items ─────────────────── */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.groupLabel}>MAIN MENU</Text>
        {NAV_ITEMS.map((item) => {
          const isActive = activeRouteName === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigation.navigate(item.key)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.navIconWrap,
                  isActive && styles.navIconWrapActive,
                ]}
              >
                <Ionicons
                  name={isActive ? item.icon : `${item.icon}-outline`}
                  size={20}
                  color={isActive ? ADMIN.accent : ADMIN.textMuted}
                />
              </View>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
              {isActive && <View style={styles.activePill} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Footer Profile ───────────────────── */}
      <View style={styles.divider} />
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.profileName}>Admin User</Text>
          <Text style={styles.profileRole}>Super Admin</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="log-out-outline" size={20} color={ADMIN.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ADMIN.navy,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: ADMIN.accent + "22",
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: SIZE.xlarge,
    fontWeight: "800",
    color: ADMIN.white,
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: SIZE.xsmall,
    color: ADMIN.textMuted,
    fontWeight: "500",
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: ADMIN.navyMid,
    marginVertical: 8,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: ADMIN.textMuted,
    letterSpacing: 1.2,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
    position: "relative",
  },
  navItemActive: {
    backgroundColor: ADMIN.accent + "18",
  },
  navIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 12,
  },
  navIconWrapActive: {
    backgroundColor: ADMIN.accent + "22",
  },
  navLabel: {
    fontSize: SIZE.medium,
    fontWeight: "500",
    color: ADMIN.textMuted,
    flex: 1,
  },
  navLabelActive: {
    color: ADMIN.white,
    fontWeight: "700",
  },
  activePill: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: ADMIN.accent,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ADMIN.navyMid,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: ADMIN.accent,
  },
  avatarText: {
    color: ADMIN.white,
    fontWeight: "700",
    fontSize: SIZE.large,
  },
  profileName: {
    color: ADMIN.white,
    fontWeight: "600",
    fontSize: SIZE.medium,
  },
  profileRole: {
    color: ADMIN.textMuted,
    fontSize: SIZE.xsmall,
    marginTop: 1,
  },
});
