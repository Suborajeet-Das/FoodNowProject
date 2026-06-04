import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SpecialCard from "../../components/SpecialCard";
import BlockCanteenPicker from "../../components/BlockCanteenPicker";
import BestSellerList from "../../components/BestSellerList";
import Header from '../../components/Header';
import OrderPopup from "../../components/OrderPopUp";


const CustomerHome = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeSlot, setTimeSlot] = useState("");
  const [addition, setAddition] = useState("");

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setTimeSlot("");
    setAddition("");
    setShowPopup(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Screen Header */}
        <Header title="Home" />

        {/* Special Offer Card */}
        <SpecialCard />

        {/* Block + Canteen Selection */}
        <BlockCanteenPicker />

        {/* Best Seller Section */}
        <Text style={styles.sectionTitle}>Our Best Seller</Text>
        <BestSellerList onItemPress={handleItemPress} />

        {/* Add bottom spacing */}
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

export default CustomerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
});
