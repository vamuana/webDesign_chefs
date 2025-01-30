import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Layer1 from '../assets/Layer_1.jpg';
import friends from '../assets/friends.png';

export default function HomePageMenu() {
  const [userName] = useSelector((state) => [state.global.name], shallowEqual); 
  const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);

  return (
    <div className="min-h-screen flex flex-col">
  <Navbar />
  {/* Header */}
  {/* <header className="bg-gray-100 flex justify-between items-center p-4 shadow-md">
    <div className="w-40 h-12">
      <img 
        src = {Layer1}
        alt="Cook&Meet Logo"
        className="w-full h-full object-contain" 
      />
    </div>
    <div className="space-x-4">
      <button className="px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
        Main Menu
      </button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
        Log In
      </button>
    </div>
  </header> */}

      {/* Main Section */}
      <main className="flex-grow bg-gray-50 flex flex-col items-center py-16">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome to Cook&Meet!</h1>
        <p className="text-xl text-gray-700 mb-12">What are you looking for?</p>

        <div className="flex space-x-8">
          {/* Create Card */}
          <div className="bg-green-100 rounded-xl shadow-lg p-8 w-64 text-center">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Create</h2>
            <p className="text-gray-600 mb-4">a cooking event</p>
            {isLoggedIn ? (
              <Link to="/create-event">
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                Get Started
              </button>
              </Link>
    ) : (
      <p className="text-red-500 font-semibold">You have to be Logged In</p>
    )}
          </div>

          {/* Join Card */}
          <div className="bg-orange-100 rounded-xl shadow-lg p-8 w-64 text-center">
            <div className="text-6xl mb-4">🍴</div>
            <h2 className="text-xl font-bold text-orange-700 mb-2">Join</h2>
            <p className="text-gray-600 mb-4">a cooking event</p>
            {isLoggedIn ? (
             <Link to="/join-event">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition">
              Get Started
            </button>
            </Link>
          ) : (
            <p className="text-red-500 font-semibold">You have to be Logged In</p>
          )}
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={friends}
            alt="Cooking together"
            className="rounded-lg shadow-lg mb-8 md:mb-0 md:mr-8"
            height= {300}
            width={200}
          />
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">What is Cook&Meet?</h2>
            <p className="text-gray-700">
              Cook&Meet is an innovative platform designed to bring students together through the joy of cooking. Whether you're looking to host a cooking event, join one, or find a cooking buddy to explore new recipes, Cook&Meet makes it easy to connect with fellow food enthusiasts. The website encourages collaboration, learning, and socializing in the kitchen, creating unforgettable experiences over shared meals.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-gray-600">
        Cook&Meet 2025 | All Rights Reserved
      </footer>
    </div>
  );
}
