import { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

interface ChatWindowProps {
  receiverId: string;
  receiverName: string;
  onClose: () => void;
}

export default function ChatWindow({ receiverId, receiverName, onClose }: ChatWindowProps) {
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMessages = messages[receiverId] || [];

  useEffect(() => {
    // Scroll al último mensaje
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(receiverId, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white rounded-t-lg shadow-lg">
      {/* Cabecera del chat */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">{receiverName}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mensajes */}
      <div className="h-96 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.senderId === user?.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-75">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Formulario de mensaje */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
