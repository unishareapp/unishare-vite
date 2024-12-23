import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/config';

interface Report {
  id: number;
  targetId: number;
  targetType: 'apartment' | 'user' | 'message';
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  reporter: {
    id: string;
    name: string;
  };
}

interface Stats {
  totalUsers: number;
  totalApartments: number;
  activeReports: number;
  resolvedReports: number;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'reports' | 'users' | 'apartments'>('reports');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsData, statsData] = await Promise.all([
          api.get('/admin/reports'),
          api.get('/admin/stats')
        ]);
        setReports(reportsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const handleReportAction = async (reportId: number, action: 'resolve' | 'dismiss') => {
    try {
      await api.put(`/admin/reports/${reportId}/${action}`);
      setReports(reports.map(report => 
        report.id === reportId 
          ? { ...report, status: action === 'resolve' ? 'resolved' : 'dismissed' }
          : report
      ));
    } catch (error) {
      console.error('Error al actualizar reporte:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Acceso denegado</h2>
          <p className="mt-2 text-gray-600">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administración</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Usuarios Totales</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{stats?.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Apartamentos</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{stats?.totalApartments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Reportes Activos</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">{stats?.activeReports}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Reportes Resueltos</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats?.resolvedReports}</p>
        </div>
      </div>

      {/* Pestañas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('reports')}
            className={`${
              activeTab === 'reports'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Reportes
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('apartments')}
            className={`${
              activeTab === 'apartments'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Apartamentos
          </button>
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'reports' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Reporte #{report.id} - {report.reason}
                    </p>
                    <p className="text-sm text-gray-500">
                      Reportado por: {report.reporter.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Tipo: {report.targetType} #{report.targetId}
                    </p>
                    {report.description && (
                      <p className="mt-2 text-sm text-gray-600">{report.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    {report.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleReportAction(report.id, 'resolve')}
                          className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                          Resolver
                        </button>
                        <button
                          onClick={() => handleReportAction(report.id, 'dismiss')}
                          className="px-3 py-1 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
                        >
                          Descartar
                        </button>
                      </>
                    )}
                    {report.status !== 'pending' && (
                      <span className={`px-3 py-1 text-sm rounded-md ${
                        report.status === 'resolved' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status === 'resolved' ? 'Resuelto' : 'Descartado'}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Implementar las otras pestañas según sea necesario */}
    </div>
  );
}
