export interface Apartment {
  id: number;
  title: string;
  category: string;
  price: number;
  location: string;
  province: 'Cádiz' | 'Huelva' | 'Sevilla';
  coordinates: {
    lat: number;
    lng: number;
  };
  size: string;
  description: string;
  features: string[];
  images: string[];
  duration: string;
  user: User;
}

export const apartments: Apartment[] = [
  {
    id: 1,
    title: "Apartamento Moderno",
    category: "2 Bedroom",
    description: "Moderno apartamento completamente amueblado",
    price: 800,
    location: "Alameda de Hércules",
    province: "Sevilla",
    coordinates: {
      lat: 37.3991,
      lng: -5.9928
    },
    size: "75m²",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.0"
    ],
    features: ["Amueblado", "WiFi", "Cocina equipada"],
    duration: "12 meses",
    user: {
      name: "Juan Pérez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    }
  },
  {
    id: 2,
    title: "Estudio Luminoso",
    category: "Studio",
    description: "Estudio reformado con mucha luz natural",
    price: 600,
    location: "Plaza de la Catedral",
    province: "Cádiz",
    coordinates: {
      lat: 36.5297,
      lng: -6.2929
    },
    size: "40m²",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0"
    ],
    features: ["WiFi", "Lavandería", "Terraza"],
    duration: "9 meses",
    user: {
      name: "María García",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    }
  },
  {
    id: 3,
    title: "Piso luminoso",
    category: "Piso completo",
    description: "Amplio piso con mucha luz natural",
    price: 1200,
    location: "Barrio del Carmen",
    province: "Huelva",
    coordinates: {
      lat: 37.2571,
      lng: -6.9501
    },
    size: "90m²",
    images: ["https://picsum.photos/seed/apt3/800/600"],
    features: ["WiFi", "Amueblado", "Terraza", "Parking"],
    duration: "12 meses",
    user: {
      name: "Carlos Ruiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    }
  },
  {
    id: 4,
    title: "Habitación en piso compartido",
    category: "Habitación",
    description: "Habitación individual en piso compartido",
    price: 350,
    location: "Nervión",
    province: "Sevilla",
    coordinates: {
      lat: 37.3826,
      lng: -5.9736
    },
    size: "15m²",
    images: ["https://picsum.photos/seed/apt4/800/600"],
    features: ["WiFi", "Amueblado", "Lavandería"],
    duration: "6 meses",
    user: {
      name: "Ana Martínez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
    }
  },
  {
    id: 5,
    title: "Ático con vistas",
    category: "Piso completo",
    description: "Espectacular ático con vistas a la ciudad",
    price: 1500,
    location: "Plaza España",
    province: "Cádiz",
    coordinates: {
      lat: 36.5270,
      lng: -6.2885
    },
    size: "75m²",
    images: ["https://picsum.photos/seed/apt5/800/600"],
    features: ["WiFi", "Amueblado", "Terraza", "Aire acondicionado"],
    duration: "12 meses",
    user: {
      name: "Luis Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luis",
    }
  }
];

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}