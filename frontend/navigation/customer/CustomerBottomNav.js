import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../../screens/customer/CustomerHome";
import Menu from "../../screens/customer/CustomerMenu";
import Cart from "../../screens/customer/CustomerCart";
import Profile from "../../screens/customer/CustomerProfile";
import { COLORS, SIZE } from "../../constants/Theme";

const BottomTab = createBottomTabNavigator();

const TabIcon = ({ focused, iconName }) => (
  <Ionicons
    name={focused ? iconName : `${iconName}-outline`}
    size={focused ? 26 : 22}
    color={focused ? 'white' : COLORS.gray}
  />
);

const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          height: 65,
          borderTopWidth: 0,
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: COLORS.primary,
          paddingHorizontal: 10,
          marginHorizontal: 20,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarLabelStyle: {
          fontSize: SIZE.small,
          fontWeight: "500",
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="menu" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="cart" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
