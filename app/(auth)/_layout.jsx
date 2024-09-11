import { View, Text, StatusBar, BackHandler } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="authOptions"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown:false
          }}
        />
      </Stack>
      <StatusBar style='light' />
    </>
  )
}

export default AuthLayout