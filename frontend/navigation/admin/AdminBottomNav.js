import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import Home from "../../screens/admin/AdminHome";
import { COLORS, SIZE } from "../../constants/Theme";

const TabBarBackground = () => (
  <LinearGradient
    colors={COLORS.primary}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    style={{ flex: 1 }}
  />
);

const BottomTab = createBottomTabNavigator();

const TabIcon = ({ focused, iconName }) => (
  <Ionicons
    name={focused ? iconName : `${iconName}-outline`}
    size={focused ? 26 : 22}
    color={focused ? COLORS.primarySolid : COLORS.gray}
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
          backgroundColor: "transparent",
          paddingHorizontal: 10,
          marginHorizontal: 20,
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarActiveTintColor: COLORS.primarySolid,
        tabBarInactiveTintColor: COLORS.gray,
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
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="add-circle" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Gigs"
        component={Gigs}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="mic" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Sessions"
        component={Session}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="play" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
