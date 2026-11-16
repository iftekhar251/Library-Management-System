import React, { useState } from 'react';
import { baseUrl } from '../services/BaseUrl';
import { Link } from 'react-router';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSignup = async() => {

        const userData = {
            email,
            username,
            firstname,
            lastname,
            password,
            role
        };

        const res=await fetch(`${baseUrl}/createuser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData )
        })
        const data=await res.json();
        console.log(data)
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">
                        Sign Up Now!
                    </h1>

                    <p className="py-6">
                        Sign up to explore books, manage reservations,
                        and keep track of your library activity.
                    </p>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">

                        <fieldset className="fieldset">

                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input w-full"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="label">Username</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label className="label">First Name</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />

                            <label className="label">Last Name</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Last Name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />

                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input w-full"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label className="label">Role</label>
                            <select
                                className="select w-full"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Role
                                </option>

                                <option value="student">
                                    Member
                                </option>

                                <option value="librarian">
                                    Librarian
                                </option>
                            </select>
                            <Link to={'/login'} className="link link-primary font-medium">Already Have An Account?</Link>

                            <button
                                onClick={handleSignup}
                                className="btn btn-neutral mt-4"
                            >
                                Sign Up
                            </button>

                        </fieldset>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;