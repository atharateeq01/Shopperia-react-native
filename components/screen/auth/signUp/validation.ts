import * as yup from 'yup';

import { isAlphabetic, isAlphaNumeric, isValidEmail, isStrongPassword } from '@/utils/helper';

const SignUpSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .test('is-alphabetic', 'First name must contain only letters', value =>
      isAlphabetic(value || ''),
    ),

  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .test('is-alphabetic', 'Last name must contain only letters', value =>
      isAlphabetic(value || ''),
    ),

  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .test('is-alphanumeric', 'Username must contain only letters and numbers', value =>
      isAlphaNumeric(value || ''),
    ),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .test('is-valid-email', 'Invalid email format', value => isValidEmail(value || '')),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test(
      'is-strong-password',
      'Password must contain at least one uppercase letter, one number, and one special character',
      value => isStrongPassword(value || ''),
    ),
});

export default SignUpSchema;
