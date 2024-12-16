import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function HomePageMenu() {
  const [userName] = useSelector((state) => [state.global.name], shallowEqual); 
  const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <Navbar />
      <main className="flex flex-col items-center bg-gray-100" style={{ paddingTop: '64px', height: 'calc(100vh - 64px)' }}>
        
        {isLoggedIn && (
          <div className="text-center mt-8">
            <h3 className="text-4xl font-extrabold text-green-700 drop-shadow-md animate-fadeIn">
              Welcome back, <span className="text-green-900 underline">{userName}</span>!
            </h3>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-green-700 mt-4">I want to...</h1>

        <div className="grid grid-cols-2 gap-12 w-3/4">
          {/* Create Section */}
          <Link
            to="/create-event"
            style={{ backgroundColor: '#3D9879' }}
            className="text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-110 hover:bg-[#357D68] flex flex-col items-center py-20 px-16"
          >
            <div className="text-center">
              <img
                src="/src/assets/chef.png"
                alt="Create"
                className="mb-4 h-56"
              />
              <h2 className="text-5xl font-bold">CREATE</h2>
              <p className="text-3xl">a cooking event</p>
            </div>
          </Link>

          {/* Join Section */}
          <Link
            to="/join-event"
            style={{ backgroundColor: '#F4B18C' }}
            className="text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-110 hover:bg-[#D8977C] flex flex-col items-center py-20 px-16"
          >
            <div className="text-center">
              <img
                src="/src/assets/cooking.png"
                alt="Join"
                className="mb-4 h-56"
              />
              <h2 className="text-5xl font-bold">JOIN</h2>
              <p className="text-3xl">a cooking event</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
