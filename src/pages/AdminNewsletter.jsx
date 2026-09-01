import { useEffect, useState } from "react";
import axios from "axios";

const AdminNewsletter = () => {
    const [userSubscribers, setuserSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/newsletter`
            );

            setuserSubscribers(response.data.subscribers);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    return (
        <div className="mb-6">
            {/* Page Header */}
            <div className="mb-6 mt-4 ml-4">
                <h1 className="text-2xl font-bold">
                    Newsletter Subscribers
                </h1>
                <p className="text-gray-500 mt-1">
                    View all newsletter subscribers.
                </p>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <p className="mt-1">Total Subscribers: {userSubscribers.length}</p>
                )}
            </div>

            {/* Total Subscribers Card */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <p className="text-gray-500 text-sm">
                    Total Subscribers
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-1">
                    {userSubscribers.length}
                </h2>
            </div>


            {/* Subscribers Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">

                <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Subscriber List
                    </h2>
                </div>


                {loading ? (
                    <div className="p-6 text-center text-gray-500">
                        Loading subscribers...
                    </div>
                ) : userSubscribers.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No subscribers found.
                    </div>
                ) : (
                    <div className="overflow-x-auto ml-2">

                        <table className="w-full">

                            <thead className="bg-gray-100 border-b border-t">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        #
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Subscribed Date
                                    </th>
                                </tr>
                            </thead>


                            <tbody className="divide-y">

                                {userSubscribers.map((subscriber, index) => (
                                    <tr
                                        key={subscriber._id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            {subscriber.email}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(
                                                subscriber.createdAt
                                            ).toLocaleDateString()}
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

export default AdminNewsletter;