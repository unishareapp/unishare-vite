import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComments } from 'react-icons/fa';
import { Apartment } from '../types';
import { apartments } from '../data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface SearchProps {
  likedApartments: number[];
  handleLike: (id: number) => void;
  openChat: (apartment: Apartment, origin: string) => void;
}

const Search: React.FC<SearchProps> = ({ likedApartments, handleLike, openChat }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  
  // Inicializar filtros desde URL
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 3000
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    searchParams.get('features')?.split(',').filter(Boolean) || []
  );

  // Inicializar resultados aplicando los filtros de la URL
  const [filteredResults, setFilteredResults] = useState(() => {
    return apartments.filter(apt => {
      const matchesSearch = 
        apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !searchParams.get('category') || apt.category === searchParams.get('category');
      const matchesLocation = !searchParams.get('location') || apt.location === searchParams.get('location');
      const matchesPrice = apt.price >= (Number(searchParams.get('minPrice')) || 0) && 
                          apt.price <= (Number(searchParams.get('maxPrice')) || 3000);
      const urlFeatures = searchParams.get('features')?.split(',').filter(Boolean) || [];
      const matchesFeatures = urlFeatures.length === 0 || 
        urlFeatures.every(feature => apt.features.includes(feature));

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesFeatures;
    });
  });

  // Función para aplicar nuevos filtros solo cuando se hace clic en el botón
  const applyFilters = () => {
    const results = apartments.filter(apt => {
      const matchesSearch = 
        apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || apt.category === selectedCategory;
      const matchesLocation = !selectedLocation || apt.location === selectedLocation;
      const matchesPrice = apt.price >= priceRange[0] && apt.price <= priceRange[1];
      const matchesFeatures = selectedFeatures.length === 0 || 
        selectedFeatures.every(feature => apt.features.includes(feature));

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesFeatures;
    });

    setFilteredResults(results);
  };

  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const closeModal = () => {
    setSelectedApartment(null);
  };

  // Datos estáticos
  const locations = ["Centro de la ciudad", "Zona residencial", "Campus universitario"];
  const allFeatures = ["Amueblado", "WiFi", "Gimnasio", "Lavandería", "Terraza", "Parking"];

  // Añadir función para ver detalles
  const handleViewDetails = (apartmentId: number) => {
    navigate(`/apartment/${apartmentId}`, { 
      state: { 
        from: 'search',
        searchParams: location.search
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 left-4 z-10">
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

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800">
            Resultados para: "{searchQuery}"
          </h1>
        </div>

        <div className="flex gap-8">
          {/* Panel de filtros - más estrecho y compacto */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h2 className="font-semibold mb-6 text-lg">Filtros</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Tipo de habitación
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Todas</option>
                    <option value="Studio">Estudio</option>
                    <option value="1 Bedroom">1 Habitación</option>
                    <option value="2 Bedroom">2 Habitaciones</option>
                    <option value="3 Bedroom">3 Habitaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Ubicación
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Todas las ubicaciones</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Rango de precio
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full p-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Precio mínimo"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full p-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Precio máximo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Características
                  </label>
                  <div className="space-y-1.5">
                    {allFeatures.map(feature => (
                      <label key={feature} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => {
                            setSelectedFeatures(prev =>
                              prev.includes(feature)
                                ? prev.filter(f => f !== feature)
                                : [...prev, feature]
                            )
                          }}
                          className="mr-2 h-4 w-4"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botón de aplicar filtros */}
                <button
                  onClick={applyFilters}
                  className="w-full mt-6 text-purple-600 hover:text-purple-700 text-sm border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Realizar nueva búsqueda</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="flex-1">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No se encontraron resultados</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map(apt => (
                  <div 
                    key={apt.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105 h-full flex flex-col"
                    onClick={() => handleApartmentClick(apt)}
                  >
                    <div className="h-40 flex-shrink-0">
                      <img 
                        src={apt.images[0]} 
                        alt={apt.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex-grow">
                      <h3 className="font-semibold text-base mb-1">{apt.title}</h3>
                      <p className="text-gray-600 text-xs mb-1">{apt.location}</p>
                      <p className="text-purple-600 font-bold text-sm">{apt.price}€/mes</p>
                      <p className="text-gray-500 text-xs mb-1">Duración: {apt.duration}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {apt.features.slice(0, 3).map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(apt.id);
                        }}
                        className="text-lg text-red-500 hover:text-red-600 transition-colors"
                      >
                        {likedApartments.includes(apt.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openChat(apt, 'search');
                        }}
                        className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700 transition-colors flex items-center gap-1"
                      >
                        <FaComments className="text-sm" />
                        <span>Chatear</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
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
                className="h-64 mb-6 modal-swiper"
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
              <p className="text-xl font-semibold text-purple-600 mb-4">{selectedApartment.price}€/mes</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p>{selectedApartment.location}</p>
                </div>
                <div>
                  <p className="font-semibold">Tamaño:</p>
                  <p>{selectedApartment.size}</p>
                </div>
                <div>
                  <p className="font-semibold">Duración:</p>
                  <p>{selectedApartment.duration}</p>
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

              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => handleViewDetails(selectedApartment.id)}
                  className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Ver más</span>
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    openChat(selectedApartment, 'search');
                  }}
                  className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                >
                  <FaComments className="text-sm" />
                  <span>Chatear</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search; 