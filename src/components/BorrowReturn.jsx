import React, { useState } from 'react';

export default function BorrowReturn({ books, members, transactions, setTransactions }) {
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [actionType, setActionType] = useState('borrow');

    const handleSubmit = () => {
        if (selectedBook && selectedMember && borrowDate) {
            const transaction = {
                id: transactions.length + 1,
                bookId: parseInt(selectedBook),
                memberId: parseInt(selectedMember),
                borrowDate: borrowDate,
                returnDate: returnDate || calculateReturnDate(borrowDate),
                status: actionType === 'borrow' ? 'Borrowed' : 'Returned'
            };

            setTransactions([...transactions, transaction]);

            // Reset form
            setSelectedBook('');
            setSelectedMember('');
            setBorrowDate('');
            setReturnDate('');
        }
    };

    const calculateReturnDate = (date) => {
        const borrowDate = new Date(date);
        borrowDate.setDate(borrowDate.getDate() + 30); // 30 days borrowing period
        return borrowDate.toISOString().split('T')[0];
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Book Borrowing & Returning</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Borrow/Return Form */}
                <div className="card lg:col-span-2">
                    <div className="p-5">
                        <h2 className="text-xl font-semibold mb-4">Transaction Form</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Action Type</label>
                                <div className="flex space-x-2">
                                    <button
                                        className={`flex-1 btn ${actionType === 'borrow' ? 'btn-primary' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        onClick={() => setActionType('borrow')}
                                    >
                                        Borrow
                                    </button>
                                    <button
                                        className={`flex-1 btn ${actionType === 'return' ? 'btn-secondary' : 'bg-gray-200 hover:bg-gray-300'}`}
                                        onClick={() => setActionType('return')}
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Borrow Date *</label>
                                <input
                                    type="date"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={borrowDate}
                                    onChange={(e) => {
                                        setBorrowDate(e.target.value);
                                        if (actionType === 'borrow') {
                                            setReturnDate(calculateReturnDate(e.target.value));
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Book *</label>
                                <select
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={selectedBook}
                                    onChange={(e) => setSelectedBook(e.target.value)}
                                >
                                    <option value="">Select a book</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.id}>
                                            {book.title} by {book.author}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Select Member *</label>
                                <select
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={selectedMember}
                                    onChange={(e) => setSelectedMember(e.target.value)}
                                >
                                    <option value="">Select a member</option>
                                    {members.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} ({member.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {actionType === 'borrow' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Return Date</label>
                                <input
                                    type="date"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                />
                            </div>
                        )}

                        <button
                            className="btn btn-primary w-full"
                            onClick={handleSubmit}
                        >
                            {actionType === 'borrow' ? 'Borrow Book' : 'Return Book'}
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="card">
                    <div className="p-5">
                        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                        <div className="space-y-4">
                            {transactions.slice(0, 5).map(transaction => {
                                const book = books.find(b => b.id === transaction.bookId);
                                const member = members.find(m => m.id === transaction.memberId);
                                return (
                                    <div key={transaction.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{book?.title}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">Member: {member?.name}</p>
                                        <p className="text-sm text-gray-600">Borrowed: {transaction.borrowDate}</p>
                                        {transaction.status === 'Borrowed' && (
                                            <p className="text-sm text-gray-600">Due: {transaction.returnDate}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* All Transactions */}
            <div className="card">
                <div className="p-5">
                    <h2 className="text-xl font-semibold mb-4">All Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left">Book</th>
                                    <th className="py-3 px-4 text-left">Member</th>
                                    <th className="py-3 px-4 text-left">Borrow Date</th>
                                    <th className="py-3 px-4 text-left">Return Date</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => {
                                    const book = books.find(b => b.id === transaction.bookId);
                                    const member = members.find(m => m.id === transaction.memberId);
                                    return (
                                        <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="py-3 px-4">{book?.title}</td>
                                            <td className="py-3 px-4">{member?.name}</td>
                                            <td className="py-3 px-4">{transaction.borrowDate}</td>
                                            <td className="py-3 px-4">{transaction.returnDate}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
