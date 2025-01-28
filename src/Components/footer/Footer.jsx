import React from "react";
import logo from "../../assets/wishchat-logo.png";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-6 mt-0 text-white bg-gray-900" style={{ fontFamily: "Georgia" }}>
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-3">
        {/* Logo and Social Icons Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src={logo} alt="WishChat Logo" className="w-20 h-20 mb-4" />
          <p className="mb-4 text-sm md:text-base">
            Your go-to platform for seamless communication.
          </p>
          <div className="flex gap-4 text-lg">
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
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="pb-2 mb-4 text-lg font-semibold border-b-2 border-white">
            Useful Links
          </h2>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              <a href="/" className="transition-all hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="transition-all hover:text-blue-500">
                Chatbot
              </a>
            </li>
            <li>
              <a href="/upload" className="transition-all hover:text-blue-500">
                Build
              </a>
            </li>
            <li>
              <a href="/tutorials" className="transition-all hover:text-blue-500">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Location Section */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="pb-2 mb-4 text-lg font-semibold border-b-2 border-white">
            Get in Touch
          </h2>
          <p className="text-sm md:text-base">
            <strong>Location:</strong> Kupandol, Lalitpur
          </p>
          <p className="text-sm md:text-base">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@wishchat.com" className="transition-all hover:text-blue-500">
              wishchatgmail.com
            </a>
          </p>
          <p className="text-sm md:text-base">
            <strong>Phone:</strong> 123-456-7890
          </p>
        </div>
      </div>
    </footer>
  );
}
