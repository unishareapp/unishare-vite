import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Navbar from './components/Nav';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import AddApartment from './pages/AddApartment';
import ApartmentDetails from './pages/ApartmentDetails';
import Favorites from './pages/Favorites';
import Messages from './pages/Messages';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import { ChatProvider } from './contexts/ChatContext';
import NotificationPrompt from './components/NotificationPrompt';
// Importa tus otros componentes

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <ChatProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/apartments/:id" element={<ApartmentDetails />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-apartment"
                  element={
                    <ProtectedRoute>
                      <AddApartment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                {/* Otras rutas */}
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/search" element={<Search />} /> */}
              </Routes>
              <Footer />
              <NotificationPrompt />
            </div>
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;