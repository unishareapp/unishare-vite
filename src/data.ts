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
  duration: string;
  user: User;
}

export const apartments: Apartment[] = [
  {
    id: 1,
    title: "Apartamento céntrico",
    category: "Piso compartido",
    description: "Hermoso apartamento en el centro de la ciudad",
    price: 800,
    location: "Centro de la ciudad",
    size: "60m²",
    images: ["https://picsum.photos/seed/apt1/800/600"],
    features: ["WiFi", "Amueblado"],
    duration: "12 meses",
    user: {
      name: "Juan Pérez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    }
  },
  {
    id: 2,
    title: "Estudio moderno",
    category: "Estudio",
    description: "Estudio completamente equipado",
    price: 600,
    location: "Campus universitario",
    size: "35m²",
    images: ["https://picsum.photos/seed/apt2/800/600"],
    features: ["WiFi", "Amueblado", "Gimnasio"],
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
    location: "Zona residencial",
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
    location: "Campus universitario",
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
    location: "Centro de la ciudad",
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