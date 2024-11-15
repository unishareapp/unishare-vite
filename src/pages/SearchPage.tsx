import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Importamos los datos de los apartamentos
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
  // ... resto de los apartamentos
];

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const locations = [...new Set(apartments.map(apt => apt.location))];
  const allFeatures = [...new Set(apartments.flatMap(apt => apt.features))];

  const filteredApartments = apartments.filter(apt => 
    apt.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || apt.category === selectedCategory) &&
    (selectedLocation === "" || apt.location === selectedLocation) &&
    apt.price >= priceRange[0] && apt.price <= priceRange[1] &&
    (selectedFeatures.length === 0 || selectedFeatures.every(feature => apt.features.includes(feature)))
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">
          Resultados para: {searchQuery}
        </h1>
        
        {/* Filtros */}
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

        {/* Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map(apt => (
            <div 
              key={apt.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
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
                <p className="text-gray-600 mb-2">{apt.category}</p>
                <p className="text-purple-600 font-bold">${apt.price}/mes</p>
                <p className="text-gray-500 text-sm mt-2">{apt.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {apt.features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApartments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron resultados para tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 