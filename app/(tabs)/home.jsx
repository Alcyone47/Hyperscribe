import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../api/supabase';
import { images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const Home = () => {
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user?.user?.id)
        .single();

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setUsername(data?.username || 'User');
      }
    };

    const fetchFiles = async () => {
      const { data, error } = await supabase.storage
        .from('your_bucket_name')
        .list('', {
          limit: 100,
        });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setFiles(data || []);
      }

      setLoading(false);
    };

    fetchProfile();
    fetchFiles();
  }, []);

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
              <View className="flex-1 px-5">
                <View className="flex-row items-center">
                  <Image source={images.logoBlue} className="w-[50px] h-[50px]" resizeMode="contain" />
                  <Text className="text-white font-pbold text-4xl ml-2 mt-2">HyperScribe</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-white font-pbold text-2xl">Welcome, {username}!</Text>
                </View>
              </View>

              <View className="flex-1 p-5">
                {loading ? (
                  <Text className="text-white font-pmedium text-[18px]">Loading your files...</Text>
                ) : files.length > 0 ? (
                  <View>
                    <Text className="text-white font-pmedium text-[20px] mb-4">Your Files:</Text>
                    {files.map((file, index) => (
                      <View key={index} className="mb-3">
                        <Text className="text-white font-psemibold text-[16px]">{file.name}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-white font-pmedium text-[18px]">You have not uploaded any files yet.</Text>
                )}

                <View className="flex-1 justify-end items-center mt-[20px]">
                  <CustomButton
                    title="Upload New File"
                    handlePress={() => router.push('./device')} 
                    containerStyles="w-[80vw] p-4 bg-[#050505] mb-[20px]"
                    textStyles="text-white text-[18px] font-pbold"
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

export default Home;
