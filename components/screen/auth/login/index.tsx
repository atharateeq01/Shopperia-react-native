import React from 'react';
import { View, SafeAreaView, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputField } from '@/components/common/InputField';
import { Button } from '@/components/common/Button';
import LoginSchema from '@/components/screen/auth/login/validation';
import { router } from 'expo-router';
import { useLoginUser } from '@/hooks/useLogin';

export const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { mutate } = useLoginUser();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-grow px-4">
        {/* App Logo */}
        <View className="items-center mt-10">
          <Image source={require('@/assets/images/logo.png')} className="w-40 h-40" />
        </View>

        {/* Heading */}
        <Text className="text-3xl font-bold text-center mt-6">Get Started now</Text>
        <Text className="text-gray-500 text-center mt-2">
          Create an account or log in to explore about our app
        </Text>

        {/* Auth Form */}
        <View className="mt-8">
          <View className="px-4">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...field}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...field}
                  />
                </View>
              )}
            />

            <View className="flex-1 items-end">
              <TouchableOpacity onPress={() => router.push('/(auth)/signUp')}>
                <Text className="text-blue-600 text-base mb-4">Already have an account?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              buttonText="Log In"
              variant="primary"
              iconRight={<Ionicons name="log-in-outline" size={20} color="#fff" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
