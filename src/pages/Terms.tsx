export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
      
      <div className="prose prose-indigo">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="mb-4">
            Bienvenido a UniShare. Al acceder y utilizar esta plataforma, aceptas estos términos y condiciones en su totalidad.
            Por favor, lee detenidamente este documento antes de utilizar nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso del Servicio</h2>
          <p className="mb-4">
            UniShare es una plataforma que permite a los usuarios buscar y publicar alojamientos para estudiantes.
            Al utilizar nuestros servicios, te comprometes a:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proporcionar información precisa y verdadera</li>
            <li>Mantener la confidencialidad de tu cuenta</li>
            <li>No utilizar el servicio para fines ilegales</li>
            <li>Respetar los derechos de otros usuarios</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Contenido del Usuario</h2>
          <p className="mb-4">
            Al publicar contenido en UniShare, garantizas que:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Eres el propietario del contenido o tienes derecho a publicarlo</li>
            <li>El contenido es preciso y no es engañoso</li>
            <li>El contenido no infringe los derechos de terceros</li>
            <li>El contenido cumple con todas las leyes aplicables</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Responsabilidad</h2>
          <p className="mb-4">
            UniShare actúa como intermediario entre usuarios y no es responsable de:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>La exactitud de los anuncios publicados</li>
            <li>El comportamiento de los usuarios</li>
            <li>Las transacciones entre usuarios</li>
            <li>Los daños o pérdidas resultantes del uso del servicio</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Modificaciones</h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}
