import React, {useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../assets/logo.png'

const SplashScreen = ({navigation}) => {

   // Navigate after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("RoleSelection");  
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo/Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>
        Smart Food. Smart Campus. Smart You.
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b0a0a", // dark maroon background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  imagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#5c1313", // placeholder color matching theme
    marginBottom: 40,
  },
  logo: {
  width: 180,
  height: 180,
  resizeMode: "contain",
},

  tagline: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
