import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
        

          <div className="flex items-center space-x-4">
            
            {user ? (
              <>
                <Link to="/add-apartment" className="text-gray-700 hover:text-gray-900">
                  Publicar
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-gray-900">
                  Favoritos
                </Link>
                <Link to="/messages" className="text-gray-700 hover:text-gray-900">
                  Mensajes
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                  Perfil
                </Link>
               
                <button
                  onClick={logout}
                  className="ml-4 px-3 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-3 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
