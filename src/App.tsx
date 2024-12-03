import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Favorites from './pages/Favorites';
import { Apartment, Message, User } from './types';
import Search from './pages/Search';
import ApartmentDetail from './pages/ApartmentDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MyApartments from './components/MyApartments';
import MyChats from './MyChats';
import { apartments as initialApartments } from './data';
import Register from './Register';
import AddApartment from './pages/AddApartment';
import UserProfile from './pages/UserProfile';

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  const [likedApartments, setLikedApartments] = useState<number[]>([]);
  const [setCurrentChatApartment] = useState<Apartment | null>(null);
  const [setIsChatOpen] = useState(false);
  const [apartments, setApartments] = useState(initialApartments);
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});

  const handleLike = (id: number) => {
    if (!user) {
      return;
    }
    setLikedApartments(prev => 
      prev.includes(id) ? prev.filter(aptId => aptId !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSendMessage = (apartmentId: number, text: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [apartmentId]: [...(prev[apartmentId] || []), newMessage]
    }));

    // Simular respuesta del host
    setTimeout(() => {
      const hostResponse: Message = {
        id: Date.now() + 1,
        text: "¡Gracias por tu mensaje! Te responderé lo antes posible.",
        sender: 'host',
        timestamp: new Date()
      };

      setMessages(prev => ({
        ...prev,
        [apartmentId]: [...(prev[apartmentId] || []), hostResponse]
      }));
    }, 1000);
  };

  const openChat = (apartment: Apartment) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Inicializar el chat si no existe
    if (!messages[apartment.id]) {
      setMessages(prev => ({
        ...prev,
        [apartment.id]: []
      }));
    }
    
    setCurrentChatApartment(apartment);
    setIsChatOpen(true);
  };

  const handleAddApartment = (newApartment: Omit<Apartment, 'id' | 'user'>) => {
    const apartmentWithId: Apartment = {
      ...newApartment,
      id: apartments.length + 1,
      user: {
        name: user!.name,
        avatar: user!.avatar
      }
    };
    setApartments(prev => [...prev, apartmentWithId]);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                likedApartments={likedApartments}
                handleLike={handleLike}
                openChat={openChat}
                user={user}
                handleLogout={handleLogout}
                apartments={apartments}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            } 
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                apartments={apartments.filter(apt => likedApartments.includes(apt.id))}
                likedApartments={likedApartments}
                handleLike={handleLike}
                user={user}
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <Search 
                apartments={apartments}
                likedApartments={likedApartments}
                handleLike={handleLike}
                openChat={openChat}
                onSendMessage={handleSendMessage}
                messages={messages}
                user={user}
              />
            } 
          />
          <Route 
            path="/apartment/:id" 
            element={
              <ApartmentDetail 
                apartments={apartments}
                likedApartments={likedApartments}
                handleLike={handleLike}
                openChat={openChat}
                onSendMessage={handleSendMessage}
                messages={messages}
                user={user}
              />
            } 
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route 
            path="/my-apartments" 
            element={
              <MyApartments 
                user={user} 
                apartments={apartments}
              />
            } 
          />
          <Route 
            path="/my-chats" 
            element={
              <MyChats 
                user={user}
                messages={messages}
                apartments={apartments}
                onSendMessage={handleSendMessage}
              />
            } 
          />
          <Route 
            path="/add-apartment" 
            element={
              <AddApartment 
                user={user}
                onAddApartment={handleAddApartment}
              />
            } 
          />
          <Route 
            path="/profile/:userId" 
            element={<UserProfile apartments={apartments} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;