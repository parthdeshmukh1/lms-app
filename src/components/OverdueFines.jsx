import { useSelector, useDispatch } from "react-redux";
import {
  fetchFines,
  payFine,
  createFine,
  cancelFine,
  deleteFine,
  getFineById,
  getFinesByMemberId,
  getPendingFines,
  getTotalPendingFinesByMember,
  updateFines,
  reverseFine,
} from "../features/fines/fineSlice.js";
import { fetchMembers } from "../features/members/memberSlice.js";
import { useEffect, useState } from "react";

export default function OverdueFines() {
  const dispatch = useDispatch();
  const { fines, loading } = useSelector((state) => state.fines);
  const { members } = useSelector((state) => state.member);

  const [showAddFineModal, setShowAddFineModal] = useState(false);
  const [newFine, setNewFine] = useState({
    transactionId: "",
    fineType: "",
  });

  useEffect(() => {
    dispatch(fetchFines());
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleMarkAsPaid = (fineId) => {
    dispatch(payFine(fineId));
  };

  const handleAddFine = () => {
    if (!newFine.transactionId || !newFine.fineType) return;
    dispatch(
      createFine({
        transactionId: newFine.transactionId,
        fineType: newFine.fineType,
      })
    );
    setShowAddFineModal(false);
    setNewFine({ transactionId: "", fineType: "" });
  };

  const handleCancelPayment = (fineId) => {
    dispatch(cancelFine(fineId));
  };

  const handleReversePayment = (fineId) => {
    dispatch(reverseFine(fineId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overdue Books & Fines</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Overdue Books</h2>
            <div className="space-y-4">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">The Great Gatsby</span>
                      <span className="text-red-500 font-medium">
                        5 days overdue
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Borrowed by: John Doe
                    </p>
                    <p className="text-sm text-gray-600">Due: 2023-06-15</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">Fines Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Total Outstanding Fines</p>
                  <p className="text-sm text-gray-600">
                    Unpaid fines across all members
                  </p>
                </div>
                <span className="text-2xl font-bold text-red-500">$15.00</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Total Collected Fines</p>
                  <p className="text-sm text-gray-600">Paid fines this month</p>
                </div>
                <span className="text-2xl font-bold text-green-500">
                  $25.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fines List */}
      <div className="card">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Fines Management</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddFineModal(true)}
            >
              <i className="fas fa-plus mr-2"></i> Add Fine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Member</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Borrow Date</th>
                  <th className="py-3 px-4 text-left">Due Date</th>
                  <th className="py-3 px-4 text-left">Paid Date</th>
                  <th className="py-3 px-4 text-left">Fine Type</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fines.map((fine) => {
                  const { fineDTO, amount, borrowingTransactionResponseDTO } =
                    fine;

                  const { fineId, status, fineType } = fineDTO || {};
                  const { member, borrowDate, dueDate } =
                    borrowingTransactionResponseDTO || {};

                  const memberName = member?.name || "-";
                  const borrowDateOnly = borrowDate?.split("T")[0] || "-";
                  const dueDateOnly = dueDate?.split("T")[0] || "-";
                  const paidDateOnly = fineDTO?.paidDate
                    ? fineDTO.paidDate.split("T")[0]
                    : "-";
                  const formattedAmount = `$${amount?.toFixed(2) || "0.00"}`;

                  return (
                    <tr
                      key={fineId}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{memberName}</td>
                      <td className="py-3 px-4">{formattedAmount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : status === "PAID"
                              ? "bg-green-100 text-green-800"
                              : status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{borrowDateOnly}</td>
                      <td className="py-3 px-4">{dueDateOnly}</td>
                      <td className="py-3 px-4">{paidDateOnly}</td>
                      <td className="py-3 px-4">{fineType || "-"}</td>
                      <td className="py-3 px-4">
                        {status === "PENDING" && (
                          <>
                            <button
                              className="btn btn-secondary px-3 py-1 text-sm"
                              onClick={() => handleMarkAsPaid(fineId)}
                            >
                              Mark as Paid
                            </button>
                            <button
                              className="btn btn-secondary px-3 py-1 text-sm ml-2"
                              onClick={() => handleCancelPayment(fineId)}
                            >
                              Cancel Fine
                            </button>
                          </>
                        )}

                        {status === "PAID" && (
                          <button
                            className="btn btn-danger px-3 py-1 text-sm"
                            onClick={() => handleReversePayment(fineId)}
                          >
                            Reverse Payment
                          </button>
                        )}

                        {status === "CANCELLED" && (
                          <span className="text-red-600 font-semibold px-2 py-1 text-sm rounded">
                            CANCELLED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Fine Modal */}
      {showAddFineModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Fine</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddFineModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction ID *
                </label>
                <input
                  type="number"
                  className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none w-full"
                  value={newFine.transactionId}
                  onChange={(e) =>
                    setNewFine({
                      ...newFine,
                      transactionId: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Fine Type *
                </label>
                <select
                  className="input-field border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none w-full"
                  value={newFine.fineType}
                  onChange={(e) =>
                    setNewFine({
                      ...newFine,
                      fineType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Fine Type</option>
                  <option value="LATE_RETURN">Late Return</option>
                  <option value="LOST_ITEM">Lost Item</option>
                  <option value="DAMAGED_ITEM">Damaged Item</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="btn bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowAddFineModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddFine}>
                  Add Fine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
