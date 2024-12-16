import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

//These methods will create the event and push it to database
export default function CreateEvent() {
    const [isLoggedIn] = useSelector((state) => [state.global.isLoggedIn], shallowEqual);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        date: '',
        maxAttendees: '',
        timeRange: { start: '', end: '' },
        estimatedPrice: ''
    });
    const [isEventCreated, setIsEventCreated] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

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
            setRecipes(data);  // Aktualizácia stavu receptov
          } catch (error) {
            console.error("Error fetching recipes:", error);
          }
        };
      
        fetchRecipes();
      }, []);

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
      
        const startTime = new Date(`1970-01-01T${eventDetails.timeRange.start}:00`);
        const endTime = new Date(`1970-01-01T${eventDetails.timeRange.end}:00`);
        const durationMs = endTime - startTime;
      
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const duration = `${hours}:${minutes}:00`;
      
        const eventData = {
          date: eventDetails.date,
          max_attendees: parseInt(eventDetails.maxAttendees, 10),
          registered_attendees: 0,
          time_range: duration,
          price: parseFloat(eventDetails.estimatedPrice),
          recipe: selectedRecipe,
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
            console.error("Error data:", errorData);
            return;
          }
      
          const result = await response.json();
          console.log("Event created successfully:", result);
      
          setIsEventCreated(true);
        } catch (error) {
          console.error("Error creating event:", error);
          setFormError("Failed to create the event!");
        }
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
                        {recipes.map((recipe) => (
                            <div
                            key={recipe.id}
                            className={`bg-white shadow-md rounded-lg p-4 border transition ${
                                selectedRecipe === recipe.id ? 'border-[#F4B18C] border-4' : 'hover:border-green-600'
                            }`}
                            onClick={() => handleSelectRecipe(recipe.id)}
                            >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="rounded-lg mb-4 object-cover h-32 w-full"
                            />
                            <h3 className="text-lg font-semibold text-green-700">{recipe.title}</h3>
                            <p className="text-gray-600 text-sm">{recipe.description}</p>
                            </div>
                        ))}
                        </div>
                    </section>

                    {/* Right Section */}
                    <section className="w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col" style={{ height: '100%' }}>
                        <div className="flex-1 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-6 text-green-600">Event Details</h2>
                            {formError && <p className="text-red-500 mb-4">{formError}</p>}
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
                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={handleCreateEvent}
                                className="w-full bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600"
                            >
                                Create Event
                            </button>
                        ) : (
                            <p className="text-red-600 font-bold text-center mt-4 border-2 border-red-500 p-4 rounded-lg">
                                You need to log in to create an event!
                            </p>
                        )}
                    </section>
                </main>
            )}
        </div>
    );
}
