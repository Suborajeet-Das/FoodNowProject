import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import logo from "../assets/logo.png";

const RoleSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>welcome to FoodNow!</Text>

      {/* Subtext */}
      <Text style={styles.subText}>Select your mode to continue --&gt;</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="Customer"
          size="medium"
          onPress={() => navigation.navigate("CustomerHome")}
        />
        <PrimaryButton
          text="Admin"
          size="medium"
          onPress={() => navigation.navigate("AdminHome")}
        />
        <PrimaryButton
          text="Staff"
          size="medium"
          onPress={() => navigation.navigate("StaffHome")}
        />
        <PrimaryButton
          text="Kiosk"
          size="medium"
          onPress={() => navigation.navigate("KioskHome")}
        />
      </View>

      {/* Continue Button */}
      <View style={{ width: "80%", alignSelf: "center", marginTop: 20 }}>
        <PrimaryButton
          text="Continue  →"
          size="full"
          onPress={() => navigation.navigate("Login")}
        />
      </View>

      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
      </Text>
    </SafeAreaView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 30,
  },

  subText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#444",
  },

  buttonContainer: {
    width: "80%",
    marginBottom: 30,
  },

  continueBtn: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },

  signupText: {
    marginTop: 10,
    fontSize: 14,
  },

  signupLink: {
    color: "#1E90FF",
    fontWeight: "600",
  },
});
