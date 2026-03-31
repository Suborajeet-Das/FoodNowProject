import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AdminSidebar      from "../../screens/admin/components/AdminSidebar";
import AdminDashboard    from "../../screens/admin/AdminDashboard";
import AdminAnalytics    from "../../screens/admin/AdminAnalytics";
import AdminCanteenStack from "./AdminCanteenStack";
import AdminStaff        from "../../screens/admin/AdminStaff";
import AdminSystem       from "../../screens/admin/AdminSystem";

const Drawer = createDrawerNavigator();

const AdminDrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AdminSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 260 },
        swipeEdgeWidth: 50,
      }}
      initialRouteName="AdminDashboard"
    >
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
      <Drawer.Screen name="AdminAnalytics" component={AdminAnalytics} />
      <Drawer.Screen name="AdminCanteens"  component={AdminCanteenStack} />
      <Drawer.Screen name="AdminStaff"     component={AdminStaff} />
      <Drawer.Screen name="AdminSystem"    component={AdminSystem} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNav;
