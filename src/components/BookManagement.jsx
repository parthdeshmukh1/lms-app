import React, { useState } from 'react';

export default function BookManagement({ books, setBooks }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        year: '',
        copies: ''
    });

    const handleAddBook = () => {
        if (newBook.title && newBook.author) {
            const book = {
                id: books.length + 1,
                ...newBook,
                copies: parseInt(newBook.copies) || 1,
                year: parseInt(newBook.year) || new Date().getFullYear()
            };
            setBooks([...books, book]);
            setShowAddModal(false);
            setNewBook({
                title: '',
                author: '',
                genre: '',
                isbn: '',
                year: '',
                copies: ''
            });
        }
    };

    const handleDeleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Book Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="fas fa-plus mr-2"></i> Add Book
                </button>
            </div>

            {/* Books Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="border-gray-200 bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Author</th>
                                <th className="py-3 px-4 text-left">Genre</th>
                                <th className="py-3 px-4 text-left">ISBN</th>
                                <th className="py-3 px-4 text-left">Year</th>
                                <th className="py-3 px-4 text-left">Copies</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{book.title}</td>
                                    <td className="py-3 px-4">{book.author}</td>
                                    <td className="py-3 px-4">{book.genre}</td>
                                    <td className="py-3 px-4">{book.isbn}</td>
                                    <td className="py-3 px-4">{book.year}</td>
                                    <td className="py-3 px-4">{book.copies}</td>
                                    <td className="py-3 px-4">
                                        <button className="text-blue-500 hover:text-blue-700 mr-3">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteBook(book.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Book</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowAddModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title *</label>
                                <input
                                    type="text"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newBook.title}
                                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Author *</label>
                                <input
                                    type="text"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newBook.author}
                                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Genre</label>
                                    <input
                                        type="text"
                                        className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        value={newBook.genre}
                                        onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">ISBN</label>
                                    <input
                                        type="text"
                                        className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        value={newBook.isbn}
                                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Year Published</label>
                                    <input
                                        type="number"
                                        className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        value={newBook.year}
                                        onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Copies Available</label>
                                    <input
                                        type="number"
                                        className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        value={newBook.copies}
                                        onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    className="btn bg-gray-200 hover:bg-gray-300"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddBook}
                                >
                                    Add Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
