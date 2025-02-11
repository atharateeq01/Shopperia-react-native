import moment from 'moment';
import { IOrder, OrderStatus } from './interface';

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
export const getInitials = (firstName: string = '', lastName: string = '') => {
  return `${firstName[0]}${lastName[0]}`;
};

// Function to create first letter of name capital
export const capitalizeName = (name: string) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const statusColors: Record<OrderStatus, string> = {
  Delivered: 'text-green-500',
  Processing: 'text-blue-500',
  Cancelled: 'text-red-500',
};

export const getStatusColor = (status: OrderStatus) => {
  return statusColors[status] || 'text-gray-500';
};

export const formatDate = (date: Date) => {
  return moment(date).format('MMM D, YYYY');
};

export const getDateThreshold = (dateFilter: string | null) => {
  if (!dateFilter) return null;
  const now = moment();
  switch (dateFilter) {
    case 'A day ago':
      return now.subtract(1, 'days');
    case 'A week ago':
      return now.subtract(7, 'days');
    case 'A month ago':
      return now.subtract(1, 'months');
    default:
      return null;
  }
};

export const matchesStatus = (order: IOrder, statusFilter: string | null) =>
  !statusFilter || order.orderStatus === statusFilter;

export const matchesDate = (order: IOrder, dateThreshold: moment.Moment | null) =>
  !dateThreshold || moment(order.createdAt).isAfter(dateThreshold);

export const matchesAmount = (order: IOrder, amountThreshold: number | null) =>
  amountThreshold === null || order.orderAmount >= amountThreshold;

export const matchesOrderName = (order: IOrder, lowerCaseOrderName: string | null) =>
  !lowerCaseOrderName || order.orderName.toLowerCase().includes(lowerCaseOrderName);

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
