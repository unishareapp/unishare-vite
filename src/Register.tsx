import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './types';

interface RegisterProps {
  setUser: (user: User) => void;
}

function Register({ setUser }: RegisterProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const newUser: User = {
      id: 0,
      name: formData.username,
      email: formData.email,
      password: formData.password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
      joinDate: new Date(),
      rating: 0,
      reviewCount: 0
    };

    setSuccess(true);
    
    setTimeout(() => {
      setUser(newUser);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-center mb-2 text-purple-800">Unishare</h1>
        <p className="text-xl text-center mb-6 text-purple-600">¡Únete a nuestra comunidad!</p>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Registro</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              ¡Registro exitoso! Redirigiendo...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register; 