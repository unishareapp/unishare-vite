export async function registerForPushNotifications() {
  try {
    // Comprobar si el navegador soporta notificaciones
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones push');
      return false;
    }

    // Solicitar permiso para notificaciones
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Permiso de notificaciones denegado');
      return false;
    }

    // Registrar el service worker
    const registration = await navigator.serviceWorker.register('/service-worker.js');

    // Obtener la suscripción push existente o crear una nueva
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY!)
    });

    // Enviar la suscripción al servidor
    await sendSubscriptionToServer(subscription);

    return true;
  } catch (error) {
    console.error('Error al registrar las notificaciones push:', error);
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscriptionToServer(subscription: PushSubscription) {
  const response = await fetch('/api/push-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription)
  });

  if (!response.ok) {
    throw new Error('Error al guardar la suscripción en el servidor');
  }
}
