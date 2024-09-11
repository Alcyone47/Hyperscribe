import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const FormField = ({title, placeholder, value, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);  // New state for focus

  return (
    <View className={`flex-row items-center min-h-[50px] justify-center ${otherStyles}`}>
      <View className='flex-1'>
        <TextInput
          className={`text-[#ffffff] font-pbold text-[20px] text-center`}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? 'gray' : 'white'}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            textAlignVertical: 'center',
            height: 50,
          }}
        />
      </View>

      {/* Show/hide password icon */}
      {title === 'Password' && (
        <TouchableOpacity onPress={() => setshowPassword(!showPassword)} className='px absolute right-3'>
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-[25px] h-[25px] color-white mx-2 mb-1"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default FormField
