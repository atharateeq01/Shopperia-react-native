export const isAlphabetic = (value: string): boolean => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
};

export const isAlphaNumeric = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value);
};

export const isAlphaNumericWithSpecial = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-\s]*$/;
  return regex.test(value);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Function to create initials avatar
export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`;
};

// Function to create first letter of name capital
export const capitalizeName = (name: string) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role?: string;
}
export interface IUserData extends IUser {
  _id?: string;
  password: string;
}

export const colors = {
  primary: '#FB6831',
  primary_light: '#FFC8B2',
  primary_shadow: '#FB6A04',
  secondary: '#31C4FB',
  tertiary: '#AEE8FD',
  success: '#90ee90',
  danger: '#FF4848',
  shadow: '#E7E8EA',
  warning: '#FBD431',
  info: '#F8F9FA',
  light: '#F5F5F5',
  dark: '#343A3F',
  muted: '#707981',
  white: '#FFFFFF',
};

export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  categoryId: string;
  discount?: number;
}

export interface ICategory {
  id: string;
  name: string;
  description: string;
  image: string;
}
