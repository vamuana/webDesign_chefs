import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function JoinEventPage() {
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
            const response = await fetch("http://127.0.0.1:8000/api/events/");
            if (!response.ok) {
              throw new Error("Failed to fetch events");
            }
            const data = await response.json();
      
      
            const currentDate = new Date().toISOString().split("T")[0];       
            const upcomingEvents = data.filter((event) => {
              return event.date >= currentDate;
            });
            
            setEvents(upcomingEvents);
          } catch (error) {
            console.error("Error fetching events:", error);
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

    const isTimeInRange = (timeRange, targetTime) => {
        const [start, end] = timeRange.split('-');
        return (!targetTime ||
            (targetTime >= start && targetTime <= end) ||
            start.startsWith(targetTime) ||
            end.startsWith(targetTime));
    };

    // const filteredEvents = events.filter((event) => {
    //     const matchesSearch = event.recipe.title.toLowerCase().includes(filters.search.toLowerCase());
    //     const matchesDate = !filters.date || event.date === filters.date;
    //     const matchesTime = !filters.time || isTimeInRange(event.time_range, filters.time);
    //     // const matchesRating = event.rating >= filters.rating;  // Pridajte, ak rating existuje
    //     const matchesLocation = !filters.location || event.location === filters.location;
      
    //     return matchesSearch && matchesDate && matchesTime && matchesLocation; // && matchesRating 
    //   });
      

    const filteredEvents = events.filter((event) => {
        // Overenie, či `event.recipe` existuje pred volaním `toLowerCase()`
        const matchesSearch = event.recipe?.title?.toLowerCase().includes(filters.search.toLowerCase()) || false;
        const matchesDate = !filters.date || event.date === filters.date;
        const matchesTime = !filters.time || isTimeInRange(event.time_range, filters.time);
        const matchesLocation = !filters.location || event.location === filters.location;
    
        return matchesSearch && matchesDate && matchesTime && matchesLocation;
    });
    

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8" style={{ paddingTop: '72px' }}>
                <h1 className="text-3xl font-bold text-center" style={{ color: '#3D9879' }}>Find an Event to Join</h1>
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
                        <div className="flex items-center gap-2">
                            <span>Minimum Rating:</span>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleFilterChange}
                                className="border border-gray-300 rounded-md p-3 focus:ring-green-500 focus:border-green-500"
                            >
                                <option value={0}>All</option>
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>
                    </div>
                </div>

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
                            className="flex-1 bg-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
                            style={{ color: '#3D9879' }}
                            >
                            More Info
                            </button>
                            <button
                            className="flex-1 font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
                            style={{ backgroundColor: '#3D9879', color: 'white' }}
                            >
                            Join
                            </button>
                        </div>
                        </div>
                    ))}
                </div>


            </main>
        </div>
    );
}