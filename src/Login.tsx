import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'staff';
  timestamp: Date;
}
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simular login exitoso
    const mockUser: User = {
      name: "Usuario de Prueba",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=test",
      isLoggedIn: true
    };
    
    setUser(mockUser);
    navigate('/');
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simular respuesta del staff
    setTimeout(() => {
      const staffResponse: Message = {
        id: Date.now(),
        text: "Hola, ¿en qué puedo ayudarte?",
        sender: 'staff',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, staffResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold text-center mb-2 text-purple-800">Unishare</h1>
        <p className="text-xl text-center mb-6 text-purple-600">¡Compartir es vivir!</p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">Iniciar Sesión</h2>
          
          {/* Mensajes de error y éxito */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ¿No tienes cuenta? Regístrate
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Botón del chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-6 top-6 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
      >
        <FaComments className="text-xl" />
      </button>

      {/* Ventana del chat */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg w-11/12 max-w-md h-[600px] flex flex-col animate-slideUp">
            <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Chat con el Staff</h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">¿En qué podemos ayudarte?</p>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
