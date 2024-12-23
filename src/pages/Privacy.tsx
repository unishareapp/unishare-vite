export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      
      <div className="prose prose-indigo">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Recopilación de Información</h2>
          <p className="mb-4">
            Recopilamos la siguiente información cuando utilizas UniShare:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Información de registro (nombre, email, contraseña)</li>
            <li>Información del perfil</li>
            <li>Contenido generado por el usuario</li>
            <li>Datos de uso y analíticos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
          <p className="mb-4">
            Utilizamos tu información para:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proporcionar y mejorar nuestros servicios</li>
            <li>Personalizar tu experiencia</li>
            <li>Comunicarnos contigo</li>
            <li>Garantizar la seguridad de la plataforma</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Compartir Información</h2>
          <p className="mb-4">
            No compartimos tu información personal con terceros, excepto:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Con tu consentimiento explícito</li>
            <li>Para cumplir con obligaciones legales</li>
            <li>Para proteger nuestros derechos o propiedad</li>
            <li>En caso de una fusión o adquisición</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Seguridad</h2>
          <p className="mb-4">
            Implementamos medidas de seguridad para proteger tu información, incluyendo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encriptación de datos sensibles</li>
            <li>Acceso restringido a datos personales</li>
            <li>Monitoreo regular de seguridad</li>
            <li>Copias de seguridad periódicas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Tus Derechos</h2>
          <p className="mb-4">
            Tienes derecho a:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acceder a tu información personal</li>
            <li>Corregir datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
