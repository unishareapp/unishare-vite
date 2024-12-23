import { useState } from 'react';

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  priceRange: [number, number];
  province: string;
  roomType: string;
  furnished: boolean;
  petsAllowed: boolean;
  utilities: string[];
  availability: string;
  sortBy: string;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [0, 2000],
    province: '',
    roomType: '',
    furnished: false,
    petsAllowed: false,
    utilities: [],
    availability: '',
    sortBy: 'recent'
  });

  const provinces = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', /* ... */
  ];

  const roomTypes = [
    'Piso completo',
    'Habitación individual',
    'Habitación compartida',
    'Estudio'
  ];

  const utilityOptions = [
    'Internet',
    'Agua',
    'Luz',
    'Gas',
    'Calefacción',
    'Aire acondicionado'
  ];

  const availabilityOptions = [
    'Inmediata',
    'Este mes',
    'Próximo mes',
    'Próximo curso'
  ];

  const handleChange = (name: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleUtilityToggle = (utility: string) => {
    const newUtilities = filters.utilities.includes(utility)
      ? filters.utilities.filter(u => u !== utility)
      : [...filters.utilities, utility];
    handleChange('utilities', newUtilities);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>

      {/* Rango de precio */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Precio mensual
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.priceRange[1]}
            onChange={(e) => handleChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <span className="text-sm text-gray-600">
            Hasta {filters.priceRange[1]}€
          </span>
        </div>
      </div>

      {/* Provincia */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Provincia
        </label>
        <select
          value={filters.province}
          onChange={(e) => handleChange('province', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Todas las provincias</option>
          {provinces.map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
      </div>

      {/* Tipo de habitación */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de alojamiento
        </label>
        <select
          value={filters.roomType}
          onChange={(e) => handleChange('roomType', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Todos los tipos</option>
          {roomTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Características */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Características
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.furnished}
              onChange={(e) => handleChange('furnished', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Amueblado</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.petsAllowed}
              onChange={(e) => handleChange('petsAllowed', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Mascotas permitidas</span>
          </label>
        </div>
      </div>

      {/* Servicios incluidos */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Servicios incluidos
        </label>
        <div className="grid grid-cols-2 gap-2">
          {utilityOptions.map(utility => (
            <label key={utility} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.utilities.includes(utility)}
                onChange={() => handleUtilityToggle(utility)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">{utility}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disponibilidad
        </label>
        <select
          value={filters.availability}
          onChange={(e) => handleChange('availability', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Cualquier fecha</option>
          {availabilityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Ordenar por */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ordenar por
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="recent">Más recientes</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>
    </div>
  );
}
