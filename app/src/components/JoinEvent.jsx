import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Navbar from './Navbar';
import Alert from './Alert';
import Success from './Success';

export default function JoinEventPage() {
  const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);
  const [userName] = useSelector((state) => [state.global.name], shallowEqual);
  const [userId] = useSelector((state) => [state.global.userId], shallowEqual);

  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    date: ''
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
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', date: '' });
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.recipe?.title?.toLowerCase().includes(filters.search.toLowerCase()) || false;
    const matchesDate = !filters.date || event.date === filters.date;
    return matchesSearch && matchesDate;
  });

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/join-event/${eventId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName }),
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
        body: JSON.stringify({ username: userName }),
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-green-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10" style={{ marginTop: '80px' }}>
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Discover and Join Events</h1>
          <p className="text-gray-700 text-lg">Use filters to find events that match your interests and join them effortlessly.</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Filter Events</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Search</label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by recipe title"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">Enter keywords to search for specific recipes.</p>
            </div>
            <div className="flex-1">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">Filter events happening on a specific date.</p>
            </div>
            <button
              onClick={handleClearFilters}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-500"
            >
              Clear Filters
            </button>
          </div>
        </section>

        {successMsg && <Success msg={successMsg} />}
        {error && <Alert msg={error} />}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
              <img
                src={event.recipe.image}
                alt={event.recipe.title}
                className="rounded-lg object-cover h-40 w-full mb-4"
              />
              <h2 className="text-lg font-semibold text-green-700 mb-2">{event.recipe.title}</h2>
              <p className="text-gray-600 mb-2">{event.recipe.description}</p>
              <p className="text-sm text-gray-500 mb-1">📅 Date: {event.date}</p>
              <p className="text-sm text-gray-500 mb-4">👥 Max Attendees: {event.max_attendees} | Registered: {event.registered_attendees}</p>
              <div className="flex justify-between">
                <button className="text-green-700 font-semibold hover:underline">More Info</button>
                {isLoggedIn && (
                  event.joined_users.includes(userId) ? (
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      onClick={() => handleLeaveEvent(event.id)}
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                      onClick={() => handleJoinEvent(event.id)}
                    >
                      Join
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
