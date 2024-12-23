import React, { useEffect, useState } from 'react'
import '../App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Mousewheel, Autoplay } from 'swiper/modules';
import { FaHeart, FaRegHeart, FaComments, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

import { Apartment } from '../types';

interface HomeProps {
  likedApartments: number[];
  handleLike: (id: number) => void;
  openChat: (apartment: Apartment) => void;
  user: User | null;
  handleLogout: () => void;
  apartments: Apartment[];
  messages: { [key: number]: Message[] };
  onSendMessage: (apartmentId: number, text: string) => void;
}

// Añadir la interfaz Message que falta
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}

// Añade estas constantes fuera del componente
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 37.3826,
  lng: -5.9736
};

const Home: React.FC<HomeProps> = ({ likedApartments, handleLike, openChat, user, handleLogout, apartments: initialApartments, messages, onSendMessage }) => {
  const navigate = useNavigate();
  
  // Declarar todos los estados necesarios
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentChatApartment, setCurrentChatApartment] = useState<Apartment | null>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [chatOrigin, setChatOrigin] = useState<'main' | 'detail' | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Agregar las variables y funciones que faltan
  const locations = ["Centro de la ciudad", "Zona residencial", "Campus universitario"];
  const allFeatures = ["Amueblado", "WiFi", "Gimnasio", "Lavandería", "Terraza", "Parking"];

  // Mostrar todos los apartamentos en destacados sin filtrar
  const featuredApartments = apartments;

  // Funciones para manejar interacciones
  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const handleSendMessage = (apartmentId: number) => {
    if (!currentMessage.trim()) return;
    onSendMessage(apartmentId, currentMessage);
    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentChatApartment) {
      handleSendMessage(currentChatApartment.id);
    }
  };

  // Modificar la función handleLike para verificar autenticación
  const handleLikeWithAuth = (id: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    handleLike(id);
  };

  // Modificar la función handleChatOpen para verificar autenticación
  const handleChatOpen = (apartment: Apartment, origin: 'main' | 'detail') => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentChatApartment(apartment);
    setIsChatOpen(true);
    setChatOrigin(origin);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.querySelector('input');
    if (searchInput && searchInput.value.trim()) {
      const params = new URLSearchParams();
      params.append('q', searchInput.value.trim());
      
      // Añadir los filtros activos a la URL
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedLocation) params.append('location', selectedLocation);
      params.append('minPrice', priceRange[0].toString());
      params.append('maxPrice', priceRange[1].toString());
      if (selectedFeatures.length > 0) {
        params.append('features', selectedFeatures.join(','));
      }
      
      navigate(`/search?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchApartments = async () => {
      const { data, error } = await supabase
        .from('apartments') // Nombre de la tabla
        .select('*'); // Selecciona todos los campos

      if (error) {
        console.error('Error fetching apartments:', error);
      } else {
        setApartments(data);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center items-center gap-6">
            {/* Icono de inicio */}
            <button
              onClick={() => navigate('/')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <FaHome className="text-xl" />
            </button>

            {/* Icono de favoritos */}
            <button
              onClick={() => navigate('/favorites')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <FaHeart className="text-xl" />
            </button>

            {/* Icono de chats */}
            <button
              onClick={() => navigate('/my-chats')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <FaComments className="text-xl" />
            </button>

            {/* Icono de perfil */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* Menú desplegable con animación */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 animate-slideDown"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">Ver perfil</p>
                      </div>
                      <button
                        onClick={() => navigate('/profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Mi Perfil
                      </button>
                      <button
                        onClick={() => navigate('/my-apartments')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Mis Apartamentos
                      </button>
                      <button
                        onClick={() => navigate('/settings')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Configuración
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate('/login')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Iniciar Sesión
                      </button>
                      <button
                        onClick={() => navigate('/register')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Registrarse
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container relative mx-auto px-4 pb-8 z-10">
        <div className="p-2 sm:p-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-center mb-2 text-purple-800">UniShare.app</h1>
          <p className="text-lg sm:text-xl text-center mb-4 sm:mb-6 text-purple-600">¡Compartir es vivir!</p>
          
          <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Buscar apartamentos..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          
          <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
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

              <button
                onClick={() => setIsMapModalOpen(true)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Ver mapa</span>
              </button>
            </div>

            <div 
              className={`transform transition-all duration-300 ease-in-out origin-top ${
                isFilterOpen 
                  ? 'opacity-100 scale-y-100 max-h-[1000px]' 
                  : 'opacity-0 scale-y-0 max-h-0'
              }`}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Alojamientos destacados</h2>
            <Swiper
              navigation={true}
              modules={[Navigation, Mousewheel, Autoplay]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              spaceBetween={10}
              slidesPerView={1.2}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="apartment-swiper px-2 sm:px-0"
            >
             
            </Swiper>
          </div>

          {selectedApartment && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedApartment(null);
                }
              }}
            >
              <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fadeIn">
                {/* Contenedor del Swiper */}
                <div className="relative h-48 sm:h-64">
                  <button
                    onClick={() => setSelectedApartment(null)}
                    className="absolute right-2 top-2 z-10 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <Swiper
                    navigation
                    pagination
                    modules={[Navigation, Pagination]}
                    className="h-full w-full"
                  >
                    {selectedApartment.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`Imagen ${index + 1} de ${selectedApartment.title}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Contenido del modal */}
                <div className="p-4 overflow-y-auto max-h-[calc(90vh-12rem)]">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedApartment.title}</h3>
                      <p className="text-purple-600 font-medium">{selectedApartment.price}€/mes</p>
                    </div>
                    <button
                      onClick={() => handleLikeWithAuth(selectedApartment.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {likedApartments.includes(selectedApartment.id) ? (
                        <FaHeart className="text-xl" />
                      ) : (
                        <FaRegHeart className="text-xl" />
                      )}
                    </button>
                  </div>

                  {/* Grid de detalles */}
                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Ubicación:</p>
                      <p className="text-gray-600">{selectedApartment.location}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Tamaño:</p>
                      <p className="text-gray-600">{selectedApartment.size}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Duración:</p>
                      <p className="text-gray-600">{selectedApartment.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Categoría:</p>
                      <p className="text-gray-600">{selectedApartment.category}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="font-medium text-gray-700 text-sm mb-1">Descripción:</p>
                    <p className="text-sm text-gray-600">{selectedApartment.description}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-1">Características:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApartment.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3 justify-end mt-4 pt-3 border-t">
                    <button
                      onClick={() => handleChatOpen(selectedApartment, 'detail')}
                      className="text-purple-600 hover:text-purple-700 text-xs flex items-center gap-1"
                    >
                      <FaComments className="text-xs" />
                      <span>Chatear</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isChatOpen && currentChatApartment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn p-4">
              <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
                <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setIsChatOpen(false);
                        if (chatOrigin === 'detail') {
                          handleApartmentClick(currentChatApartment!);
                        }
                        setChatOrigin(null);
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
                    onClick={() => {
                      setIsChatOpen(false);
                      setChatOrigin(null);
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 p-3 sm:p-6 h-[60vh] sm:h-[calc(90vh-180px)] overflow-y-auto">
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

          {isMapModalOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsMapModalOpen(false);
                }
              }}
            >
              <div className="bg-white rounded-lg w-full h-[90vh] max-w-7xl relative animate-fadeIn">
                {/* Header del modal */}
                <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Mapa de alojamientos</h3>
                  <button 
                    onClick={() => setIsMapModalOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-4 h-[calc(90vh-4rem)] flex gap-4">
                  {/* Panel de filtros (30%) */}
                  <div className="w-1/3 overflow-y-auto pr-4 border-r">
                    {/* Barra de búsqueda */}
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="search"
                          placeholder="Buscar por nombre..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <svg 
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Filtros */}
                    <div className="space-y-4">
                      {/* Tipo de habitación */}
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

                      {/* Ubicación */}
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

                      {/* Rango de precio */}
                      <div>
                        <h3 className="font-semibold mb-2">Rango de precio</h3>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Mín"
                          />
                          <span>-</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Máx"
                          />
                        </div>
                      </div>

                      {/* Características */}
                      <div>
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

                      {/* Resultados filtrados */}
                      <div className="mt-6">
                        <h3 className="font-semibold mb-3">Resultados</h3>
                        <div className="space-y-3">
                          {apartments
                            .filter(apt => 
                              (!searchTerm || apt.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
                              (!selectedCategory || apt.category === selectedCategory) &&
                              (!selectedLocation || apt.location === selectedLocation) &&
                              (apt.price >= priceRange[0] && apt.price <= priceRange[1]) &&
                              (selectedFeatures.length === 0 || selectedFeatures.every(f => apt.features.includes(f)))
                            )
                            .map(apt => (
                              <div 
                                key={apt.id}
                                className="p-3 border rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
                                onClick={() => handleApartmentClick(apt)}
                              >
                                <div className="flex gap-3">
                                  <img 
                                    src={apt.images[0]} 
                                    alt={apt.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{apt.title}</h4>
                                    <p className="text-sm text-gray-600">{apt.location}</p>
                                    <p className="text-purple-600 font-medium">{apt.price}€/mes</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mapa (70%) */}
                  <div className="flex-1 bg-gray-100 rounded-lg">
                    {!isLoaded ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={defaultCenter}
                        options={{
                          styles: [
                            {
                              featureType: "poi",
                              elementType: "labels",
                              stylers: [{ visibility: "off" }],
                            },
                          ],
                          disableDefaultUI: true,
                          zoomControl: true,
                          mapTypeControl: false,
                          streetViewControl: true,
                          fullscreenControl: true,
                        }}
                      >
                        {apartments
                          .filter(apt => 
                            (!searchTerm || apt.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
                            (!selectedCategory || apt.category === selectedCategory) &&
                            (!selectedLocation || apt.location === selectedLocation) &&
                            (apt.price >= priceRange[0] && apt.price <= priceRange[1]) &&
                            (selectedFeatures.length === 0 || selectedFeatures.every(f => apt.features.includes(f)))
                          )
                          .map(apartment => (
                            <MarkerF
                              key={apartment.id}
                              position={apartment.coordinates}
                              onClick={() => handleApartmentClick(apartment)}
                              icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                scaledSize: new window.google.maps.Size(40, 40),
                              }}
                            />
                          ))}
                      </GoogleMap>
                    )}
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

export default Home