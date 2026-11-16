
import React, { useContext, useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {accessToken}=useContext(AuthContext)

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(accessToken);

        const passwordData = {
            current_password: currentPassword,
            new_password: newPassword
        };

        const res=await fetch(`${baseUrl}/passwordchange`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":'application/json'
            },
            body:JSON.stringify(passwordData)
        })
        const data=await res.json()
        toast.success(data.message)
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2">
                Change Password
            </h2>

            <p className="text-gray-500 mb-6">
                Update your account password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block mb-2 font-medium">
                        Current Password
                    </label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Update Password
                </button>

            </form>
        </div>
    );
};

export default ChangePassword;
