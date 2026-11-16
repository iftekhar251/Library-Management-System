import React from 'react';
import { Link } from 'react-router';

const BookCard = ({ book }) => {
    return (
        <div className="card bg-base-100  shadow-md hover:shadow-xl transition-shadow duration-300">

            <div className="h-52 bg-primary/10 flex items-center justify-center">
                <div className="w-24 h-32 bg-primary rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary-content">
                        {book.title?.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="card-body">

                <div className="badge badge-soft badge-primary">
                    {book.category}
                </div>

                <h2 className="card-title">
                    {book.title}
                </h2>

                <p className="text-sm opacity-60">
                    by {book.author}
                </p>

           

                <div className="flex justify-between items-center mt-3">
                    <div>
                        <p className="font-bold text-lg">
                            ৳{book.price}
                        </p>

                       
                    </div>

                    <Link to={`/books/${book.id}`}>
                    <button  className="btn btn-primary btn-sm">
                        View Details
                    </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default BookCard;