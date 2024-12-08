import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

//I used mock database so it will be easier to integrate it with backend later on
const mockDatabase = {
    recipes: [
        {
            id: 1,
            name: "Fluffy Pancakes",
            image: "/src/assets/pancakes.png",
            description: "Cooked 3x • Avg Time: 45 min",
        },
        {
            id: 2,
            name: "Cheesy Pasta",
            image: "/src/assets/pasta.jpg",
            description: "Cooked 2x • Avg Time: 1h 45min",
        },
        {
            id: 3,
            name: "Chicken Salad",
            image: "/src/assets/chickensalad.jpg",
            description: "Cooked 1x • Avg Time: 25 min",
        },
        {
            id: 4,
            name: "Tomato Soup",
            image: "/src/assets/tomatessoup.jpg",
            description: "Cooked 4x • Avg Time: 30 min",
        },
        {
            id: 5,
            name: "Fried Chicken",
            image: "/src/assets/friedchicken.jpg",
            description: "Cooked 2x • Avg Time: 50 min",
        },
        {
            id: 6,
            name: "Fish bites",
            image: "/src/assets/fishbites.jpg",
            description: "Cooked 5x • Avg Time: 15 min",
        },
    ],
};

//These methods will create the event and push it to database
export default function CreateEvent() {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        date: '',
        maxAttendees: '',
        timeRange: { start: '', end: '' },
        estimatedPrice: ''
    });
    const [isEventCreated, setIsEventCreated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEventCreated) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isEventCreated, navigate]);

    const handleSelectRecipe = (id) => {
        setSelectedRecipe(id);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'start-time' || id === 'end-time') {
            setEventDetails((prevDetails) => ({
                ...prevDetails,
                timeRange: {
                    ...prevDetails.timeRange,
                    [id === 'start-time' ? 'start' : 'end']: value,
                },
            }));
        } else {
            setEventDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
        }
    };

    const handleCreateEvent = () => {
        const eventData = {
            recipeId: selectedRecipe,
            ...eventDetails,
        };

        // For local storage or state update
        console.log('Event Data (local):', eventData);

        // Uncomment the code below when integrating with the backend
        // fetch('https://your-backend-api/events', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(eventData),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log('Event successfully saved to database:', data);
        // })
        // .catch((error) => {
        //     console.error('Error saving event:', error);
        // });

        setIsEventCreated(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {isEventCreated ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✔</div>
                        <h1 className="text-2xl font-bold">Event created successfully!</h1>
                        <p className="text-gray-600 mt-2">You will be notified once somebody wants to join it.</p>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-6 flex space-x-10" style={{ marginTop: '72px', height: 'calc(100vh - 124px)' }}>
                    {/* Left Section */}
                    <section className="w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col" style={{ height: '100%' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-green-600">Choose from My Recipes</h2>
                            <Link to="/create-recipe">
                                <button className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">
                                    + New Recipe
                                </button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-6 overflow-y-auto flex-1">
                            {mockDatabase.recipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className={`bg-white shadow-md rounded-lg p-4 border transition ${
                                        selectedRecipe === recipe.id ? 'border-[#F4B18C] border-4' : 'hover:border-green-600'
                                    }`}
                                    onClick={() => handleSelectRecipe(recipe.id)}
                                >
                                    <img src={recipe.image} alt={recipe.name} className="rounded-lg mb-4 object-cover h-32 w-full" />
                                    <h3 className="text-lg font-semibold text-green-700">{recipe.name}</h3>
                                    <p className="text-gray-600 text-sm">{recipe.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Right Section */}
                    <section className="w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col" style={{ height: '100%' }}>
                        <div className="flex-1 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-6 text-green-600">Event Details</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={eventDetails.date}
                                        onChange={handleInputChange}
                                        className="w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-3"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="max-attendees" className="block font-medium text-gray-700">Max Attendees</label>
                                    <input
                                        type="number"
                                        id="maxAttendees"
                                        value={eventDetails.maxAttendees}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 10"
                                        className="w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-3"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="time-range" className="block font-medium text-gray-700">Time Range</label>
                                    <div className="flex space-x-4">
                                        <input
                                            type="time"
                                            id="start-time"
                                            value={eventDetails.timeRange.start}
                                            onChange={handleInputChange}
                                            className="w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-3"
                                        />
                                        <span className="self-center">-</span>
                                        <input
                                            type="time"
                                            id="end-time"
                                            value={eventDetails.timeRange.end}
                                            onChange={handleInputChange}
                                            className="w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-3"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="estimated-price" className="block font-medium text-gray-700">Estimated Price (€)</label>
                                    <input
                                        type="number"
                                        id="estimatedPrice"
                                        value={eventDetails.estimatedPrice}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 15.00"
                                        className="w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-3"
                                    />
                                </div>
                            </form>
                        </div>
                        <button
                            type="button"
                            onClick={handleCreateEvent}
                            className="w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
                        >
                            Create Event
                        </button>
                    </section>
                </main>
            )}
        </div>
    );
}
