import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../api/supabase';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const userId = sessionData.session?.user?.id;
        if (!userId) {
          throw new Error('User not found');
        }
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (userError) throw userError;
        setProfile(userData);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/authOptions'); // Navigate to the Login screen
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground source={images.onboardingBg} className="flex-1" resizeMode="cover">
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 1 }}
        />
        <SafeAreaView className="flex-1">
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="flex-1 mt-10 mb-10 justify-between">
              <View className="flex-1 px-5">
                <View className="flex-row items-center">
                  <Image source={images.logoBlue} className="w-12 h-12" resizeMode="contain" />
                  <Text className="text-white text-4xl font-bold ml-2 mt-2">Profile</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-white py-2 text-base font-medium">
                    {profile?.bio || 'No bio available.'}
                  </Text>
                </View>
              </View>
              <View className="flex-1 p-5 justify-end">
                <View className="flex items-center">
                  
                </View>
                <View className="flex mt-10 items-center">
                  <CustomButton
                    title="Log out"
                    handlePress={handleLogout}
                    containerStyles="w-[80%] mt-4 p-4 bg-black"
                    textStyles="text-white text-lg font-bold"
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

export default Profile;
