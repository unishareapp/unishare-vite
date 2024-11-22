import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComments, FaArrowLeft } from 'react-icons/fa';
import { apartments } from '../data';
import { Apartment } from '../types';

interface FavoritesProps {
  likedApartments: number[];
  handleLike: (id: number) => void;
  openChat: (apartment: Apartment) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ likedApartments, handleLike, openChat }) => {
  const navigate = useNavigate();
  const favoriteApartments = apartments.filter(apt => likedApartments.includes(apt.id));

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white">
        <div className="container mx-auto px-4 py-3">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <FaArrowLeft />
            <span>Volver</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-800">
          Alojamientos Guardados
        </h1>

        {favoriteApartments.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No tienes alojamientos guardados</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 text-purple-600 hover:text-purple-700 underline"
            >
              Explorar alojamientos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {favoriteApartments.map(apt => (
              <div 
                key={apt.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-32 sm:h-36 overflow-hidden relative">
                  <img 
                    src={apt.images[0]} 
                    alt={apt.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleLike(apt.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition-colors bg-white rounded-full p-1.5 shadow-sm"
                  >
                    <FaHeart className="text-sm" />
                  </button>
                </div>
                <div className="p-2 sm:p-3">
                  <h2 className="font-semibold text-sm sm:text-base line-clamp-1">{apt.title}</h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">{apt.category}</p>
                  <p className="text-purple-600 font-bold text-sm sm:text-base mb-2">{apt.price}€/mes</p>
                  <button
                    onClick={() => openChat(apt)}
                    className="w-full bg-purple-600 text-white px-2 py-1.5 rounded text-xs sm:text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaComments className="text-xs" />
                    <span>Chatear</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 