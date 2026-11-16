import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { baseUrl } from '../services/BaseUrl';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const BookDetails = () => {

    const { id } = useParams()
    const [bookDetails, setBookDetails] = useState(null)
    const { accessToken } = useContext(AuthContext)

    const handleReserve=async()=>{
        const res = await  fetch(`${baseUrl}/reserve/${id}`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        const data=await res.json();
        if(data){
            toast.success(data.message)
        }
    }

  
    useEffect(() => {
        if (!id) return;
        fetch(`${baseUrl}/books/${id}`,{
            headers:{
                Authorization :`Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBookDetails(data))
            .catch(err => console.log(err))
    }, [id])

    if (!bookDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-base-200 py-10 px-4">

        <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-md overflow-hidden">

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8 p-8">

                {/* Left Side */}
                <div className="bg-base-200 rounded-xl min-h-[420px] flex items-center justify-center">

                    {bookDetails.cover_image ? (
                        <img
                            src={bookDetails.cover_image}
                            alt={bookDetails.title}
                            className="max-h-[350px] rounded-lg shadow-md"
                        />
                    ) : (
                        <div className="w-56 h-72 bg-base-300 rounded-lg shadow flex items-center justify-center">
                            <h2 className="font-bold text-lg opacity-60 text-center px-4">
                                {bookDetails.title}
                            </h2>
                        </div>
                    )}

                </div>


                {/* Right Side */}
                <div className="flex flex-col justify-center">

                    {/* Category */}
                    <div>
                        <span className="badge badge-soft badge-primary text-xs">
                            {bookDetails.category}
                        </span>
                    </div>


                    {/* Title */}
                    <h1 className="text-3xl font-bold mt-3">
                        {bookDetails.title}
                    </h1>


                    {/* Author */}
                    <p className="text-sm mt-2">
                        By{" "}
                        <span className="font-semibold">
                            {bookDetails.author}
                        </span>
                    </p>


                    {/* Description */}
                    <p className="text-sm opacity-60 mt-6 leading-6">
                        {bookDetails.description}
                    </p>


                    {/* Price + Available */}
                    <div className="grid grid-cols-2 gap-4 mt-6">

                        <div className="border border-base-300 rounded-xl p-4">
                            <p className="text-xs opacity-60">
                                Price
                            </p>

                            <p className="text-xl font-bold mt-1">
                                ৳{bookDetails.price}
                            </p>
                        </div>


                        <div className="border border-base-300 rounded-xl p-4">
                            <p className="text-xs opacity-60">
                                Available Copies
                            </p>

                            <p className="text-xl font-bold text-success mt-1">
                                {bookDetails.available_copies}
                            </p>
                        </div>

                    </div>


                    {/* Total Copies */}
                    <div className="bg-base-200 rounded-lg px-4 py-3 flex justify-between items-center mt-4">

                        <span className="text-sm opacity-70">
                            Total Copies
                        </span>

                        <span className="font-bold">
                            {bookDetails.total_copies}
                        </span>

                    </div>


                    {/* Reserve Button */}
                    <button
                        onClick={handleReserve}
                        disabled={bookDetails.available_copies === 0}
                        className="btn btn-primary w-full mt-5"
                    >
                        {bookDetails.available_copies === 0
                            ? "Not Available"
                            : "Reserve"}
                    </button>

                </div>

            </div>


            {/* Bottom Info */}
            <div className="border-t border-base-300 px-8 py-4">

                <div className="flex flex-wrap gap-8 text-xs">

                    <p>
                        Book ID:{" "}
                        <span className="font-semibold">
                            #{bookDetails.id}
                        </span>
                    </p>

                    <p>
                        Category:{" "}
                        <span className="font-semibold">
                            {bookDetails.category}
                        </span>
                    </p>

                    <p>
                        Status:{" "}
                        <span
                            className={
                                bookDetails.available_copies > 0
                                    ? "text-success font-semibold"
                                    : "text-error font-semibold"
                            }
                        >
                            {bookDetails.available_copies > 0
                                ? "Available"
                                : "Unavailable"}
                        </span>
                    </p>

                </div>

            </div>

        </div>

    </div>
);
};

export default BookDetails;