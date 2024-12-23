"use client";

import { Button, Modal, Carousel } from "flowbite-react";
import { useState } from "react";
import { api } from '../api/config';
import { Link } from 'react-router-dom';

interface RoomProps {
  id: number;
  image: string;
  title: string;
  companions: string;
  utilities: string;
  dates: string;
  price: number;
  carouselImages: string[];
  location: string;
  info1: string;
  info2: string;
}

export default function Room({
  id,
  image,
  title,
  companions,
  utilities,
  dates,
  price,
  carouselImages,
  location,
  info1,
  info2,
}: RoomProps) {
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContact = async () => {
    try {
      // Aquí puedes implementar la lógica de contacto
      await api.post('/contact', { roomId: id });
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al contactar:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
      } else {
        await api.post('/favorites', { roomId: id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error al gestionar favorito:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-auto rounded-md">
        <div id="image" className="block relative">
          <span className="absolute bottom-0 left-0 flex text-center text-xs justify-center items-center gap-1 m-2 bg-white rounded-md p-2 bg-opacity-35">
            <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description"/>
            Antonio
          </span>
          <img src={image} alt={title} className="w-full h-[250px] object-cover rounded-md"/>
        </div>

        <h1 className="text-xl font-bold my-2">{title}</h1>
        <div id="separator" className="flex">
          <div className="w-2/3">
            <p>🙋🏼‍♂️: {companions}</p>
            <p>💰: {utilities}</p>
            <p>⏰: {dates}</p>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center gap-2">
            <p className="font-bold text-xl">{price}€ / mes</p>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <button 
            onClick={() => setOpenModal(true)} 
            className="w-5/6 p-2 px-4 bg-cyan-400 rounded-md text-xs mt-2"
          >
            Más información
          </button>
          <button 
            onClick={toggleFavorite}
            className={`w-1/6 p-1 px-4 ${isFavorite ? 'bg-red-600' : 'bg-red-500'} rounded-md text-lg mt-2`}
          >
            💙
          </button>
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
                <img className="rounded-full w-5 h-5 object-cover" src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" alt="image description"/>
                Antonio
              </span>
              <div className="w-full h-[300px] object-cover rounded-md mb-5">
                <Carousel>
                  {carouselImages.map((img, index) => (
                    <img key={index} src={img} alt={`Imagen ${index + 1}`} />
                  ))}
                </Carousel>
              </div>
            </div>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="">
              <p>🙋🏼‍♂️: {companions}</p>
              <p>💰: {utilities}</p>
              <p>⏰: {dates}</p>
              <p>📍: {location}</p>
            </div>
            <h1 className="text-xl font-bold">Información</h1>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {info1}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {info2}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={handleContact}>Contactar</Button>
            <Link to={`/apartments/${id}`}>
              <Button color="gray">Ver detalles</Button>
            </Link>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </div>
          <div>
            <p className="font-bold text-xl">{price}€ / mes</p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
