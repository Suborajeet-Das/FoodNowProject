import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminCanteenList   from "../../screens/admin/canteens/AdminCanteenList";
import AdminCanteenDetail from "../../screens/admin/canteens/AdminCanteenDetail";

const Stack = createNativeStackNavigator();

export default function AdminCanteenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminCanteenList"   component={AdminCanteenList}   />
      <Stack.Screen name="AdminCanteenDetail" component={AdminCanteenDetail} />
    </Stack.Navigator>
  );
}
