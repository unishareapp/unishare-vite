import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { apartments } from '../data';
import { FaHeart, FaRegHeart, FaComments, FaArrowLeft } from 'react-icons/fa';
import { Apartment } from '../types';

// Importar los componentes necesarios para el chat
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface ApartmentDetailProps {
  apartments: Apartment[];
  likedApartments: number[];
  handleLike: (id: number) => void;
  openChat: (apartment: Apartment) => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: Date;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({ 
  apartments, 
  likedApartments, 
  handleLike, 
  openChat,
  onSendMessage,
  messages,
  user
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const apartment = apartments.find(apt => apt.id === Number(id));
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChatOpen = (apartment: Apartment) => {
    if (!user) {
      navigate('/login');
      return;
    }
    openChat(apartment);
  };

  const handleSendMessage = (text: string) => {
    if (apartment) {
      onSendMessage(apartment.id, text);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(currentMessage);
      setCurrentMessage('');
    }
  };

  if (!apartment) return <div>Apartamento no encontrado</div>;

  const handleBack = () => {
    // Si viene de search, volver a search con todos los parámetros de búsqueda
    if (location.state?.from === 'search') {
      const searchParams = new URLSearchParams(location.state.searchParams);
      navigate({
        pathname: '/search',
        search: searchParams.toString()
      });
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Botones de navegación */}
      <div className="fixed top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handleBack}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft className="text-purple-600" />
          <span className="text-purple-600">Volver</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-purple-600">Inicio</span>
        </button>
      </div>

      <div className="relative">
        {/* Hero image */}
        <div className="h-[50vh] relative">
          <img 
            src={apartment.images[0]} 
            alt={apartment.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={apartment.user.avatar} 
              alt={apartment.user.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{apartment.title}</h1>
              <p className="text-lg text-gray-600">Publicado por {apartment.user.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-2xl font-bold text-purple-600 mb-4">{apartment.price}€/mes</p>
              <p className="text-gray-600 mb-6">{apartment.description}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold">Ubicación</h3>
                  <p>{apartment.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Tamaño</h3>
                  <p>{apartment.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Duración</h3>
                  <p>{apartment.duration}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                      return;
                    }
                    handleLike(apartment.id);
                  }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  {likedApartments.includes(apartment.id) ? <FaHeart /> : <FaRegHeart />}
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => handleChatOpen(apartment)}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
                >
                  <FaComments />
                  <span>Chatear con {apartment.user.name}</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Características</h3>
              <div className="grid grid-cols-2 gap-4">
                {apartment.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Todas las imágenes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apartment.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${apartment.title} - imagen ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsImageSliderOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsChatOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
            <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="font-semibold">Chat - {apartment.title}</h3>
              </div>
            </div>

            <div className="flex-1 p-6 h-[calc(90vh-180px)] overflow-y-auto">
              {messages[apartment.id]?.length ? (
                <div className="space-y-4">
                  {messages[apartment.id].map((message) => (
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
                  onClick={() => {
                    handleSendMessage(currentMessage);
                    setCurrentMessage('');
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slider Modal de Imágenes */}
      {isImageSliderOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsImageSliderOpen(false);
            }
          }}
        >
          <button 
            onClick={() => setIsImageSliderOpen(false)}
            className="absolute right-4 top-4 text-white hover:text-gray-300 z-10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute right-4 top-16 text-white/70 z-10 text-sm">
            <span>{currentImageIndex + 1} / {apartment.images.length}</span>
          </div>

          <div className="w-full h-full animate-slideUp">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              loop={true}
              initialSlide={currentImageIndex}
              onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
              className="w-full h-full modal-swiper"
            >
              {apartment.images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={`${apartment.title} - imagen ${index + 1}`}
                    className="max-h-[90vh] max-w-[90vw] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetail; 