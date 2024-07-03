import React, { useEffect, useState } from 'react';
import { userList } from "../Services/userListService";
import { User } from '../interfaces/User';

export const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await userList();
                setUsers(response.data.Users);
                // console.log(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        loadData();
    }, []);

    if (!users || users.length === 0) return <p>No users found.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">User List</h1>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.email}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.firstname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastname}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}