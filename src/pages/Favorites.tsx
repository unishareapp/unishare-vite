import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/config';
import Room from '../components/RoomModal';

interface Apartment {
  id: number;
  title: string;
  price: number;
  location: string;
  images: string[];
  companions: string;
  utilities: string;
  dates: string;
  info1: string;
  info2: string;
}

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await api.get('/favorites');
        setFavorites(data);
      } catch (error) {
        setError('Error al cargar favoritos');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const handleRemoveFavorite = async (apartmentId: number) => {
    try {
      await api.delete(`/favorites/${apartmentId}`);
      setFavorites(favorites.filter(fav => fav.id !== apartmentId));
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Acceso denegado</h2>
          <p className="mt-2 text-gray-600">
            Necesitas iniciar sesión para ver tus favoritos
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            No tienes apartamentos favoritos
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Explora apartamentos y guárdalos en favoritos
          </p>
          <Link
            to="/search"
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Buscar apartamentos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((apartment) => (
            <div key={apartment.id} className="relative">
              <Room
                id={apartment.id}
                image={apartment.images[0]}
                title={apartment.title}
                companions={apartment.companions}
                utilities={apartment.utilities}
                dates={apartment.dates}
                price={apartment.price}
                carouselImages={apartment.images}
                location={apartment.location}
                info1={apartment.info1}
                info2={apartment.info2}
              />
              <button
                onClick={() => handleRemoveFavorite(apartment.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 