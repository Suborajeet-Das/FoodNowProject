import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import logo from "../assets/logo.png";
import { COLORS, SIZE } from "../constants/Theme";

const { height } = Dimensions.get("window");

const AuthLanding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo container */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>FoodNow</Text>
        <Text style={styles.tagline}>Smart Food. Smart Campus. Smart You.</Text>
        <Text style={styles.description}>
          Order delicious meals from your favorite campus canteens and get them delivered or ready for pickup. Quick, fresh, and simple.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="Login"
          size="full"
          onPress={() => navigation.navigate("Login")}
          style={styles.loginBtn}
        />
        <PrimaryButton
          text="Register"
          size="full"
          variant="outlined"
          onPress={() => navigation.navigate("Register")}
          style={styles.registerBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: SIZE.h1,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: SIZE.large,
    fontWeight: "600",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: SIZE.medium,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  loginBtn: {
    marginBottom: 8,
  },
  registerBtn: {
    marginTop: 8,
  },
});

export default AuthLanding;
