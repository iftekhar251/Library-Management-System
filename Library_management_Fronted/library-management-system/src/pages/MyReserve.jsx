import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const MyReserve = () => {
    const [myReserve, setMyReserve] = useState([]);
    const [loading, setLoading] = useState(true);

    const { accessToken } = useContext(AuthContext);

    const fetchReservation = () => {
        fetch(`${baseUrl}/reserve/my`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                return res.json();
            })
            .then(data => {
                const list = Array.isArray(data)
                    ? data
                    : data.reserves || data.data || [];
                // cancelled gulo list theke baad
                setMyReserve(list.filter(r => r.status !== "cancelled"));
            })
            .catch(err => {
                console.log(err);
                setMyReserve([]);
            })
            .finally(() => setLoading(false));
    };

    const cancleReserve = async (id) => {
        try {
            const res = await fetch(`${baseUrl}/reserve/cancle/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            toast.success(data.message)
            fetchReservation();
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        if (!accessToken) return;

        setLoading(true);
        fetchReservation();
    }, [accessToken]);

    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        completed: "bg-blue-100 text-blue-700",
        cancelled: "bg-red-100 text-red-700",
    };

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-gray-500">Loading reservations...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Reservations
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View and manage your reserved books.
                    </p>
                </div>

                {/* No Reservation */}
                {myReserve.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            No reservations found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            You haven't reserved any books yet.
                        </p>
                    </div>
                ) : (
                    /* Reservation Cards */
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {myReserve.map((reserve) => (
                            <div
                                key={reserve.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Top */}
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                            Reservation
                                        </p>

                                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                                            #{reserve.id}
                                        </h2>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            statusStyle[reserve.status] ||
                                            "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {reserve.status}
                                    </span>
                                </div>

                                {/* Information */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                        <span className="text-sm text-gray-500">
                                            Book ID
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            #{reserve.book_id}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                        <span className="text-sm text-gray-500">
                                            User ID
                                        </span>

                                        <span className="text-sm font-semibold text-gray-900">
                                            #{reserve.user_id}
                                        </span>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 px-4 py-3">
                                        <p className="mb-1 text-xs font-medium text-gray-500">
                                            Reservation Date
                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">
                                            {new Date(
                                                reserve.reservation_date
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {new Date(
                                                reserve.reservation_date
                                            ).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Cancel Button (completed hole dekhabe na) */}
                                {reserve.status !== "completed" && (
                                    <button
                                        onClick={() => cancleReserve(reserve.id)}
                                        className="btn btn-error mt-5 text-amber-50"
                                    >
                                        Cancle
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReserve;