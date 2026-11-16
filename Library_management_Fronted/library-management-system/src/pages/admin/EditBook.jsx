
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthProvider';
import { baseUrl } from '../../services/BaseUrl';
import toast from 'react-hot-toast';

const EditBook = () => {

    const { id } = useParams();
    const { accessToken } = useContext(AuthContext);

    const [bookDetails, setBookDetails] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [totalCopies, setTotalCopies] = useState(0);
    const [availableCopies, setAvailableCopies] = useState(0);

    // Fetch book details
    useEffect(() => {
        if (!id) return;

        fetch(`${baseUrl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBookDetails(data))
            .catch(err => console.log(err));

    }, [id, accessToken]);

    // Set current book values
    useEffect(() => {
        if (bookDetails) {
            setTitle(bookDetails.title ?? '');
            setAuthor(bookDetails.author ?? '');
            setCategory(bookDetails.category ?? '');
            setDescription(bookDetails.description ?? '');
            setPrice(bookDetails.price ?? 0);
            setTotalCopies(bookDetails.total_copies ?? 0);
            setAvailableCopies(bookDetails.available_copies ?? 0);
        }
    }, [bookDetails]);

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBook = {
            title,
            author,
            category,
            description,
            price: Number(price),
            total_copies: Number(totalCopies),
            available_copies: Number(availableCopies)
        };

        console.log(updatedBook);

        // Update API integration will go here
    };

    if (!bookDetails) {
        return (
            <p className="p-6 text-gray-500">
                Loading book details...
            </p>
        );
    }

    const handleUpdate =async () => {
        const formData = {
            title,
            author,
            category,
            description,
            price,
            total_copies:totalCopies,
            available_copies:availableCopies
        }
        const res=await fetch(`${baseUrl}/admin/update_book/${id}`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })

        const data=await res.json()
        toast.success(data.message)
    }

    return (
        <div className="max-w-2xl mx-auto p-6">

            <h2 className="text-2xl font-bold mb-6">
                Edit Book
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow border space-y-4"
            >

                {/* Title */}
                <div>
                    <label className="block mb-2 font-medium">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg p-3"
                        required
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block mb-2 font-medium">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border rounded-lg p-3"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-2 font-medium">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg p-3"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Price */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    {/* Total Copies */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Total Copies
                        </label>
                        <input
                            type="number"
                            name="total_copies"
                            min="0"
                            step="1"
                            value={totalCopies}
                            onChange={(e) => setTotalCopies(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                    {/* Available Copies */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Available Copies
                        </label>
                        <input
                            type="number"
                            name="available_copies"
                            min="0"
                            step="1"
                            value={availableCopies}
                            onChange={(e) => setAvailableCopies(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <button onClick={handleUpdate}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    Update Book
                </button>

            </form>
        </div>
    );
};

export default EditBook;
