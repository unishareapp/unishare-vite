interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Apartment {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  size: string;
  description: string;
  features: string[];
  images: string[];
  user: User;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
} 