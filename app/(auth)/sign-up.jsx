import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import CustomButtonImage from '../../components/CustomButtonImage';
import FormField from '../../components/FormField';
import { supabase } from '../api/supabase';

const Signup = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const signUpWithEmail = async () => {
    setIsSubmitting(true);
    try {
      const { error, user, data } = await supabase.auth.signUp({
        email: form.email,
        password: form.password, 
        username: form.username
      });

      if (error) {
        Alert.alert('Sign Up Error', error.message);
      } else {
        Alert.alert('Sign Up Success', `Welcome ${user.email}`);
        router.push('/home');
      }
    } catch (e) {
      Alert.alert('Sign Up Error', e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUpWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) Alert.alert('Google Sign-In Error', error.message);
  };

  return (
    <>
    <StatusBar style="light"/>

      <ImageBackground source={images.onboardingBg} style={{ flex: 1 }} resizeMode="cover">
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 1 }}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="flex-1 mt-[3.5vh] mb-[3.5vh] justify-between">
              <View className="flex-1 px-5">
                <View className="flex-row items-center">
                  <Image source={images.logoBlue} className="w-[50px] h-[50px]" resizeMode="contain" />
                  <Text className="text-white font-pbold text-4xl ml-2 mt-2">HyperScribe</Text>
                </View>
                {!keyboardVisible ? (
                  <View className="mt-5">
                    <Text className="text-white py-2 font-pmedium text-[15px]">
                      Seamlessly transforms handwritten notes into digital, making them instantly searchable, editable, and shareable across all devices. Your go-to solution for transforming handwritten notes into digital files with ease. Designed for those who value the tactile experience of writing by hand but need the convenience of digital storage.
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white text-[15px] font-psemibold mt-3 ml-">
                    Advanced Notes Digitization
                  </Text>
                )}
              </View>

              <View className="flex-1 p-5 justify-end">
                {isFocused || form.email !== '' && (
                  <>
                    <FormField
                      title="Username"
                      value={form.username}
                      handleChangeText={(e) => setForm({ ...form, username: e })}
                      otherStyles="mt-[1.5vh]"
                      placeholder="Enter your username"
                    />

                    <View className="flex-row items-center mt-[16px] mb-[16px] justify-center">
                      <View className="w-[45%] h-[1.5px] bg-white" />
                      <Image source={images.logoWhite} className="w-[16px] h-[16px] mx-3" resizeMode="contain" />
                      <View className="w-[45%] h-[1.5px] bg-white" />
                    </View>
                  </>
                )}

                <View className="flex items-center">
                  <FormField
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    otherStyles=""
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>

                {form.email === '' && (
                  <>
                    <View className="flex-row items-center my-[10px] justify-center">
                      <View className="w-[45%] h-[1.5px] bg-white" />
                      <Text className="text-[16px] mx-3 text-white font-pmedium">or</Text>
                      <View className="w-[45%] h-[1.5px] bg-white" />
                    </View>

                    <View>
                      <CustomButtonImage
                        title="Signup with Google"
                        handlePress={signUpWithGoogle}
                        buttonImage="googleLogo"
                        textStyles="text-white font-pbold text-[20px]"
                        containerStyles=""
                      />
                    </View>

                    <View className="flex mt-10 items-center">
                      <Text className="text-white text-[12px]">Already have an account?</Text>
                      <CustomButton
                        title="Go to Login"
                        handlePress={() => router.push('./authOptions')}
                        containerStyles="w-[80vw] mt-[10px] p-4 bg-[#050505]"
                        textStyles="text-white text-[18px] font-pbold"
                      />
                    </View>
                  </>
                )}

                {isFocused || form.email !== '' && (
                  <>
                    <View className="flex-row items-center mt-[16px] mb-[2px] justify-center">
                      <View className="w-[45%] h-[1.5px] bg-white" />
                      <Image source={images.logoWhite} className="w-[16px] h-[16px] mx-3" resizeMode="contain" />
                      <View className="w-[45%] h-[1.5px] bg-white" />
                    </View>

                    <FormField
                      title="Password"
                      value={form.password}
                      handleChangeText={(e) => setForm({ ...form, password: e })}
                      otherStyles="mt-[1.5vh]"
                      placeholder="Enter your password"
                      secureTextEntry
                    />

                    <View className="flex mt-10 items-center">
                      <Text className="text-white text-[12px]">Ready to go?</Text>

                      <CustomButton
                        title="Sign Up"
                        handlePress={signUpWithEmail}
                        containerStyles="w-[80vw] mt-[10px] p-4 bg-[#050505]"
                        textStyles="text-white text-[18px] font-pbold"
                        isLoading={isSubmitting}
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Signup;
