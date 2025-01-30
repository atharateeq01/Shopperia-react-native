import React from 'react';
import { View, SafeAreaView, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import SignUpSchema from '@/app/(auth)/authScreen/signUpSection/validation';
import { IUserData } from '@/utils/helper';
import { showToast } from '@/utils/toast';

interface ISignUpSection {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpSection = ({ setIsLogin }: ISignUpSection) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: IUserData) => {
    try {
      // const response = await createUser(data)
      const response = { success: true, message: 'ASSA' };
      if (response.success) {
        showToast('success', 'Congrats', response.message);
        setIsLogin(true);
      }
    } catch (error: any) {
      showToast('error', 'Opps', error.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-grow px-4">
        {/* App Logo */}
        <View className="items-center mt-10">
          <Image source={require('../../../../assets/images/logo-lg.png')} className="w-20 h-20" />
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
              name="firstName"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="First name"
                    type="text"
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                    {...field}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="Last name"
                    type="text"
                    placeholder="Enter your last name"
                    error={errors.lastName?.message}
                    {...field}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="User name"
                    type="text"
                    placeholder="Enter your user name"
                    error={errors.userName?.message}
                    {...field}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View className="mb-4">
                  <InputField
                    label="Email"
                    type="email"
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
            <Button
              onPress={handleSubmit(onSubmit)}
              buttonText="Sign Up"
              variant="primary"
              iconRight={<Ionicons name="person-add" size={20} color="#fff" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpSection;
