import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import BestSellerCard from "./BestSellerCard";

const BestSellerList = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        <BestSellerCard title="Veg Thali" price="60" />
        <BestSellerCard title="Chai" price="12" />
        <BestSellerCard title="Dosa" price="40" />
      </View>
    </ScrollView>
  );
};

export default BestSellerList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
