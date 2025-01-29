import React, { useState, ForwardedRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the props type for the InputField
interface InputFieldProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder: string;
  isDisabled?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

// Forward ref to allow parent components to pass refs to TextInput
const InputFieldComponent = React.forwardRef<TextInput, InputFieldProps>(
  (
    { label, type, placeholder, isDisabled = false, error, value, onChange }: InputFieldProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [showPassword, setShowPassword] = useState(type !== 'password');

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref} // Pass ref to the TextInput
            placeholder={placeholder}
            secureTextEntry={type === 'password' && !showPassword}
            editable={!isDisabled}
            style={[styles.input, error && styles.errorInput, isDisabled && styles.disabledInput]}
            value={value}
            onChangeText={onChange}
          />
          {type === 'password' && (
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

// Set a display name for the component
InputFieldComponent.displayName = 'InputField';

export const InputField = InputFieldComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#6B7280', // gray-500
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#374151', // gray-700
  },
  errorInput: {
    borderColor: '#EF4444', // red-500
  },
  disabledInput: {
    backgroundColor: '#F3F4F6', // gray-100
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  errorText: {
    color: '#EF4444', // red-500
    fontSize: 12,
    marginTop: 4,
  },
});
