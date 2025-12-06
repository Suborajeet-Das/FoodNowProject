import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FilterChips from "../../components/FilterChips";
import BestSellerCard from "../../components/BestSellerCard";
import OrderPopup from "../../components/OrderPopUp";

import vegthali from "../../assets/veg_thali.png";
import chai from "../../assets/chai.png";
import samosa from "../../assets/samosa.png"

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlices";

const MENU_ITEMS = [
  { id: "1", title: "Thali", price: "60", image: vegthali, category: "Thali" },
  { id: "2", title: "Chai", price: "12", image: chai, category: "Roll" },
  {
    id: "3",
    title: "Samosa",
    price: "20",
    image: samosa,
    category: "snacks",
  },
  { id: "4", title: "Chai", price: "12", image: chai, category: "Cake" },
];

const CustomerMenu = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeSlot, setTimeSlot] = useState("");
  const [addition, setAddition] = useState("");

  const dispatch = useDispatch();

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      (filter === "All" || item.category === filter) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Menu"
          logoSource={require("../../assets/logo.png")}
          onNotificationPress={() => console.log("Notification clicked")}
        />

        {/* Search bar */}
        <View style={styles.searchWrapper}>
          <SearchBar placeholder="Search your food" onChangeText={setSearch} />
        </View>

        {/* Filter Chips */}
        <FilterChips onSelect={setFilter} />

        {/* Grid Items */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <BestSellerCard
                title={item.title}
                price={item.price}
                image={item.image}
                onPress={() => {
                  setSelectedItem(item);
                  setQuantity(1);
                  setTimeSlot("");
                  setAddition("");
                  setShowPopup(true);
                }}
              />
            </View>
          )}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
      <OrderPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        item={selectedItem}
        quantity={quantity}
        setQuantity={setQuantity}
        timeSlot={timeSlot}
        setTimeSlot={setTimeSlot}
        addition={addition}
        setAddition={setAddition}
        onContinue={() => {
          dispatch(
            addToCart({
              item: selectedItem,
              quantity,
              timeSlot,
              addition,
            })
          );

          setShowPopup(false);
          navigation.navigate("Cart");
        }}
      />
    </SafeAreaView>
  );
};

export default CustomerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },

  searchWrapper: {
    marginVertical: 10,
  },

  gridItem: {
    flex: 1,
    marginBottom: 16,
  },
});
