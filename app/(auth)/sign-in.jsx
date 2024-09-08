import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { Image } from 'react-native'

const SignIn = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView>
        <View className='w-full h-full justify-center px-4 my-0'>
          <View className="flex-row items-center">
            <Image
              source={images.logoBlack}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
            />
            <Text className="text-black font-pbold text-3xl mt-1 ml-1">
              HyperScribe
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn