import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const BlockCanteenPicker = () => {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.dropdown}>
        <Text>Select Your Block</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dropdown}>
        <Text>Select Your Canteen</Text>
      </TouchableOpacity>

    </View>
  );
};

export default BlockCanteenPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  dropdown: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
