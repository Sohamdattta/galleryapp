import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const About = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>About screen</Text>
  </View>
)

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  )
}

export default AboutStackNavigator