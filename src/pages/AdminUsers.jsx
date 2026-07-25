import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("adminToken");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/admin/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUsers(response.data.users);
            } catch (error) {
                console.log("Users fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    //User delete function:
    const handleDeleteUser = async (userId) => {
        console.log("Delete UserId", userId);
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }
        try {
            const token = localStorage.getItem("adminToken");

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Remove deleted user from current table
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== userId)
            );

            await Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

        } catch (error) {
            console.log("Delete user error:", error);
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete product.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Users
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage all registered users.
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">

                {loading ? (
                    <p className="text-gray-500">
                        Loading users...
                    </p>
                ) : users.length === 0 ? (
                    <p className="text-gray-500">
                        No users found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Email</th>
                                    <th className="pb-3">Verified</th>
                                    <th className="pb-3">Joined</th>
                                    <th className="pb-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b"
                                    >
                                        <td className="py-4 font-medium text-gray-800">
                                            {user.name}
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="py-4">
                                            {user.isVerified ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                    Not Verified
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="py-4">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="rounded bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default AdminUsers;