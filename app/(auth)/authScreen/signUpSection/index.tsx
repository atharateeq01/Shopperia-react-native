import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView, Image } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets/images/logo-lg.png')} style={styles.logo} />
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Get Started now</Text>
        <Text style={styles.subheading}>Create an account or log in to explore about our app</Text>

        {/* Auth Form */}
        <View style={styles.authFormContainer}>
          <View className="p-4">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <View>
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
                <View>
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
                <View>
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
                <View>
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
                <View>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  subheading: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
  authFormContainer: {
    marginTop: 32,
  },
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
});

export default SignUpSection;
