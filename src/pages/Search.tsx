import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComments, FaFilter, FaHome } from 'react-icons/fa';
import { Apartment, Message, User } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../api/config';
import Room from '../components/RoomModal';
import SearchFilters, { SearchFilters as FilterTypes } from '../components/SearchFilters';

interface SearchProps {
  apartments: Apartment[];
  likedApartments: number[];
  handleLike: (id: number) => void;
  openChat: (apartment: Apartment) => void;
  onSendMessage: (apartmentId: number, text: string) => void;
  messages: { [key: number]: Message[] };
  user: User | null;
}

const Search: React.FC<SearchProps> = ({ 
  apartments, 
  likedApartments, 
  handleLike, 
  openChat, 
  messages, 
  user 
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterTypes>({
    priceRange: [0, 2000],
    province: '',
    roomType: '',
    furnished: false,
    petsAllowed: false,
    utilities: [],
    availability: '',
    sortBy: 'recent'
  });
  
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

  const handleChatOpen = (apartment: Apartment) => {
    if (!user) {
      navigate('/login');
      return;
    }
    openChat(apartment);
  };

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await api.get('/apartments');
        setApartments(data);
      } catch (error) {
        console.error('Error al cargar los apartamentos');
      }
    };

    fetchApartments();
  }, []);

  // Función para aplicar filtros
  const filteredApartments = apartments.filter(apt => {
    const matchesSearch = apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = apt.price >= priceRange[0] && apt.price <= priceRange[1];
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.every(f => apt.features.includes(f));

    return matchesSearch && matchesPrice && matchesFeatures;
  });

  const handleFilterChange = (filters: FilterTypes) => {
    setAdvancedFilters(filters);
    // Aplicar filtros a los resultados
    const filtered = apartments.filter(apartment => {
      const matchesPrice = apartment.price >= filters.priceRange[0] && 
                          apartment.price <= filters.priceRange[1];
      const matchesProvince = !filters.province || 
                             apartment.province === filters.province;
      const matchesRoomType = !filters.roomType || 
                             apartment.roomType === filters.roomType;
      // ... aplicar otros filtros ...

      return matchesPrice && matchesProvince && matchesRoomType;
    });

    // Ordenar resultados
    if (filters.sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    // ... otros tipos de ordenamiento ...

    setFilteredApartments(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-4">
        {/* Botón de volver al inicio - visible en todas las pantallas */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors p-2 rounded-lg hover:bg-purple-50"
          >
            <FaHome className="text-lg" />
            <span className="text-sm font-medium">Volver al inicio</span>
          </button>
        </div>

        {/* Grid principal con sidebar y contenido */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Sidebar de filtros para desktop */}
          <div className="hidden sm:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="font-semibold mb-4 text-gray-700">Filtros</h3>
              
              <div className="space-y-4">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de alojamiento
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    <option value="">Todos</option>
                    <option value="Studio">Estudio</option>
                    <option value="Habitación">Habitación</option>
                    <option value="Piso completo">Piso completo</option>
                  </select>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    <option value="">Todas</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Rango de precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio máximo: {priceRange[1]}€
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Características */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Características
                  </label>
                  <div className="space-y-2">
                    {allFeatures.map(feature => (
                      <label key={feature} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }
                          }}
                          className="rounded text-purple-600"
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={applyFilters}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-sm"
                  >
                    Aplicar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedLocation("");
                      setPriceRange([0, 3000]);
                      setSelectedFeatures([]);
                      applyFilters();
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 text-sm"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de búsqueda y botón de filtros móvil */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar apartamentos..."
                className="flex-1 p-2 text-sm border rounded-md"
                value={searchQuery}
                onChange={(e) => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set('q', e.target.value);
                  navigate({ search: newSearchParams.toString() });
                }}
              />
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="sm:hidden bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
                aria-label="Abrir filtros"
              >
                <FaFilter className="w-4 h-4" />
              </button>
            </div>

            {/* Grid de resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApartments.map((apartment) => (
                <Room
                  key={apartment.id}
                  id={apartment.id}
                  image={apartment.images[0]}
                  title={apartment.title}
                  companions={apartment.companions}
                  utilities={apartment.utilities}
                  dates={apartment.dates}
                  price={apartment.price}
                  carouselImages={apartment.images}
                  location={apartment.location}
                  info1={apartment.description}
                  info2={apartment.additionalInfo}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal de filtros para móvil */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
            <div className="bg-white w-full h-full sm:h-auto sm:rounded-t-xl fixed bottom-0 p-4 animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Filtros</h3>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de alojamiento
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    <option value="">Todos</option>
                    <option value="Studio">Estudio</option>
                    <option value="Habitación">Habitación</option>
                    <option value="Piso completo">Piso completo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 text-sm border rounded-md"
                  >
                    <option value="">Todas las ubicaciones</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rango de precio
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full p-2 text-sm border rounded-md"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full p-2 text-sm border rounded-md"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Características
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {allFeatures.map((feature) => (
                      <label key={feature} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                            }
                          }}
                          className="rounded text-purple-600"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      applyFilters();
                      setIsFilterModalOpen(false);
                    }}
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                  >
                    Aplicar filtros
                  </button>
                  <button
                    onClick={() => {
                      // Resetear filtros
                      setSelectedCategory("");
                      setSelectedLocation("");
                      setPriceRange([0, 3000]);
                      setSelectedFeatures([]);
                      setIsFilterModalOpen(false);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedApartment && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn p-2 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-slideUp">
            <button 
              onClick={closeModal}
              className="absolute right-2 top-2 z-10 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-3 sm:p-4">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                loop={true}
                className="h-48 sm:h-56 mb-4 modal-swiper"
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

              <h2 className="text-lg sm:text-xl font-bold mb-2">{selectedApartment.title}</h2>
              <p className="text-base sm:text-lg font-semibold text-purple-600 mb-3">
                {selectedApartment.price}€/mes
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p className="text-gray-600">{selectedApartment.location}</p>
                </div>
                <div>
                  <p className="font-semibold">Tamaño:</p>
                  <p className="text-gray-600">{selectedApartment.size}</p>
                </div>
                <div>
                  <p className="font-semibold">Duración:</p>
                  <p className="text-gray-600">{selectedApartment.duration}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-1 text-sm">Descripción:</p>
                <p className="text-sm text-gray-600">{selectedApartment.description}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-1 text-sm">Características:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApartment.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                {/* Información del propietario */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={selectedApartment.user.avatar} 
                    alt={selectedApartment.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{selectedApartment.user.name}</h3>
                    <p className="text-xs text-gray-600">Propietario</p>
                  </div>
                  <button
                    onClick={() => navigate(`/profile/${selectedApartment.user.id}`)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Ver perfil
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-end border-t pt-3">
                <button
                  onClick={() => handleViewDetails(selectedApartment.id)}
                  className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm flex items-center gap-1"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Ver más</span>
                </button>
                <button
                  onClick={() => handleChatOpen(selectedApartment)}
                  className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm flex items-center gap-1"
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