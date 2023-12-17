import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStackNavigator from './StackNavigators/HomeStacknavigator'




const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
         
      <Drawer.Screen name="Home" component={HomeStackNavigator} /> 
      
    </Drawer.Navigator>
  )
}

export default DrawerNavigator