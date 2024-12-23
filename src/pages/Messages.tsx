import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/config';
import ReportButton from '../components/ReportButton';

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  receiver: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface Chat {
  userId: string;
  userName: string;
  userAvatar?: string;
  lastMessage?: string;
  lastMessageDate?: string;
  unreadCount: number;
}

export default function Messages() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await api.get('/chats');
        setChats(data);
      } catch (error) {
        console.error('Error al cargar chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const data = await api.get(`/messages/${selectedChat}`);
          setMessages(data);
        } catch (error) {
          console.error('Error al cargar mensajes:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;

    try {
      const response = await api.post(`/messages/${selectedChat}`, {
        content: newMessage,
      });
      setMessages([...messages, response]);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Lista de chats */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Mensajes</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {chats.map((chat) => (
              <div
                key={chat.userId}
                onClick={() => setSelectedChat(chat.userId)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.userId ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={chat.userAvatar || 'https://via.placeholder.com/40'}
                    alt={chat.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{chat.userName}</p>
                      {chat.lastMessageDate && (
                        <p className="text-sm text-gray-500">
                          {new Date(chat.lastMessageDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {chat.lastMessage && (
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    )}
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {chats.find((chat) => chat.userId === selectedChat)?.userName}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="relative group">
                    <div className={`flex ${
                      message.sender.id === user?.id ? 'justify-end' : 'justify-start'
                    }`}>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender.id === user?.id
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
                    <div className="hidden group-hover:block absolute top-0 right-0">
                      <ReportButton
                        targetId={message.id}
                        targetType="message"
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Selecciona un chat para empezar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
