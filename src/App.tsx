import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Favorites from './pages/Favorites';
import { Apartment } from './types';
import Search from './pages/Search';
import ApartmentDetail from './pages/ApartmentDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MyApartments from './components/MyApartments';

interface User {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

function App() {
  const [likedApartments, setLikedApartments] = useState<number[]>([]);
  const [currentChatApartment, setCurrentChatApartment] = useState<Apartment | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLike = (id: number) => {
    setLikedApartments(prev =>
      prev.includes(id) ? prev.filter(aptId => aptId !== id) : [...prev, id]
    );
  };

  const openChat = (apartment: Apartment) => {
    setCurrentChatApartment(apartment);
    setIsChatOpen(true);
  };

  const handleLogin = () => {
    setUser({
      name: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
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
            />
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <Favorites 
              likedApartments={likedApartments}
              handleLike={handleLike}
              openChat={openChat}
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              onLogin={handleLogin}
            />
          }
        />
        <Route 
          path="/search" 
          element={
            <Search 
              likedApartments={likedApartments}
              handleLike={handleLike}
              openChat={openChat}
            />
          } 
        />
        <Route 
          path="/apartment/:id" 
          element={
            <ApartmentDetail 
              likedApartments={likedApartments}
              handleLike={handleLike}
              openChat={openChat}
            />
          } 
        />
        <Route 
          path="/my-apartments" 
          element={<MyApartments />} 
        />
      </Routes>
    </Router>
  );
}

export default App;