import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import Swal from "sweetalert2";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchProfile = async () => {
    const userId = localStorage.getItem("userId");
    console.log("userid from localStorage:", userId);
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone || "",
      });

      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#ec4899",
      });
    } catch (error) {
      console.error("Error updating profile:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update profile.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Profile
          </h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-5">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={async () => {
                  const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "Your changes will not be saved.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#ef4444",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Yes, cancel",
                    cancelButtonText: "No, keep editing",
                  });

                  if (result.isConfirmed) {
                    setIsEditing(false);

                    setFormData({
                      name: profile.name,
                      email: profile.email,
                      phone: profile.phone || "",
                    });
                  }
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>
          </form>
        ) : (
          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium text-gray-800">
                {profile.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-gray-800">
                {profile.phone || "Not added"}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );

};

export default Profile;