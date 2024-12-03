import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { Apartment, User, Review } from '../types';

interface UserProfileProps {
  apartments: Apartment[];
}

const UserProfile: React.FC<UserProfileProps> = ({ apartments }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userApartments, setUserApartments] = useState<Apartment[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'apartments'>('reviews');

  // Simulación de reseñas (deberías obtenerlas de tu backend)
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      rating: 5,
      comment: "Excelente anfitrión, muy atento y el apartamento impecable.",
      author: "María García",
      date: new Date('2024-01-15'),
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria"
    },
    // ... más reseñas
  ]);

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener los datos del usuario
    // Por ahora simulamos los datos
    setUser({
      id: userId,
      name: "Antonio Moreno",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=antonio",
      bio: "Propietario de varios apartamentos en la zona universitaria. Me encanta ayudar a estudiantes a encontrar su hogar ideal.",
      joinDate: new Date('2023-01-01'),
      rating: 4.8,
      reviewCount: 15
    });

    // Filtrar apartamentos del usuario
    setUserApartments(apartments.filter(apt => apt.user.id === userId));
  }, [userId, apartments]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <FaArrowLeft /> Volver
        </button>

        {/* Perfil del usuario */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text -gray-600 mb-2">{user.bio}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{user.rating}</span>
                  <span className="text-gray-500">({user.reviewCount} reseñas)</span>
                </div>
                <div className="text-gray-500">
                  Miembro desde {user.joinDate.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'reviews'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Reseñas
          </button>
          <button
            onClick={() => setActiveTab('apartments')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'apartments'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Apartamentos
          </button>
        </div>

        {/* Contenido de los tabs */}
        {activeTab === 'reviews' ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.authorAvatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-sm text-gray-500">
                    {review.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userApartments.map(apartment => (
              <div
                key={apartment.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={apartment.images[0]}
                  alt={apartment.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{apartment.title}</h3>
                  <p className="text-purple-600 font-semibold mb-2">
                    {apartment.price}€/mes
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{apartment.location}</p>
                  <button
                    onClick={() => navigate(`/apartment/${apartment.id}`)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                  >
                    Ver detalles
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

export default UserProfile; 