import React, { useState } from 'react'
import './styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Mousewheel, Autoplay } from 'swiper/modules';
import { FaHeart, FaRegHeart, FaUser, FaComments } from 'react-icons/fa';

// Simulated apartment data
const apartments = [
  { 
    id: 1, 
    title: "Cozy Studio in Downtown", 
    price: 800, 
    category: "Studio",
    description: "Hermoso estudio completamente amueblado con vistas a la ciudad. Incluye servicios básicos y acceso a gimnasio.",
    features: ["Amueblado", "WiFi", "Gimnasio", "Lavandería"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.0"
    ],
    location: "Centro de la ciudad",
    size: "35m²"
  },
  { 
    id: 2, 
    title: "Spacious 2BR with View", 
    price: 1200, 
    category: "2 Bedroom",
    description: "Hermoso estudio completamente amueblado con vistas a la ciudad. Incluye servicios básicos y acceso a gimnasio.",
    features: ["Amueblado", "WiFi", "Gimnasio", "Lavandería"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.0"
    ],
    location: "Centro de la ciudad",
    size: "35m²"
  },
  { id: 3, title: "Modern 1BR near University", price: 900, category: "1 Bedroom", description: "Hermoso estudio completamente amueblado con vistas a la ciudad. Incluye servicios básicos y acceso a gimnasio.", features: ["Amueblado", "WiFi", "Gimnasio", "Lavandería"], images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.0"
  ], location: "Centro de la ciudad", size: "35m²" },
  { id: 4, title: "Luxury 3BR Penthouse", price: 2500, category: "3 Bedroom", description: "Hermoso estudio completamente amueblado con vistas a la ciudad. Incluye servicios básicos y acceso a gimnasio.", features: ["Amueblado", "WiFi", "Gimnasio", "Lavandería"], images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.0"
  ], location: "Centro de la ciudad", size: "35m²" },
  { 
    id: 5, 
    title: "Ático con Terraza", 
    price: 1800, 
    category: "2 Bedroom",
    description: "Hermoso ático con terraza privada y vistas panorámicas. Incluye servicios básicos y acceso a gimnasio.",
    features: ["Terraza", "WiFi", "Gimnasio", "Lavandería"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
    ],
    location: "Zona residencial",
    size: "85m²"
  },
  { 
    id: 6, 
    title: "Estudio Moderno", 
    price: 750, 
    category: "Studio",
    description: "Estudio moderno y funcional, perfecto para estudiantes. Incluye servicios básicos.",
    features: ["Amueblado", "WiFi", "Cocina equipada"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.0",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.0",
    ],
    location: "Cerca del campus",
    size: "30m²"
  },
]

// Agregar esta interfaz para los mensajes
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}

// 1. Agregar tipos para el estado de los apartamentos
type Apartment = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  size: string;
}

