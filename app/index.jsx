import { ScrollView ,Text, View, Image, ImageBackground } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton'
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <>
    <StatusBar style="light" />
    <ImageBackground source={images.onboardingBg} 
      style={{flex:1}}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.1)']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} 
        start={{ x: 0.5, y: 0.4 }}  
        end={{ x: 0.5, y: 1 }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{height:'100%'}}>
          
          <View className='h-[100vh] rounded-lg shadow-lg w-full justify-center items-center'>
            <View className="flex-row justify-center items-center">
              <Image
                source={images.logoBlue}
                className="w-[60px] h-[60px]"
                resizeMode="contain"
              />
              <Text className="text-white font-pbold text-4xl mt-2 ml-1">
                HyperScribe
              </Text>
            </View>
            
            <Text className="text-white text-[15px] font-psemibold mt-3">
              Advanced Notes Digitization
            </Text>
            
            <CustomButton
              title="Get Started"
              handlePress={ () => router.push('./authOptions') }
              containerStyles="w-[80%] mt-[5%] p-4 bg-[#050505]"
              textStyles="text-white text-[18px] font-pbold"
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
    </>
  );
}