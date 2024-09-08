import { View, Text } from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import {icons} from '../../constants';
import { Image } from 'react-native';

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color:color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel:false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor:'silver',
          tabBarStyle:{
            height:75,
            backgroundColor:'white',
            /* borderTopColor:'silver',
            borderTopWidth:1 */
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title:'Home',
            headerShown: false,
            tabBarIcon: ({color,focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name = "Home"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="camera"
          options={{
            title:'Camera',
            headerShown: false,
            tabBarIcon: ({color,focused}) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name = "Camera"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="device"
          options={{
            title:'Device',
            headerShown: false,
            tabBarIcon: ({color,focused}) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name = "Device"
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title:'Profile',
            headerShown: false,
            tabBarIcon: ({color,focused}) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name = "Profile"
                focused={focused}
              />
            )
          }}
        />

      </Tabs>
      
    </>
  )
}

export default TabsLayout