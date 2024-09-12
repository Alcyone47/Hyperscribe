import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../api/supabase';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';

const profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
    
        console.log('Session Data:', sessionData); 
    
        const userId = sessionData.session?.user?.id;
        if (!userId) {
          throw new Error('User ID not found');
        }
    
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (userError) throw userError;
    
        console.log('User Data:', userData); 
        setProfile(userData);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
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
              <View className='flex-1 px-5'>
                <View className="flex-row items-center">
                  <Image source={images.logoBlue} className="w-[50px] h-[50px]" resizeMode="contain" />
                  <Text className="text-white font-pbold text-4xl ml-2 mt-2">Profile</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-white py-2 font-pmedium text-[15px]">
                    {profile?.bio || 'No bio available.'}
                  </Text>
                </View>
              </View>
              <View className='flex-1 p-5 justify-end'>
                <View className='flex items-center'>
                  <View className="bg-white p-5 rounded-lg w-full">
                    <Text className="text-[#050505] text-[18px] font-pbold">Email:</Text>
                    <Text className="text-[#050505] text-[16px]">{profile?.email || 'No email available.'}</Text>
                  </View>
                  <View className="mt-5 bg-white p-5 rounded-lg w-full">
                    <Text className="text-[#050505] text-[18px] font-pbold">Username:</Text>
                    <Text className="text-[#050505] text-[16px]">{profile?.username || 'No username available.'}</Text>
                  </View>
                </View>
                <View className='flex mt-10 items-center'>
                  <CustomButton
                    title="Edit Profile"
                    handlePress={() => { /* Navigate to edit profile screen */ }}
                    containerStyles='w-[80vw] mt-[10px] p-4 bg-[#050505]'
                    textStyles='text-white text-[18px] font-pbold'
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default profile;
