import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Alert from './Alert';
import Success from './Success';
import Navbar from './Navbar';

export default function JoinEventPage() {
  const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);
  
  const [userName] = useSelector((state) => [state.global.name], shallowEqual);
  const [userId] = useSelector((state) => [state.global.userId], shallowEqual);

  const [successMsg, setSuccessMsg] = useState(null); 
  const [error, setError] = useState(null); 

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    date: '',
    time: '',
    rating: 0,
    location: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events/');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        const currentDate = new Date().toISOString().split('T')[0];
        const upcomingEvents = data.filter((event) => event.date >= currentDate);
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.recipe?.title?.toLowerCase().includes(filters.search.toLowerCase()) || false;
    const matchesDate = !filters.date || event.date === filters.date;
    const matchesTime = !filters.time || event.time_range.includes(filters.time);
    const matchesLocation = !filters.location || event.location === filters.location;

    return matchesSearch && matchesDate && matchesTime && matchesLocation;
  });

  const renderActionButton = (event) => {
    if (!isLoggedIn) return null;
  
    const isUserJoined = event.joined_users.includes(userId);
    console.log()
  
    return isUserJoined ? (
      <button
        className="flex-1 font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out 
                   hover:bg-red-700 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: '#D9534F',
          color: 'white',
        }}
        onClick={() => handleLeaveEvent(event.id)}
      >
        Leave
      </button>
    ) : (
      <button
        className="flex-1 font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out 
                   hover:bg-green-700 hover:scale-105 hover:shadow-lg"
        style={{
          backgroundColor: '#3D9879',
          color: 'white',
        }}
        onClick={() => handleJoinEvent(event.id)}
      >
        Join
      </button>
    );
  };
  

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/join-event/${eventId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join event');
      }
  
      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId 
            ? { ...updatedEvent, recipe: { ...event.recipe, image: event.recipe.image || updatedEvent.recipe.image } }
            : event
        )
      );
  
      setSuccessMsg('Successfully joined the event!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Error joining event:', err);
      setError(err.message || 'Error joining the event.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/leave-event/${eventId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to leave event');
      }
  
      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId 
            ? { ...updatedEvent, recipe: { ...event.recipe, image: event.recipe.image || updatedEvent.recipe.image } }
            : event
        )
      );
  
      setSuccessMsg('Successfully left the event!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error('Error leaving event:', err);
      setError(err.message || 'Error leaving the event.');
      setTimeout(() => setError(null), 3000);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8" style={{ paddingTop: '72px' }}>
        <h1 className="text-3xl font-bold text-center" style={{ color: '#3D9879' }}>
          Find an Event to Join
        </h1>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-2 mb-8">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search"
              className="border border-gray-300 rounded-md p-3 focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="time"
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-green-500 focus:border-green-500"
            />
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md p-3 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Locations</option>
              <option value="Manželské internáty">Manželské internáty</option>
              <option value="Štúrak">Štúrak</option>
              <option value="Átriáky">Átriáky</option>
            </select>
          </div>
        </div>

        {successMsg && (
        <div className="flex flex-col gap-4">
            <Success msg={successMsg} />
        </div>
        )}

        {error && (
        <div className="flex flex-col gap-4">
            <Alert msg={error} />
        </div>
        )}


        <div className="grid grid-cols-3 gap-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col">
              <img
                src={event.recipe.image}
                alt={event.recipe.title}
                className="rounded-lg object-cover h-40 w-full mb-4"
              />
              <h2 className="text-lg font-semibold" style={{ color: '#3D9879' }}>
                {event.recipe.title}
              </h2>
              <p className="text-sm text-gray-500">{event.recipe.description}</p>
              <p className="text-sm text-gray-500">
                Date: {event.date} | Duration: {event.time_range}
              </p>
              <p className="text-sm text-gray-500">Max Attendees: {event.max_attendees}</p>
              <p className="text-sm text-gray-500">Registered: {event.registered_attendees}</p>

              <div className="flex mt-4 gap-4">
              <button
                className="flex-1 bg-gray-200 font-semibold py-2 px-4 rounded-lg 
                            transition-all duration-200 ease-in-out 
                            hover:bg-gray-300 hover:scale-105 hover:shadow-lg"
                style={{ color: '#3D9879' }}
                >
                More Info
               </button>
                {renderActionButton(event)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
