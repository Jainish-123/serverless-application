import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-500 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/userlist" className="text-white px-3 py-2 rounded-md text-sm font-medium">User List</Link>
                <Link to="/imageupload" className="text-white px-3 py-2 rounded-md text-sm font-medium">Image Upload</Link>
                <Link to="/imagelist" className="text-white px-3 py-2 rounded-md text-sm font-medium">Image List</Link>
                <Link to="/create-event" className="text-white px-3 py-2 rounded-md text-sm font-medium">Create Event</Link>
                <Link to="/eventlist" className="text-white px-3 py-2 rounded-md text-sm font-medium">Event List</Link>
            </div>
        </nav>
    );
};

export default Navbar;
