import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector, shallowEqual } from 'react-redux';

function RecipeModal({ recipes, onRecipeSelect, searchQuery, setSearchQuery, onClose }) {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const navigate = useNavigate();

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = recipes.filter(
            (recipe) =>
                recipe.title.toLowerCase().includes(lowerCaseQuery) ||
                recipe.description.toLowerCase().includes(lowerCaseQuery) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.name.toLowerCase().includes(lowerCaseQuery)
                )
        );
        setFilteredRecipes(filtered);
    }, [searchQuery, recipes]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-3/4 max-w-4xl p-6 rounded-lg shadow-lg relative" style={{ marginTop: '110px', zIndex: 60 }}>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold text-green-700 mb-6">Select a Recipe</h2>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <input
                            type="text"
                            placeholder="Search by title, description, or ingredients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow border rounded-lg p-3 focus:ring-green-500 focus:border-green-500 sm:mr-4"
                        />
                        <button
                            className="bg-green-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
                            onClick={() => {
                                onClose();
                                navigate('/create-recipe');
                            }}
                        >
                            + New Recipe
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[500px]">
                    {filteredRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                            onClick={() => {
                                onRecipeSelect(recipe);
                                onClose();
                            }}
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="rounded-lg mb-4 object-cover h-40 w-full"
                            />
                            <h3 className="text-lg font-semibold text-green-700 truncate">{recipe.title}</h3>
                            <p className="text-gray-600 text-sm truncate">{recipe.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CreateEvent() {
    const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [eventDetails, setEventDetails] = useState({
        date: '',
        maxAttendees: '',
        timeRange: { start: '', end: '' },
        estimatedPrice: ''
    });
    const [isEventCreated, setIsEventCreated] = useState(false);
    const [formError, setFormError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isEventCreated) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isEventCreated, navigate]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/recipes/");
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

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

    const validateForm = () => {
        if (!selectedRecipe) {
            setFormError("Please select a recipe.");
            return false;
        }

        if (!eventDetails.date || !eventDetails.maxAttendees || !eventDetails.timeRange.start || !eventDetails.timeRange.end || !eventDetails.estimatedPrice) {
            setFormError("All fields are required.");
            return false;
        }

        setFormError(null);
        return true;
    };

    const handleCreateEvent = async () => {
        if (!validateForm()) {
            return;
        }

        // Prepočítanie timeRange na sekundový formát
        const startTime = new Date(`1970-01-01T${eventDetails.timeRange.start}:00`);
        const endTime = new Date(`1970-01-01T${eventDetails.timeRange.end}:00`);
        const durationInSeconds = (endTime - startTime) / 1000;

        // Posielame čas ako trvanie v sekundách
        const eventData = {
            date: eventDetails.date,
            max_attendees: parseInt(eventDetails.maxAttendees, 10),
            time_range: durationInSeconds, // Prepočítaný časový rozsah
            price: parseFloat(eventDetails.estimatedPrice),
            recipe: selectedRecipe.id,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/create-event/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setFormError(`Error: ${errorData.details || "Something went wrong!"}`);
                return;
            }

            setIsEventCreated(true);
        } catch (error) {
            console.error("Error creating event:", error);
            setFormError("Failed to create the event!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold text-green-800">Create Your Event</h1>
            </div>
            {isEventCreated ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="text-center">
                        <div className="text-green-500 text-6xl mb-4">✔</div>
                        <h1 className="text-2xl font-bold">Event created successfully!</h1>
                        <p className="text-gray-600 mt-2">You will be redirected to the main menu.</p>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
                    <section className="p-6 bg-gradient-to-r from-green-200 via-green-100 to-green-200 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-green-800 mb-4">Welcome to Event Creator</h1>
                        <p className="text-gray-700 text-lg mb-4">Follow these steps to create your event:</p>
                        <ul className="list-disc list-inside text-gray-800">
                            <li className="mb-2">1. Click "Select Recipe" to choose or create a recipe for your event.</li>
                            <li className="mb-2">2. Fill out the event details such as date, time, attendees, and price.</li>
                            <li className="mb-2">3. Review your information and click "Create Event" to finalize.</li>
                        </ul>
                    </section>

                    <section className="flex flex-col items-center bg-white py-6 rounded-lg shadow-md">
                        <button
                            className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 mb-4"
                            onClick={() => setShowModal(true)}
                        >
                            Select Recipe
                        </button>
                        {selectedRecipe && (
                            <p className="text-gray-700 text-lg">Selected Recipe: {selectedRecipe.title}</p>
                        )}
                    </section>

                    <section className="bg-gradient-to-r from-white to-green-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Event Details</h2>
                        {formError && <p className="text-red-500 mb-4">{formError}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-4 rounded-lg shadow-md">
                                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">📅 Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={eventDetails.date}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg shadow-md">
                                <label htmlFor="maxAttendees" className="block text-gray-700 font-medium mb-2">👥 Max Attendees</label>
                                <input
                                    type="number"
                                    id="maxAttendees"
                                    value={eventDetails.maxAttendees}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg shadow-md col-span-2">
                                <label className="block text-gray-700 font-medium mb-2">⏰ Time Range</label>
                                <div className="flex space-x-4">
                                    <input
                                        type="time"
                                        id="start-time"
                                        value={eventDetails.timeRange.start}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                                    />
                                    <span className="self-center text-gray-500">to</span>
                                    <input
                                        type="time"
                                        id="end-time"
                                        value={eventDetails.timeRange.end}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg shadow-md col-span-2">
                                <label htmlFor="estimatedPrice" className="block text-gray-700 font-medium mb-2">💵 Estimated Price (€)</label>
                                <input
                                    type="number"
                                    id="estimatedPrice"
                                    value={eventDetails.estimatedPrice}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-lg p-3 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={handleCreateEvent}
                                className="w-full mt-6 bg-green-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600"
                            >
                                Create Event
                            </button>
                        ) : (
                            <p className="text-red-600 font-bold text-center mt-4 border-2 border-red-500 p-4 rounded-lg">
                                You need to log in to create an event!
                            </p>
                        )}
                        <button
                            onClick={() => navigate('/')}
                            className="w-full mt-4 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-500"
                        >
                            Back to Homepage
                        </button>
                    </section>

                    {showModal && (
                        <RecipeModal
                            recipes={recipes}
                            onRecipeSelect={setSelectedRecipe}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </main>
            )}
        </div>
    );
}
