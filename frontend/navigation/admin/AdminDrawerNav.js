import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import FullProfile from '@screens/FullProfile';
import AdminSideProfile from '../../sideProfile/admin/AdminSideProfile';
import AdminMainStack from '../admin/AdminMainStack';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AdminSideProfile {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomeScreen" component={AdminMainStack} />
      <Drawer.Screen name="FullProfile" component={FullProfile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
