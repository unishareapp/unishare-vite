import React, { useState } from 'react';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Apartment {
  id: number;
  title: string;
  price: number;
  location: string;
  images: string[];
  description?: string;
  rooms?: number;
  bathrooms?: number;
  size?: number;
}

const MyApartments: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [apartments, setApartments] = useState<Apartment[]>([
    {
      id: 1,
      title: "Apartamento moderno cerca del campus",
      price: 800,
      location: "Calle Universidad 123",
      images: ["/apartment1.jpg"],
      description: "Hermoso apartamento totalmente amueblado",
      rooms: 3,
      bathrooms: 2,
      size: 90
    }
  ]);

  const [editForm, setEditForm] = useState<Apartment | null>(null);

  const handleEdit = (apartment: Apartment) => {
    setIsEditing(apartment.id);
    setEditForm(apartment);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    
    setApartments(prev => prev.map(apt => 
      apt.id === editForm.id ? editForm : apt
    ));
    setIsEditing(null);
    setEditForm(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    });
  };

  const handleDeleteApartment = (id: number) => {
    setApartments(prev => prev.filter(apt => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
        >
          <FaArrowLeft />
          <span>Volver</span>
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mis Apartamentos</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            + Añadir nuevo apartamento
          </button>
        </div>

        {apartments.map(apartment => (
          <div key={apartment.id} className="bg-white rounded-lg shadow-md mb-6 p-6">
            {isEditing === apartment.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editForm?.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio (€/mes)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editForm?.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editForm?.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tamaño (m²)
                    </label>
                    <input
                      type="number"
                      name="size"
                      value={editForm?.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={editForm?.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <img 
                      src={apartment.images[0]} 
                      alt={apartment.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{apartment.title}</h2>
                      <p className="text-gray-600">{apartment.location}</p>
                      <p className="text-purple-600 font-semibold">{apartment.price}€/mes</p>
                      <p className="text-gray-600">{apartment.size}m² · {apartment.rooms} hab · {apartment.bathrooms} baños</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(apartment)}
                      className="text-gray-600 hover:text-purple-600 p-2"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDeleteApartment(apartment.id)}
                      className="text-gray-600 hover:text-red-600 p-2"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{apartment.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApartments; 