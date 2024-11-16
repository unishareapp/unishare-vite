import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface User {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface SettingsProps {
  user: User | null;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

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
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Ajustes</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Preferencias</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notificaciones por email</span>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <span className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notificaciones push</span>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <span className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></span>
                </button>
              </div>
              {/* Aquí puedes añadir más opciones de configuración */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 