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
import { register, clearError } from "../redux/slices/authSlice";
import FormInput from "./components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZE } from "../constants/Theme";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!fullName.trim()) {
      localErrors.fullName = "Full Name is required";
    }

    if (!email.trim()) {
      localErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      localErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      localErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.trim().replace(/[-+\s()]/g, ""))) {
      localErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (!password) {
      localErrors.password = "Password is required";
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      localErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      localErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      const resultAction = await dispatch(
        register({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
        })
      );
      if (register.fulfilled.match(resultAction)) {
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join FoodNow and start ordering smart</Text>
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
                label="Full Name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName) setErrors({ ...errors, fullName: null });
                }}
                placeholder="Enter your full name"
                iconName="person-outline"
                error={errors.fullName}
              />

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
                label="Phone Number"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                iconName="call-outline"
                error={errors.phone}
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="Create a password"
                secureTextEntry
                iconName="lock-closed-outline"
                error={errors.password}
              />

              <FormInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                placeholder="Confirm your password"
                secureTextEntry
                iconName="lock-closed-outline"
                error={errors.confirmPassword}
              />

              <PrimaryButton
                text="Register"
                size="full"
                loading={loading}
                onPress={handleRegister}
                style={styles.registerBtn}
              />
            </View>

            {/* Bottom Link */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerLink}>Login</Text>
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
    paddingVertical: 30,
  },
  headerContainer: {
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: SIZE.h2 * 1.2,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 6,
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
  registerBtn: {
    marginTop: 10,
    height: 56,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 10,
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

export default Register;
