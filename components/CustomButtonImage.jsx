import { TouchableOpacity, Text, Image,View } from 'react-native'
import React from 'react'
import { images } from "../constants";

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading, buttonImage}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[50px] justify-center items-center ${containerStyles} ${isLoading?'opacity-50':''} `}
      disabled={isLoading}
    > 
    <View className='flex-1 flex-row justify-center items-center'>
      <Image
        className="w-[25px] h-[25px] mx-2 mb-1"
        resizeMode="contain"
        source={images[buttonImage]}
      />
      <Text className={`${textStyles}`}>
        {title}
      </Text>
    </View>
    </TouchableOpacity>
  )
}

export default CustomButton