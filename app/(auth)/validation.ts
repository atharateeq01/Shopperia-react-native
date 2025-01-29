import * as yup from 'yup';

import { isStrongPassword, isValidEmail } from '@/utils/helper';

const LoginSchema = yup.object({
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

export default LoginSchema;
