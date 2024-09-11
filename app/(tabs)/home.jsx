import { View, Text, ScrollView, Image, TextInput, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { router } from 'expo-router'
import { images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton'
import CustomButtonImage from '../../components/CustomButtonImage'


const Home = () => {
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

export default Home