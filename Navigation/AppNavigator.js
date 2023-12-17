import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator = () => {
    return (
      <NavigationContainer independent={true}>
        <DrawerNavigator />
      </NavigationContainer>
    );
  };
  export default AppNavigator;