"use client";

import { Button, Modal, Carousel } from "flowbite-react";
import { useState } from "react";

export default function Room({
  image, // Dato 0
  title, // Dato 1
  companions, // Dato 2
  utilities, // Dato 3
  dates, // Dato 4
  price, // Dato 5 y 14
  carouselImages, // Datos 6-10
  location, // Dato 11
  info1, // Dato 12
  info2, // Dato 13
}) {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-auto rounded-md">
        <div id="image" className="block relative">
          <span className="absolute bottom-0 left-0 flex text-center text-xs justify-center items-center gap-1 m-2 bg-white rounded-md p-2 bg-opacity-35">
            <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description" />
            Antonio
          </span>
          <img src={image} alt="Room Image" className="w-full h-[250px] object-cover rounded-md" /> {/* Dato 0 */}
        </div>

        <h1 className="text-xl font-bold my-2">{title}</h1> {/* Dato 1 */}
        <div id="separator" className="flex">
          <div className="w-2/3">
            <p>🙋🏼‍♂️: {companions}</p> {/* Dato 2 */}
            <p>💰: {utilities}</p> {/* Dato 3 */}
            <p>⏰: {dates}</p> {/* Dato 4 */}
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center gap-2">
            <p className="font-bold text-xl">{price} / mes</p> {/* Dato 5 */}
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
        size="lg"
        position="center"
      >
        <Modal.Body>
          <div className="space-y-2">
            <div id="image" className="block relative">
              <span className="absolute bottom-0 left-0 flex text-center text-xs justify-center items-center gap-1 m-2 bg-white rounded-md p-2 bg-opacity-35">
                <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description" />
                Antonio
              </span>
              <div className="w-full h-[300px] object-cover rounded-md mb-5">
              <Carousel>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="Image 1" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="Image 2" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="Image 3" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="Image 4" />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="Image 5" />
              </Carousel>
              </div>
            </div>
            <h1 className="text-xl font-bold">{title}</h1> {/* Dato 1 */}
            <div>
              <p>🙋🏼‍♂️: {companions}</p> {/* Dato 2 */}
              <p>💰: {utilities}</p> {/* Dato 3 */}
              <p>⏰: {dates}</p> {/* Dato 4 */}
              <p>📍: {location}</p> {/* Dato 11 */}
            </div>
            <h1 className="text-xl font-bold">Información</h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {info1} {/* Dato 12 */}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {info2} {/* Dato 13 */}
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
            <p className="font-bold text-xl">{price} / mes</p> {/* Dato 14 */}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
