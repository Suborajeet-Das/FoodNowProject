import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminDrawerNav    from "./admin/AdminDrawerNav";
import CustomerBottomNav from "./customer/CustomerBottomNav";

import SplashScreen  from "../auth/SplashScreen";
import RoleSelection from "../screens/RoleSelection";

import CustomerHome from "../screens/customer/CustomerHome";
import StaffHome    from "../screens/staff/StaffHome";
import KioskHome    from "../screens/kiosk/KioskHome";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="SplashScreen"  component={SplashScreen}      />
            <Stack.Screen name="RoleSelection" component={RoleSelection}     />
            <Stack.Screen name="CustomerTabs"  component={CustomerBottomNav} />
            {/* Admin → full Drawer-based dashboard */}
            <Stack.Screen name="AdminHome"     component={AdminDrawerNav}    options={{ headerShown: false }} />
            <Stack.Screen name="CustomerHome"  component={CustomerHome}      />
            <Stack.Screen name="StaffHome"     component={StaffHome}         />
            <Stack.Screen name="KioskHome"     component={KioskHome}         options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="Main" component={AdminDrawerNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
