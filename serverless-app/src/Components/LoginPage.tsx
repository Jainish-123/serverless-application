import React, { useState } from 'react';
import { login } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginfun = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login successful");
            navigate("/userlist");
        } catch (error) {
            toast.error("Login unsuccessful, Invalid Username/Password");
            console.error("Login failed", error);
        }
    }

    return (
        <form onSubmit={loginfun} className="max-w-md mx-auto mt-12 bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
            </button>
        </form>
    )
}