export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  joinDate: Date;
  rating: number;
  reviewCount: number;
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
    id: string | undefined;
    name: string;
    avatar: string;
  };
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  authorAvatar: string;
  date: Date;
} 