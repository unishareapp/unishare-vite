import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Términos y Condiciones
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Política de Privacidad
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} UniShare. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
