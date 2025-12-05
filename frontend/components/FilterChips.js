import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Theme";

const FilterChips = ({ onSelect }) => {
  const filters = ["All", "Thali", "Roll", "Samosa", "Pettis", "Cake"];
  const [active, setActive] = useState("All");

  const handlePress = (item) => {
    setActive(item);
    onSelect(item);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {filters.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chip, active === item && styles.activeChip]}
            onPress={() => handlePress(item)}
          >
            <Text style={[styles.chipText, active === item && styles.activeChipText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default FilterChips;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.secondary,
  },
  activeChipText: {
    color: "#fff",
  },
});
