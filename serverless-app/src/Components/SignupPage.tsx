import React, { useState } from "react";
import { signup } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const signiupfun = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(email, password, firstname, lastname);
      if (response) {
        toast.success("Registration successfull");
      }
      toast.success("Registration successfull");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
      console.error("Registration failed", error);
    }
  };

  return (
    <form onSubmit={signiupfun} className="max-w-md mx-auto mt-12 bg-gray-100 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Register</h2>
      <div className="mb-4">
        <label htmlFor="firstname" className="block text-gray-600 text-sm font-medium mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-600 text-sm font-medium mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
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
        Register
      </button>
    </form>


  );
};
