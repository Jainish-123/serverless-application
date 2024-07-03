import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent } from "../Services/eventService";

export const CreateEvent: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleEventCreation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createEvent(title, description, date, time, image);
            if (response) {
                toast.success("Event created successfully");
                navigate("/userlist");
            }
        } catch (error) {
            toast.error("Event creation failed");
            console.error("Event creation failed", error);
        }
    };

    return (
        <form onSubmit={handleEventCreation} className="max-w-md mx-auto mt-12 bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Create Event</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600 text-sm font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-600 text-sm font-medium mb-2">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="block text-gray-600 text-sm font-medium mb-2">
                    Time
                </label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-600 text-sm font-medium mb-2">
                    Image Upload
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Event
            </button>
        </form>
    );
};