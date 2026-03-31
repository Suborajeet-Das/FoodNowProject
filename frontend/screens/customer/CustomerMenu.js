import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FilterChips from "../../components/FilterChips";
import BestSellerCard from "../../components/BestSellerCard";
import OrderPopup from "../../components/OrderPopUp";


import { BASE_URL } from "../../api/config";
import { COLORS } from "../../constants/Theme";

// Fallback images since backend doesn't store image URLs yet
const fallbackImage = require("../../assets/veg_thali.png");

const CustomerMenu = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeSlot, setTimeSlot] = useState("");
  const [addition, setAddition] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/items/canteen/1`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.id.toString(),
          title: item.name,
          price: item.price.toString(),
          image: fallbackImage,
          category: "All", // Default category
        }));
        setMenuItems(mapped);
      })
      .catch((err) => Alert.alert("Error", "Could not load menu items."))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = menuItems.filter(
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
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
        ) : filteredItems.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            No items available right now.
          </Text>
        ) : (
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
        )}
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
