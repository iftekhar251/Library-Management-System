
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { baseUrl } from '../services/BaseUrl';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { authUser,accessToken  } = useContext(AuthContext);

    // Input States
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // Load User Data
    useEffect(() => {
        if (authUser) {
            setFirstname(authUser.firstname || '');
            setLastname(authUser.lastname || '');
            setUsername(authUser.username || '');
            setEmail(authUser.email || '');
        }
    }, [authUser]);

    

 const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = {
        firstname,
        lastname,
        username,
        email
    };

    try {
        const res = await fetch(`${baseUrl}/edituser`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        console.log("Response:", data);

        if (!res.ok) {
            console.log("Error Details:", data.detail);
            toast(data.detail?.[0]?.msg || data.detail || "Update failed");
            return;
        }

        toast(data.message);

    } catch (error) {
        console.error(error);
        toast("Something went wrong!");
    }
};

    // Handle Cancel
    const handleCancel = () => {
        setFirstname(authUser?.firstname || '');
        setLastname(authUser?.lastname || '');
        setUsername(authUser?.username || '');
        setEmail(authUser?.email || '');
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

    const labelClass =
        "block mb-2 text-sm font-medium text-gray-600";

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8">

                    <div className="flex items-center gap-5">

                        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold text-white">
                            {firstname.charAt(0).toUpperCase()}
                            {lastname.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {firstname} {lastname}
                            </h1>

                            <p className="text-blue-100 text-sm mt-1">
                                @{username}
                            </p>

                            <div className="flex items-center gap-2 mt-3">
                                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full capitalize">
                                    {authUser?.role || 'User'}
                                </span>

                                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                                    {authUser?.status || 'Active'}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Profile Form */}
                <form
                    onSubmit={handleUpdateUser}
                    className="p-6 sm:p-9"
                >

                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Personal Information
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Update the information associated with your account.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-7">

                            {/* First Name */}
                            <div>
                                <label className={labelClass}>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter your first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className={labelClass}>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter your last name"
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label className={labelClass}>
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter your username"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass}>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="Enter your email"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-9"></div>

                    {/* Account Information */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Account Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

                            {/* User ID */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <p className="text-sm text-gray-500">
                                    User ID
                                </p>

                                <p className="font-semibold text-gray-900 mt-2">
                                    #{authUser?._id || authUser?.id || 'N/A'}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <p className="text-sm text-gray-500">
                                    Account Role
                                </p>

                                <p className="font-semibold text-gray-900 mt-2 capitalize">
                                    {authUser?.role || 'User'}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <p className="text-sm text-gray-500">
                                    Account Status
                                </p>

                                <p className="font-semibold text-green-600 mt-2">
                                    {authUser?.status || 'Active'}
                                </p>
                            </div>

                            {/* Registered Email */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <p className="text-sm text-gray-500">
                                    Registered Email
                                </p>

                                <p className="font-semibold text-gray-900 mt-2 break-all">
                                    {authUser?.email || 'N/A'}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-9 pt-6 border-t border-gray-200">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default UserProfile;
