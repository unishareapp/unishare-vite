export interface User {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}

export interface Apartment {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  location: string;
  size: string;
  images: string[];
  features: string[];
  duration: string;
  user: {
    name: string;
    avatar: string;
  };
} 