const Unishare: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [likedApartments, setLikedApartments] = useState<number[]>([])
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentChatApartment, setCurrentChatApartment] = useState<Apartment | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [...new Set(apartments.map(apt => apt.location))];
  const allFeatures = [...new Set(apartments.flatMap(apt => apt.features))];

  const filteredApartments = apartments.filter(apt => 
    (selectedCategory === "" || apt.category === selectedCategory) &&
    (selectedLocation === "" || apt.location === selectedLocation) &&
    apt.price >= priceRange[0] && apt.price <= priceRange[1] &&
    (selectedFeatures.length === 0 || selectedFeatures.every(feature => apt.features.includes(feature)))
  )

  const handleLike = (id: number) => {
    setLikedApartments(prev => 
      prev.includes(id) ? prev.filter(aptId => aptId !== id) : [...prev, id]
    )
  }

  const handleApartmentClick = (apt: Apartment) => {
    setSelectedApartment(apt);
  }

  const closeModal = () => {
    setSelectedApartment(null);
  }

  const openChat = (apt: Apartment) => {
    setCurrentChatApartment(apt);
    setIsChatOpen(true);
  }

  const closeChat = () => {
    setIsChatOpen(false);
    setCurrentChatApartment(null);
  }

  const handleSendMessage = (apartmentId: number) => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [apartmentId]: [...(prev[apartmentId] || []), newMessage]
    }));

    // Simular respuesta del host después de 1 segundo
    setTimeout(() => {
      const hostResponse: Message = {
        id: Date.now(),
        text: "¡Gracias por tu mensaje! Te responderé lo antes posible.",
        sender: 'host',
        timestamp: new Date()
      };

      setMessages(prev => ({
        ...prev,
        [apartmentId]: [...(prev[apartmentId] || []), hostResponse]
      }));
    }, 1000);

    setCurrentMessage("");
  };

  // 3. Corregir el tipo del evento onKeyPress
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentChatApartment) {
      handleSendMessage(currentChatApartment.id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
              <FaUser className="text-xl" />
              <span>Iniciar sesión</span>
            </button>
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
              <FaHeart className="text-xl" />
              <span>Favoritos</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container relative mx-auto px-4 pb-16 z-10">
        <div className="p-8 rounded-lg">
          <h1 className="text-6xl font-bold text-center mb-12 text-purple-800">Unishare</h1>
          
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar apartamentos..."
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
            >
              <svg 
                className={`w-5 h-5 transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span>Filtros</span>
            </button>

            <div 
              className={`transform transition-all duration-300 ease-in-out origin-top ${
                isFilterOpen 
                  ? 'opacity-100 scale-y-100 max-h-[1000px]' 
                  : 'opacity-0 scale-y-0 max-h-0'
              }`}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Tipo de habitación</h3>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Todas</option>
                      <option value="Studio">Estudio</option>
                      <option value="1 Bedroom">1 Habitación</option>
                      <option value="2 Bedroom">2 Habitaciones</option>
                      <option value="3 Bedroom">3 Habitaciones</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Ubicación</h3>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Todas las ubicaciones</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Rango de precio</h3>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Mín"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Máx"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Características</h3>
                    <div className="flex flex-wrap gap-2">
                      {allFeatures.map(feature => (
                        <button
                          key={feature}
                          onClick={() => {
                            setSelectedFeatures(prev =>
                              prev.includes(feature)
                                ? prev.filter(f => f !== feature)
                                : [...prev, feature]
                            )
                          }}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedFeatures.includes(feature)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Alojamientos destacados</h2>
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Mousewheel, Autoplay]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true
              }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="apartment-swiper"
            >
              {filteredApartments.map(apt => (
                <SwiperSlide key={apt.id}>
                  <div 
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleApartmentClick(apt)}
                  >
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={apt.images[0]} 
                        alt={apt.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-lg font-semibold mb-1">{apt.title}</h2>
                      <p className="text-gray-600 text-sm mb-1">{apt.category}</p>
                      <p className="text-base font-bold text-purple-600">${apt.price}/month</p>
                    </div>
                    <div className="bg-gray-50 p-2 flex justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(apt.id);
                        }}
                        className="text-xl text-red-500 hover:text-red-600 transition-colors"
                      >
                        {likedApartments.includes(apt.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openChat(apt);
                        }}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center gap-1"
                      >
                        <FaComments />
                        <span>Chatear</span>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {selectedApartment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
                <button 
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-6">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    loop={true}
                    className="h-64 mb-6 custom-swiper"
                  >
                    {selectedApartment.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img 
                          src={image} 
                          alt={`${selectedApartment.title} - imagen ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <h2 className="text-2xl font-bold mb-4">{selectedApartment.title}</h2>
                  <p className="text-xl font-semibold text-purple-600 mb-4">${selectedApartment.price}/mes</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="font-semibold">Ubicación:</p>
                      <p>{selectedApartment.location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Tamaño:</p>
                      <p>{selectedApartment.size}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="font-semibold mb-2">Descripción:</p>
                    <p className="text-gray-600">{selectedApartment.description}</p>
                  </div>

                  <div className="mb-6">
                    <p className="font-semibold mb-2">Características:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedApartment.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      closeModal();
                      openChat(selectedApartment);
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaComments />
                    <span>Chatear</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {isChatOpen && currentChatApartment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
                <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setIsChatOpen(false);
                        handleApartmentClick(currentChatApartment);
                      }}
                      className="text-white hover:text-gray-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </button>
                    <h3 className="font-semibold">Chat - {currentChatApartment.title}</h3>
                  </div>
                  <button 
                    onClick={closeChat}
                    className="text-white hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 p-6 h-[calc(90vh-180px)] overflow-y-auto">
                  {messages[currentChatApartment.id]?.length ? (
                    <div className="space-y-4">
                      {messages[currentChatApartment.id].map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">No hay mensajes aún</p>
                  )}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                      onClick={() => handleSendMessage(currentChatApartment.id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Unishare