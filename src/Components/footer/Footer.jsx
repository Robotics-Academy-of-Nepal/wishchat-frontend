import React from "react";
import logo from "../../assets/wishchat-logo.png";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-3 mb-0 text-white bg-gray-900" style={{ fontFamily: "Georgia" }}>
      <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        {/* Logo and Social Icons Section */}
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="WishChat Logo" className="mb-4 h-28 w-28" />
          <p className="mb-4 text-white text-md">
            Your go-to platform for seamless communication.
          </p>
          <div className="flex gap-6 text-2xl">
            <a
              href="#"
              className="transition-all duration-200 hover:text-blue-500"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="transition-all duration-200 hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagramSquare />
            </a>
            <a
              href="#"
              className="transition-all duration-200 hover:text-blue-400"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="flex flex-col items-center">
          <h2 className="pb-2 mb-6 text-2xl font-semibold border-b-2 border-white">
            Useful Links
          </h2>
          <ul className="space-y-3 text-xl">
            <li>
              <a
                href="#"
                className="text-white transition-all hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition-all hover:text-blue-500"
              >
                Chatbot
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition-all hover:text-blue-500"
              >
                Build
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition-all hover:text-blue-500"
              >
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Location Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="pb-2 mb-6 text-2xl font-semibold border-b-2 border-white">
            Get in Touch
          </h2>
          <p className="text-xl text-white hover:text-blue-500">
            <strong>Location:</strong>Kupandol,Lalitpur
          </p>
          <p className="text-xl text-white hover:text-blue-500">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@wishchat.com"
              className="transition-all hover:text-white"
            >
            wishchatgmail.com
            </a>
          </p>
          <p className="text-xl text-white hover:text-blue-500">
            <strong>Phone:</strong> 123-456-7890
          </p>
        </div>
      </div>

    
    </footer>
  );
}
