import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, View, StatusBar, StyleSheet, Text } from 'react-native'
import DrawerNavigator from './Navigation/DrawerNavigator'
import AppNavigator from './Navigation/AppNavigator'



const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        {/* <DrawerNavigator/> */}
        <AppNavigator/>
        
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default App