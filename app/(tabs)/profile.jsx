import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  return (
    <>
      <StatusBar style='dark'/>
      <SafeAreaView className='flex-1'>
        <ScrollView contentContainerStyle={{height:'100%'}}>
          <View className=''>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Profile