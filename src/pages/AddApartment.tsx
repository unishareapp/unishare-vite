import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import { Apartment, User } from '../types';

interface AddApartmentProps {
  user: User | null;
  onAddApartment: (apartment: Omit<Apartment, 'id' | 'user'>) => void;
}

const AddApartment: React.FC<AddApartmentProps> = ({ user, onAddApartment }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    location: '',
    size: '',
    description: '',
    features: [] as string[],
    duration: ''
  });

  const allFeatures = ["Amueblado", "WiFi", "Gimnasio", "Lavandería", "Terraza", "Parking"];
  const categories = ["Piso", "Habitación", "Estudio"];
  const locations = ["Centro de la ciudad", "Zona residencial", "Campus universitario"];
  const durations = ["1 mes", "3 meses", "6 meses", "1 año", "Flexible"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    const newApartment = {
      ...formData,
      price: Number(formData.price),
      images,
    };

    onAddApartment(newApartment);
    navigate('/my-apartments');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={() => navigate('/my-apartments')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <FaArrowLeft className="text-sm" />
            <span>Volver a Mis Apartamentos</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Añadir nuevo apartamento
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Ej: Acogedor estudio cerca del campus"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="">Seleccionar...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (€/mes)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ej: 500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="">Seleccionar...</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño
                </label>
                <input
                  type="text"
                  required
                  value={formData.size}
                  onChange={e => setFormData({...formData, size: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ej: 45m²"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración
              </label>
              <select
                required
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="">Seleccionar...</option>
                {durations.map(dur => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Características
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allFeatures.map(feature => (
                  <label key={feature} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => {
                        setFormData(prev => ({
                          ...prev,
                          features: prev.features.includes(feature)
                            ? prev.features.filter(f => f !== feature)
                            : [...prev.features, feature]
                        }));
                      }}
                      className="rounded text-purple-600 focus:ring-purple-500 w-5 h-5"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Describe tu apartamento..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes
              </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-500 h-32">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <FaPlus className="text-gray-400" />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Publicar apartamento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApartment; 