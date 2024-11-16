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
    title: "Estudio Moderno en el Centro",
    category: "Estudio",
    price: 850,
    location: "Centro de la ciudad",
    size: "35m²",
    description: "Acogedor estudio completamente renovado con acabados modernos, ideal para estudiantes o jóvenes profesionales. Excelente ubicación cerca de transportes públicos y zonas comerciales.",
    features: ["Amueblado", "WiFi", "Cocina equipada", "Aire acondicionado"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    duration: "Mínimo 6 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 2,
    title: "Apartamento Familiar con Terraza",
    category: "3 Habitaciones",
    price: 1500,
    location: "Zona residencial",
    size: "95m²",
    description: "Espacioso apartamento familiar con amplia terraza y vistas a la ciudad. Zona tranquila con parques cercanos y colegios.",
    features: ["Terraza", "Parking", "Lavandería", "Trastero", "Seguridad 24h"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],
    duration: "Mínimo 12 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 3,
    title: "Loft Industrial Renovado",
    category: "1 Habitación",
    price: 950,
    location: "Centro de la ciudad",
    size: "55m²",
    description: "Loft de diseño con elementos industriales, techos altos y ventanales. Perfecto para creativos y amantes del diseño.",
    features: ["WiFi", "Gimnasio", "Cocina americana", "Aire acondicionado"],
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    ],
    duration: "Mínimo 6 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 4,
    title: "Apartamento Estudiantil",
    category: "2 Habitaciones",
    price: 750,
    location: "Campus universitario",
    size: "65m²",
    description: "Apartamento ideal para estudiantes, completamente equipado y a 5 minutos caminando del campus. Zona con mucha vida estudiantil.",
    features: ["Amueblado", "WiFi", "Lavandería", "Biblioteca común"],
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    ],
    duration: "Mínimo 6 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 5,
    title: "Ático de Lujo",
    category: "2 Habitaciones",
    price: 2200,
    location: "Centro de la ciudad",
    size: "85m²",
    description: "Espectacular ático con terraza panorámica, acabados de lujo y las mejores vistas de la ciudad. Incluye plaza de parking.",
    features: ["Terraza", "Parking", "Gimnasio", "Piscina", "Domótica"],
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    ],
    duration: "Mínimo 12 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 6,
    title: "Apartamento Familiar con Jardín",
    category: "3 Habitaciones",
    price: 1800,
    location: "Zona residencial",
    size: "110m²",
    description: "Amplio apartamento en planta baja con jardín privado. Ideal para familias con niños. Zona residencial tranquila con todos los servicios.",
    features: ["Jardín", "Parking", "Trastero", "Parque infantil", "Seguridad"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],
    duration: "Mínimo 12 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  },
  {
    id: 7,
    title: "Estudio Minimalista",
    category: "Estudio",
    price: 700,
    location: "Campus universitario",
    size: "30m²",
    description: "Estudio moderno y funcional con diseño minimalista. Perfecto para estudiantes o jóvenes profesionales que buscan su primer hogar.",
    features: ["Amueblado", "WiFi", "Cocina equipada", "Aire acondicionado"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    duration: "Mínimo 6 meses",
    user: {
      id: 1,
      name: "Ana García",
      avatar: "/path/to/avatar.jpg"
    }
  }
];

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}