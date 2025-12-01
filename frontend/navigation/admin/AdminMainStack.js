import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminBottomNav from '../admin/AdminBottomNav'

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={AdminBottomNav} />
    </Stack.Navigator>
  );
};

export default MainStack;
