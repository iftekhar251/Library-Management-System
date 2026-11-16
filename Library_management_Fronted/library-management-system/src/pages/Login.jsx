import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { baseUrl } from '../services/BaseUrl';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { authUser, setAuthUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const formData = new URLSearchParams
            formData.append('username', username);
            formData.append('password', password);
            const res = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            const data = await res.json()
            console.log(data)
            const accessToken = data?.access_token

            localStorage.setItem("lm_token", accessToken)

            const useRes = await fetch(`${baseUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const userData = await useRes.json()


            if (userData.id) {
                toast.success("Log in Successfully")
                setAuthUser(userData)
                navigate('/')
            }
            else {
                toast.error("Username or password is incorrect")

            }

        } catch (error) {
            console.log(error);
        }

    }

    console.log(authUser)


    return (

        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-4 text-base-content/60 max-w-sm mx-auto">
                        Log in to explore books, manage reservations,
                        and keep track of your library activity.
                    </p>
                </div>

                {/* Login Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-8">

                        <h2 className="text-2xl font-semibold text-center mb-2">
                            Login to Your Account
                        </h2>

                        <p className="text-sm text-base-content/50 text-center mb-5">
                            Enter your details to continue
                        </p>

                        <fieldset className="fieldset">

                            {/* Email */}
                            <label className="label font-medium">
                                Username
                            </label>

                            <input value={username} onChange={(e) => setUsername(e.target.value)}
                                type="username"
                                className="input input-bordered w-full"
                                placeholder="Enter your username"
                            />


                            <label className="label font-medium mt-2">
                                Password
                            </label>

                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Enter your password"
                            />

                            <div className="text-right mt-2">
                                <Link
                                    to="/signup"
                                    className="link link-primary text-sm no-underline"
                                >
                                    Don't have an account?
                                </Link>
                            </div>

                            {/* Login */}
                            <button onClick={handleLogin} className="btn btn-primary w-full mt-5">
                                Login
                            </button>

                        </fieldset>

                        <div className="divider text-xs text-base-content/40">
                            LIBRARY MANAGEMENT SYSTEM
                        </div>

                        <p className="text-center text-sm text-base-content/60">
                            New to our library?{' '}
                            <Link
                                to="/signup"
                                className="link link-primary font-medium"
                            >
                                Create an account
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
