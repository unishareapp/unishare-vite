import { useState } from 'react';
import { api } from '../api/config';

interface ReportProps {
  targetId: number;
  targetType: 'apartment' | 'user' | 'message';
  onClose: () => void;
}

export default function Report({ targetId, targetType, onClose }: ReportProps) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const reasons = {
    apartment: [
      'Información falsa',
      'Contenido inapropiado',
      'Estafa',
      'Duplicado',
      'Otro'
    ],
    user: [
      'Comportamiento inadecuado',
      'Perfil falso',
      'Spam',
      'Acoso',
      'Otro'
    ],
    message: [
      'Contenido ofensivo',
      'Spam',
      'Acoso',
      'Estafa',
      'Otro'
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      setError('Por favor, selecciona un motivo');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await api.post('/reports', {
        targetId,
        targetType,
        reason,
        description
      });

      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      setError('Error al enviar el reporte. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reportar</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-green-600 text-center py-4">
            Reporte enviado correctamente. Gracias por ayudarnos a mantener la comunidad segura.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-600 text-sm">{error}</div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecciona un motivo</option>
                {reasons[targetType].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Proporciona más detalles sobre el problema..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:bg-red-400"
              >
                {loading ? 'Enviando...' : 'Enviar reporte'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
