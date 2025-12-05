import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Theme";
import logo from '../assets/logo.png'

// Pass props: title, onNotificationPress, logoSource
const Header = ({ title }) => {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={logo}
        style={styles.logo}
      />

      {/* Page Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications-outline" size={26} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },

  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.secondary,
  },

  iconButton: {
    padding: 8,
    borderRadius: 50,
  },
});
