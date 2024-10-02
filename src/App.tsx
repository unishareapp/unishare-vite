import Room from "./components/Room";
import './App.css';
import { RoomModal } from "./components/RoomModal";



function App() {

  const carouselImages = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];
  
  return (
    <>
    <main className="p-4 dark:bg-gray-800 lg:px-56">
      <header>
        <div id="search" className="flex items-center justify-center gap-2">
            <button className="bg-black text-white p-2 px-8 rounded-md">
              <p>Logo</p>
            </button>
            <input className="rounded-md" type="text" placeholder="Busca..." />
            <button className="bg-black text-white p-2 px-8 rounded-md">
              <p>Logo</p>
            </button>
        </div>

      </header>

      <div id="main-container" className="pt-4">
        <div id="upper-part" className="flex flex-col items-center justify-center gap-2">
          <p>¿Qué buscas?</p>
          <div id="options" className="flex items-center justify-center gap-2">
            <button className="bg-black text-white p-2 px-8 rounded-md">
              <p>Piso</p>
            </button>
            <button className="bg-black text-white p-2 px-8 rounded-md">
              <p>Transporte</p>
            </button>
          </div>
          <div id="zones" className="overflow-x-auto w-full scrollbar-hide mt-8" style={{color: "red"}}> {/* Añadido overflow-x-auto y w-full */}
            <ul className="flex flex-row gap-4 whitespace-nowrap lg:justify-center"> {/* Añadido whitespace-nowrap */}
              <li className="border-b-2 border-black text-black p-2 px-8 ">Sevilla</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Cádiz</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Málaga</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Huelva</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Almería</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Jaén</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Córdoba</li>
              <li className="border-b-2 border-black text-black p-2 px-8 ">Granada</li>
            </ul>
          </div>
        </div>


        <div id="rooms" className="lg:grid grid-cols-4 gap-4 flex flex-col items-center gap-5 mt-8">

        <Room
          image="/test.jpg"
          title="Habitación en Reina Mercedes"
          companions="Tú + 2 compañeros"
          utilities="Luz, Agua, Comunidad"
          dates="2 Septiembre - 1 Julio"
          price="267€"
          carouselImages={carouselImages}
          location="Sevilla (Reina Mercedes)"
          info1="With less than a month to go before the European Union enacts new consumer privacy laws..."
          info2="The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25..."
        />



        </div>
      </div>
    
    </main>
    </>
  );
}

export default App;
