import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface Message {
  id: number;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

interface ChatContextType {
  messages: Record<string, Message[]>;
  sendMessage: (receiverId: string, content: string) => void;
  markAsRead: (chatId: string) => void;
  unreadCount: Record<string, number>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [unreadCount, setUnreadCount] = useState<Record<string, number>>({});

  useEffect(() => {
    if (user) {
      // Conectar al WebSocket cuando el usuario inicia sesión
      const ws = new WebSocket(`ws://tu-servidor.com/ws?userId=${user.id}`);

      ws.onopen = () => {
        console.log('Conexión WebSocket establecida');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'message') {
          const { message } = data;
          setMessages(prev => ({
            ...prev,
            [message.senderId]: [...(prev[message.senderId] || []), message]
          }));

          // Incrementar contador de mensajes no leídos
          if (message.senderId !== user.id) {
            setUnreadCount(prev => ({
              ...prev,
              [message.senderId]: (prev[message.senderId] || 0) + 1
            }));
          }
        }
      };

      ws.onclose = () => {
        console.log('Conexión WebSocket cerrada');
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [user]);

  const sendMessage = (receiverId: string, content: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'message',
        data: {
          receiverId,
          content
        }
      };
      socket.send(JSON.stringify(message));
    }
  };

  const markAsRead = (chatId: string) => {
    setUnreadCount(prev => ({
      ...prev,
      [chatId]: 0
    }));
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, markAsRead, unreadCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat debe ser usado dentro de un ChatProvider');
  }
  return context;
};
