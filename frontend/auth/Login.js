import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../redux/slices/authSlice";
import FormInput from "./components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZE } from "../constants/Theme";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Clear global auth errors when entering/leaving screen
  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  const validate = () => {
    let localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      localErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      localErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      localErrors.password = "Password is required";
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      const resultAction = await dispatch(login({ email: email.trim(), password }));
      if (login.fulfilled.match(resultAction)) {
        navigation.replace("RoleSelection");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your campus food journey</Text>
            </View>

            {/* Error Message */}
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.bannerErrorText}>{error}</Text>
              </View>
            )}

            {/* Form */}
            <View style={styles.formContainer}>
              <FormInput
                label="Email Address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                iconName="mail-outline"
                error={errors.email}
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="Enter your password"
                secureTextEntry
                iconName="lock-closed-outline"
                error={errors.password}
              />

              <PrimaryButton
                text="Log In"
                size="full"
                loading={loading}
                onPress={handleLogin}
                style={styles.loginBtn}
              />
            </View>

            {/* Bottom Link */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.footerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: SIZE.h1,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZE.large,
    color: "#666",
    lineHeight: 20,
  },
  errorBanner: {
    backgroundColor: "#FFEBEB",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFC2C2",
    marginBottom: 20,
  },
  bannerErrorText: {
    color: "red",
    fontSize: SIZE.medium,
    fontWeight: "500",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  loginBtn: {
    marginTop: 10,
    height: 56,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    fontSize: SIZE.medium,
    color: "#666",
  },
  footerLink: {
    fontSize: SIZE.medium,
    color: COLORS.secondary,
    fontWeight: "700",
  },
});

export default Login;
