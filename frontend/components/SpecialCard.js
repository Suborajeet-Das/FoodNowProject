import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import sweets from '../assets/gulab_jamun.png'

const SpecialCard = () => {
  return (
    <View style={styles.card}>
      
      {/* Placeholder Food Image */}
      <Image
        source={sweets}
        style={styles.foodImage}
      />

      {/* Texts */}
      <Text style={styles.title}>Gulab jamun</Text>
      <Text style={styles.subtitle}>See What’s Special For You TODAY!</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get it now</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SpecialCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#6A0A0A",
    borderRadius: 20,
    padding: 16,
    marginVertical: 20,
  },

  foodImage: {
    width: 120,
    height: 120,
    alignSelf: "flex-end",
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#f9cfcf",
    fontSize: 14,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },

  buttonText: {
    color: "#6A0A0A",
    fontWeight: "600",
  },
});
