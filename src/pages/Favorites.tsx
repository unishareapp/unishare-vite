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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteApartments.map(apt => (
              <div 
                key={apt.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={apt.images[0]} 
                    alt={apt.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{apt.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{apt.category}</p>
                  <p className="text-lg font-bold text-purple-600 mb-4">${apt.price}/mes</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleLike(apt.id)}
                      className="text-xl text-red-500 hover:text-red-600 transition-colors"
                    >
                      <FaHeart />
                    </button>
                    <button
                      onClick={() => openChat(apt)}
                      className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center gap-1"
                    >
                      <FaComments />
                      <span>Chatear</span>
                    </button>
                  </div>
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