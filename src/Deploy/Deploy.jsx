import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Chat from './ChatBubble';
import whatsapp from '../assets/whatsapp.png';
import web from '../assets/web.png';
import { useNavigate } from 'react-router-dom';

export default function Deploy() {
  const navigate = useNavigate();

  const Card = ({ image, name, navigateTo }) => {
    return (
      <div
        onClick={() => navigate(navigateTo)}
        className="flex flex-col items-center justify-center p-6 transition-transform duration-300 ease-in-out border border-gray-300 rounded-lg shadow-md col-3 shadow-gray-400 bg-gradient-to-r from-gray-200 to-gray-200 hover:shadow-gray-400 hover:shadow-xl hover:scale-105"
      >
        <img src={image} alt="WhatsApp Icon" className="object-contain w-40 h-40 mb-4" />
        <h1
          className="text-lg font-semibold text-gray-800"
          style={{ fontFamily: "Georgia" }}
        >
          {name}
        </h1>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <Chat apikey="96e4ba03-62b1-4455-8891-6d099cb4163a" />
      <div className="row flex items-center justify-center gap-[100px] mx-3 mt-3">
        <Card
          image={whatsapp}
          name="Whatsapp"
          navigateTo="/whatsapp"
        />
        <Card
        image={web}
        name="Web"
        navigateTo="/web"



        />
       
        

      </div>
    </div>
  );
}
