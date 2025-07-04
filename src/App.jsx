import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavItem from './components/NavItem';
import NotificationsIcon from './components/NotificationsIcon';
import Dashboard from './components/Dashboard';
import BookManagement from './components/BookManagement';
import MemberManagement from './components/MemberManagement';
import BorrowReturn from './components/BorrowReturn';
import OverdueFines from './components/OverdueFines';
import Notifications from './components/Notifications';
import {getBooks,getBookById,addBook,updateBook,deleteBook} from './api/bookService.js';

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock data for demonstration
    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', isbn: '9780743273565', year: 1925, copies: 5 },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', isbn: '9780061120084', year: 1960, copies: 3 },
        { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', isbn: '9780451524935', year: 1949, copies: 7 }
    ]);

    const [members, setMembers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave', status: 'Active' }
    ]);

    const [transactions, setTransactions] = useState([
        { id: 1, bookId: 1, memberId: 1, borrowDate: '2023-05-15', returnDate: '2023-06-15', status: 'Borrowed' },
        { id: 2, bookId: 2, memberId: 2, borrowDate: '2023-05-20', returnDate: '2023-06-20', status: 'Borrowed' }
    ]);

    const [fines, setFines] = useState([
        { id: 1, memberId: 1, amount: 5.00, status: 'Pending', date: '2023-06-16' }
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, memberId: 1, message: 'Book "The Great Gatsby" is due in 2 days', date: '2023-06-13' },
        { id: 2, memberId: 1, message: 'You have an overdue book', date: '2023-06-16' }
    ]);

    // Added activeTab state to track the active tab
    const [activeTab, setActiveTab] = useState('dashboard');

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Test all Book APIs
    const testBooks = async () => {
        try {
            // 1. Get all books
            const allBooks = await getBooks();
            console.log('GET /api/books:', allBooks.data);

            // 2. Add a new book
            const newBook = {
                title: 'Test Title',
                author: 'Test Author',
                genre: 'test genere',
                isbn: '567890' + Math.floor(Math.random() * 1000000),
                yearPublished: 2001,
                availableCopies: 7,
                totalCopies: 5
            };
            const added = await addBook(newBook);
            console.log('POST /api/books:', added.data);
            const newBookId = Number(added.data.bookId);

            // 3. Get book by ID
            const byId = await getBookById(newBookId);
            console.log(`GET /api/books/${newBookId}:`, byId.data);

            // 4. Update book
            const updatedBook = { ...byId.data, title: 'Updated Test Book' };
            const updated = await updateBook(newBookId, updatedBook);
            console.log(`PUT /api/books/${newBookId}:`, updated.data);

            // 5. Delete book
            const deleted = await deleteBook(newBookId);
            console.log(`DELETE /api/books/${newBookId}:`, deleted.data || 'Deleted');
        } catch (error) {
            console.error('Book API test error:', error);
        }
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <button onClick={() => testBooks()}>Test Book</button>
                {/* Header */}
                <header className="bg-primary text-white shadow-md">
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <i className="fas fa-book text-2xl mr-3"></i>
                            <h1 className="text-xl font-bold">Library Management System</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <NotificationsIcon count={notifications.length} />
                            <div className="flex items-center">
                                <img src="https://ui-avatars.com/api/?name=Admin" alt="Admin" className="w-8 h-8 rounded-full" />
                                <span className="ml-2">Admin</span>
                            </div>
                        </div>
                        <button
                            className="md:hidden text-white"
                            onClick={toggleSidebar}
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className={`bg-dark text-white w-64 fixed md:relative h-full md:h-auto z-10 transform md:transform-none transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-6">Navigation</h2>
                            <nav>
                                <ul className="space-y-2">
                                    <Link to="/dashboard">
                                        <NavItem
                                            icon="fas fa-home"
                                            label="Dashboard"
                                            active={activeTab === 'dashboard'}
                                            onClick={() => setActiveTab('dashboard')}
                                        />
                                    </Link>
                                    <Link to="/books">
                                        <NavItem
                                            icon="fas fa-book"
                                            label="Book Management"
                                            active={activeTab === 'books'}
                                            onClick={() => setActiveTab('books')}
                                        />
                                    </Link>
                                    <Link to="/members">
                                        <NavItem
                                            icon="fas fa-users"
                                            label="Member Management"
                                            active={activeTab === 'members'}
                                            onClick={() => setActiveTab('members')}
                                        />
                                    </Link>
                                    <Link to="/borrow">
                                        <NavItem
                                            icon="fas fa-exchange-alt"
                                            label="Borrow/Return"
                                            active={activeTab === 'borrow'}
                                            onClick={() => setActiveTab('borrow')}
                                        />
                                    </Link>
                                    <Link to="/fines">
                                        <NavItem
                                            icon="fas fa-money-bill-wave"
                                            label="Overdue & Fines"
                                            active={activeTab === 'fines'}
                                            onClick={() => setActiveTab('fines')}
                                        />
                                    </Link>
                                    <Link to="/notifications">
                                        <NavItem
                                            icon="fas fa-bell"
                                            label="Notifications"
                                            active={activeTab === 'notifications'}
                                            onClick={() => setActiveTab('notifications')}
                                        />
                                    </Link>
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 p-4 md:p-6 overflow-auto">
                        <div className="container mx-auto">
                            <Routes>
                                <Route path="/" element={<Dashboard books={books} members={members} transactions={transactions} />} />
                                <Route path="/dashboard" element={<Dashboard books={books} members={members} transactions={transactions} />} />
                                <Route path="/books" element={<BookManagement books={books} setBooks={setBooks} />} />
                                <Route path="/members" element={<MemberManagement members={members} setMembers={setMembers} />} />
                                <Route path="/borrow" element={<BorrowReturn books={books} members={members} transactions={transactions} setTransactions={setTransactions} />} />
                                <Route path="/fines" element={<OverdueFines fines={fines} members={members} setFines={setFines} />} />
                                <Route path="/notifications" element={<Notifications notifications={notifications} members={members} setNotifications={setNotifications} />} />
                            </Routes>
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4">
                    <div className="container mx-auto px-4 text-center">
                        <p>Library Management System &copy; {new Date().getFullYear()} - All Rights Reserved</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}
