import React, { useState } from 'react';

export default function MemberManagement({ members, setMembers }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
    });

    const handleAddMember = () => {
        if (newMember.name && newMember.email) {
            const member = {
                id: members.length + 1,
                ...newMember
            };
            setMembers([...members, member]);
            setShowAddModal(false);
            setNewMember({
                name: '',
                email: '',
                phone: '',
                address: '',
                status: 'Active'
            });
        }
    };

    const handleDeleteMember = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Member Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="fas fa-plus mr-2"></i> Add Member
                </button>
            </div>

            {/* Members Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{member.name}</td>
                                    <td className="py-3 px-4">{member.email}</td>
                                    <td className="py-3 px-4">{member.phone}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-blue-500 hover:text-blue-700 mr-3">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteMember(member.id)}
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

            {/* Add Member Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Member</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowAddModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email *</label>
                                <input
                                    type="email"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newMember.phone}
                                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <textarea
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newMember.address}
                                    onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                                    rows="3"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    value={newMember.status}
                                    onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
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
                                    onClick={handleAddMember}
                                >
                                    Add Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
