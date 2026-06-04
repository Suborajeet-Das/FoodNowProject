import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { restoreToken } from "../redux/slices/authSlice";

import AdminDrawerNav    from "./admin/AdminDrawerNav";
import CustomerBottomNav from "./customer/CustomerBottomNav";

import SplashScreen  from "../auth/SplashScreen";
import AuthLanding   from "../auth/AuthLanding";
import Login         from "../auth/Login";
import Register      from "../auth/Register";
import RoleSelection from "../screens/RoleSelection";

import CustomerHome from "../screens/customer/CustomerHome";
import StaffHome    from "../screens/staff/StaffHome";
import KioskHome    from "../screens/kiosk/KioskHome";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Commented out for demo purposes: Do not automatically log users in on app start
    // dispatch(restoreToken());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="SplashScreen"  component={SplashScreen}      />
        <Stack.Screen name="AuthLanding"   component={AuthLanding}       />
        <Stack.Screen name="Login"         component={Login}             />
        <Stack.Screen name="Register"      component={Register}          />
        <Stack.Screen name="RoleSelection" component={RoleSelection}     />
        <Stack.Screen name="CustomerTabs"  component={CustomerBottomNav} />
        {/* Admin → full Drawer-based dashboard */}
        <Stack.Screen name="AdminHome"     component={AdminDrawerNav}    options={{ headerShown: false }} />
        <Stack.Screen name="CustomerHome"  component={CustomerHome}      />
        <Stack.Screen name="StaffHome"     component={StaffHome}         />
        <Stack.Screen name="KioskHome"     component={KioskHome}         options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
