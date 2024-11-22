import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaComments } from 'react-icons/fa';

interface MyChatsProps {
  user: any;
  messages: any;
  apartments: any[];
  onSendMessage: (apartmentId: number, text: string) => void;
}

const MyChats: React.FC<MyChatsProps> = ({ user, messages, apartments, onSendMessage }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true);

  // Filtrar solo los apartamentos que tienen mensajes
  const activeChats = apartments.filter(apt => messages[apt.id]?.length > 0);

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedChat) return;
    onSendMessage(selectedChat.id, currentMessage);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {selectedChat && !showChatList ? (
              <button
                onClick={() => {
                  setShowChatList(true);
                  setSelectedChat(null);
                }}
                className="text-gray-600 hover:text-gray-800 md:hidden"
              >
                <FaArrowLeft className="text-xl" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaArrowLeft className="text-xl" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-purple-800">
              {selectedChat && !showChatList ? selectedChat.title : 'Mis Chats'}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="grid md:grid-cols-3 h-[calc(100vh-200px)]">
            {/* Lista de chats - oculta en móvil cuando se selecciona un chat */}
            <div className={`${
              selectedChat && !showChatList ? 'hidden' : 'block'
            } md:block border-r border-gray-200 overflow-y-auto`}>
              {activeChats.map(apt => (
                <button
                  key={apt.id}
                  onClick={() => {
                    setSelectedChat(apt);
                    setShowChatList(false);
                  }}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedChat?.id === apt.id ? 'bg-purple-50' : ''
                  }`}
                >
                  <img
                    src={apt.images[0]}
                    alt={apt.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800">{apt.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {messages[apt.id]?.[messages[apt.id].length - 1]?.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Área de chat - visible en móvil solo cuando se selecciona un chat */}
            <div className={`${
              !selectedChat || showChatList ? 'hidden' : 'block'
            } md:block col-span-2 flex flex-col`}>
              {selectedChat ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChat.images[0]}
                        alt={selectedChat.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{selectedChat.title}</h3>
                        <p className="text-sm text-gray-500">{selectedChat.user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[selectedChat.id]?.map((message: any) => (
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
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
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
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FaComments className="text-6xl mx-auto mb-4 text-gray-400" />
                    <p>Selecciona un chat para ver los mensajes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChats; 