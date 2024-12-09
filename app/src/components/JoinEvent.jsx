import React, { useState } from 'react';
import Navbar from './Navbar';

// Mock database, we will then do this with real one
const mockDatabase = {
    events: [
        {
            id: 1,
            title: "Fluffy pancakes",
            organizer: "MonikaCooks",
            attendees: "1",
            maxpeople:"4",
            cookingTime: "45 min",
            date: "20.10.2024",
            time: "18:00-20:00",
            location: "Manželské internáty",
            rating: 5,
            reviews: 3,
            image: "/src/assets/pancakes.png",
        },
        {
            id: 2,
            title: "Vegetable ragu",
            organizer: "dominique321",
            attendees: "2",
            maxpeople:"3",
            cookingTime: "1h 45min",
            date: "20.10.2024",
            time: "19:00-22:00",
            location: "Štúrak",
            rating: 4,
            reviews: 1,
            image: "/src/assets/ragu.jpg",
        },
        {
            id: 3,
            title: "Spinach rice bowl",
            organizer: "martyn",
            attendees: "1",
            maxpeople:"2",
            cookingTime: "55 min",
            date: "20.10.2024",
            time: "20:00-23:59",
            location: "Átriáky",
            rating: 4.5,
            reviews: 6,
            image: "/src/assets/ricebowl.jpg",
        },
    ],
};

export default function JoinEventPage() {
    const [filters, setFilters] = useState({
        search: '',
        date: '',
        time: '',
        rating: 0,
        location: '',
    });

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

    const filteredEvents = mockDatabase.events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesDate = !filters.date || event.date === filters.date;
        const matchesTime = !filters.time || isTimeInRange(event.time, filters.time);
        const matchesRating = event.rating >= filters.rating;
        const matchesLocation = !filters.location || event.location === filters.location;
        return matchesSearch && matchesDate && matchesTime && matchesRating && matchesLocation;
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
                                src={event.image}
                                alt={event.title}
                                className="rounded-lg object-cover h-40 w-full mb-4"
                            />
                            <h2 className="text-lg font-semibold" style={{ color: '#3D9879' }}>{event.title}</h2>
                            <p className="text-sm text-gray-500">{event.organizer}</p>
                            <p className="text-sm text-gray-500">
                                Cooking Time: {event.cookingTime}
                            </p>
                            <p className="text-sm text-gray-500">
                                {event.date} | {event.time}
                            </p>
                            <p className="text-sm text-gray-500">{event.location}</p>
                            <p className="text-sm text-gray-500">{event.attendees}/{event.maxpeople} attendees</p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-yellow-500">
                                    {Array.from({ length: Math.floor(event.rating) }, (_, i) => (
                                        <span key={i}>&#9733;</span>
                                    ))}
                                    {event.rating % 1 ? <span>&#9733;</span> : ''}
                                    ({event.reviews} reviews)
                                </span>
                                <button className="text-sm font-semibold underline" style={{ color: '#3D9879' }}>
                                    See Reviews
                                </button>
                            </div>
                            <div className="flex mt-4 gap-4">
                                <button className="flex-1 bg-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300" style={{ color: '#3D9879' }}>
                                    More info
                                </button>
                                <button className="flex-1 font-semibold py-2 px-4 rounded-lg hover:bg-green-600" style={{ backgroundColor: '#3D9879', color: 'white' }}>
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