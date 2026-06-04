import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import BestSellerCard from "./BestSellerCard";

import vegthali from '../assets/veg_thali.png';
import chai from '../assets/chai.png';

const items = [
  { id: "bs-1", title: "Veg Thali", price: "60", image: vegthali },
  { id: "bs-2", title: "Chai", price: "12", image: chai },
  { id: "bs-3", title: "Dosa", price: "40", image: chai },
];

const BestSellerList = ({ onItemPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>

        {items.map((item) => (
          <BestSellerCard
            key={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() => onItemPress && onItemPress(item)}
          />
        ))}

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
