import { useState, useEffect } from 'react';
import { registerForPushNotifications } from '../utils/pushNotifications';

export default function NotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Comprobar si ya se han habilitado las notificaciones
    const checkNotificationStatus = async () => {
      if ('Notification' in window) {
        const permission = await Notification.permission;
        if (permission === 'default') {
          setShowPrompt(true);
        }
      }
    };

    checkNotificationStatus();
  }, []);

  const handleEnable = async () => {
    const success = await registerForPushNotifications();
    if (success) {
      setShowPrompt(false);
    }
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-6 z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Activar notificaciones
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Recibe notificaciones sobre mensajes nuevos y actualizaciones importantes.
          </p>
          <div className="mt-4 flex">
            <button
              type="button"
              onClick={handleEnable}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activar
            </button>
            <button
              type="button"
              onClick={() => setShowPrompt(false)}
              className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              No, gracias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
