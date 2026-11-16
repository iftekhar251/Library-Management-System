
import React, { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../services/BaseUrl';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router';

const ManageBook = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { accessToken } = useContext(AuthContext)
    const [books, setBooks] = useState([])

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        price: 0,
        total_copies: 1
    });

    const fetchBooks=()=>{
          fetch(`${baseUrl}/books/all`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }
    useEffect(() => {
      fetchBooks()
    }, [])

    const deleteBooks=async(id)=>{
        const res=await fetch(`${baseUrl}/admin/delete_book/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        const data=await res.json
        toast.success(data.message)
        fetchBooks()
    }


    console.log(books);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        const res = await fetch(`${baseUrl}/admin/create_book`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
        const data = await res.json();
        toast.success(data.message)
        setIsOpen(false);
    };

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Books</h2>

                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium"
                >
                    + Add Book
                </button>
            </div>


            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                <table className="w-full text-left border-collapse">

                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-4 bg-gray-100">ID</th>
                            <th className="px-6 py-4 bg-gray-100">Title</th>
                            <th className="px-6 py-4 bg-gray-100">Author</th>
                            <th className="px-6 py-4 bg-gray-100">Category</th>
                            <th className="px-6 py-4 bg-gray-100">Price</th>
                            <th className="px-6 py-4 bg-gray-100">Available Copies</th>
                            <th className="px-6 py-4 bg-gray-100">Total Copies</th>
                            <th className="px-6 py-4 bg-gray-100">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr
                                    key={book.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4">{book.id}</td>

                                    <td className="px-6 py-4 font-medium">
                                        {book.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        {book.author}
                                    </td>

                                    <td className="px-6 py-4">
                                        {book.category}
                                    </td>

                                    <td className="px-6 py-4">
                                        ৳{book.price}
                                    </td>

                                    <td className="px-6 py-4">
                                        {book.available_copies}
                                    </td>

                                    <td className="px-6 py-4">
                                        {book.total_copies}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">

                                            <Link to={`/admin/edit/book/${book.id}`}
                                                className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                                            >
                                                Edit
                                            </Link>

                                            <button onClick={()=>deleteBooks(book.id)}
                                                className="text-white bg-red-600 border border-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                            : (
                                <tr>
                                    <td colSpan="8" className="text-center py-8 text-gray-500">
                                        No books found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

                    <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Add New Book</h3>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-red-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <label className="block mb-1 font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={bookData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={bookData.author}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={bookData.category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={bookData.description}
                                    onChange={handleChange}
                                    placeholder="Enter book description"
                                    rows="3"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={bookData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Total Copies</label>
                                    <input
                                        type="number"
                                        name="total_copies"
                                        value={bookData.total_copies}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2.5 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    Add Book
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageBook;
