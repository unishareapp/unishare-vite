"use client";

import { Button, Modal, Carousel } from "flowbite-react";
import { useState } from "react";

export default function Room() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    <div className="flex flex-col w-full h-auto rounded-md">
    <div id="image" className="block relative">
      <span className="absolute bottom-0 left-0 flex text-center text-xs justify-center items-center gap-1 m-2 bg-white rounded-md p-2 bg-opacity-35">
        <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description"/>
        Antonio
      </span>
      <img src="/test.jpg"  alt="Logo" className="w-full h-[250px] object-cover rounded-md"/> {/* Dato 0 */}
      
    </div>

    <h1 className="text-xl font-bold my-2">Habitación en Reina Mercedes{/* Dato 1 */}</h1>
    <div id="separator" className="flex">
      <div className="w-2/3">
        <p>🙋🏼‍♂️: Tú + 2 compañeros {/* Dato 2 */}</p>
        <p>💰: Luz, Agua, Comunidad {/* Dato 3 */}</p>
        <p>⏰: 2 Septiembre - 1 Julio {/* Dato 4 */}</p>
      </div>
      <div className="w-1/3 flex flex-col items-center justify-center gap-2">
        <p className="font-bold text-xl">267€ / mes{/* Dato 5 */}</p>
      </div>
    </div>
    <div className="flex flex-row gap-1">
      <button onClick={() => setOpenModal(true)} className="w-5/6 p-2 px-4 bg-cyan-400 rounded-md text-xs mt-2">Más información</button>
      <button className="w-1/6 p-1 px-4 bg-red-500 rounded-md text-lg mt-2">💙</button>
    </div>
  </div>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          size="lg" // Ajusta el tamaño si es necesario
          position="center" // Asegúrate de que la posición sea 'center'
        >
          <Modal.Body>
            <div className="space-y-2">
              <div id="image" className="block relative">
                  <span className="absolute bottom-0 left-0 flex text-center text-xs justify-center items-center gap-1 m-2 bg-white rounded-md p-2 bg-opacity-35">
                      <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description"/>
                      Antonio
                  </span>
                  <div className="w-full h-[300px] object-cover rounded-md mb-5">
                    <Carousel>
                      <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg {/* Dato 6 */}" alt="..." />
                      <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg {/* Dato 7 */}" alt="..." />
                      <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg {/* Dato 8 */}" alt="..." />
                      <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg {/* Dato 9 */}" alt="..." />
                      <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg {/* Dato 10 */}" alt="..." />
                    </Carousel>
                  </div>
                  
              </div>
              <h1 className="text-xl font-bold">Habitación en Reina Mercedes {/* Dato 1 */}</h1>
              <div className="">
                  <p>🙋🏼‍♂️: Tú + 2 compañeros {/* Dato 2 */}</p>
                  <p>💰: Luz, Agua, Comunidad {/* Dato 3 */}</p>
                  <p>⏰: 2 Septiembre - 1 Julio {/* Dato 4 */}</p>
                  <p>📍: Sevilla ( Reina Mercedes ) {/* Dato 11 */}</p>
              </div>
              <h1 className="text-xl font-bold">Información</h1>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                companies around the world are updating their terms of service agreements to comply. {/* Dato 12 */}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                soon as possible of high-risk data breaches that could personally affect them. {/* Dato 13 */}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
            <div className="flex gap-2">
              <Button>Contactar</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cerrar
              </Button>
            </div>
            <div>
              <p className="font-bold text-xl">267€ / mes {/* Dato 14 */}</p>
            </div>
          </Modal.Footer>
        </Modal>
    </>
  );
}
