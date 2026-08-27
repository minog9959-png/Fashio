import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
    FaSearch,
    FaHeart,
    FaShoppingBag,
    FaChevronDown,
    FaBoxOpen,
    FaBell
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import socket from "../socketConnection";
import {
  requestNotificationPermission,
  listenForMessages,
} from "../firebaseMessaging";

const Header = ({
    // selectedCategory,
    // setSelectedCategory,
    search,
    setSearch,
    // setSearchKeyword,
}) => {
    const [categories, setCategories] = useState([]);

    // Cart states
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const [wishlistCount, setWishlistCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const [showCategories, setShowCategories] = useState(false);

    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );

            console.log(response.data);

            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Cart
    const fetchCart = async () => {
        try {
            console.log("fetchCart is running");
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                setCartItemsCount(0);
                setCartTotal(0);
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Header Cart:", response.data);

            const cartItems = response.data.cartItems;

            // Calculate total quantity
            const count = cartItems.reduce(
                (total, item) => total + item.quantity,
                0
            );

            // Calculate cart total
            const total = cartItems.reduce(
                (total, item) =>
                    total + item.product.price * item.quantity,
                0
            );

            setCartItemsCount(count);
            setCartTotal(total);

        } catch (error) {
            console.log("Header Cart Error:", error);

            setCartItemsCount(0);
            setCartTotal(0);
        }
    };

    //fetch Wishlist
    const fetchWishlist = async () => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setWishlistCount(0);
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/wishlist/${userId}`
            );

            console.log("Header Wishlist:", response.data);

            setWishlistCount(response.data.wishlistItems.length);

        } catch (error) {
            console.log("Header Wishlist Error:", error);
            setWishlistCount(0);
        }
    };

    //Fetch Order
    const fetchOrders = async () => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setOrderCount(0);
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/order/${userId}`
            );

            console.log("Header Orders:", response.data);

            setOrderCount(response.data.orders.length);

        } catch (error) {
            console.log("Header Orders Error:", error);
            setOrderCount(0);
        }
    };

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    // Call fetch funcions
    useEffect(() => {
        fetchCart();
        fetchWishlist();
        fetchOrders();
    }, [location.pathname]);

    useEffect(() => {
        const handleCartUpdated = () => {
            console.log("Header received cartUpdated event");
            fetchCart();
        };

        window.addEventListener("cartUpdated", handleCartUpdated);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdated);
        };
    }, []);

    useEffect(() => {
        const handleOrderUpdated = () => {
            console.log("Header received orderUpdated event");
            fetchOrders();
        };

        window.addEventListener("orderUpdated", handleOrderUpdated);

        return () => {
            window.removeEventListener("orderUpdated", handleOrderUpdated);
        };
    }, []);

    // Close category dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowCategories(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    //socket notification

    useEffect(() => {
    if (!socket) return;

    const handleOrderStatusUpdated = (data) => {
        console.log("Header Socket notification:", data);

        setNotifications((prev) => [
            ...prev,
            {
                id: Date.now(),
                message: data.message,
                status: data.status,
            },
        ]);
    };
          socket.on("orderStatusUpdated", handleOrderStatusUpdated);
  
    return () => {
    
            socket.off("orderStatusUpdated", handleOrderStatusUpdated);
    };
}, []);

useEffect(() => {
    let unsubscribe;

    const setupNotifications = async () => {
        await requestNotificationPermission();

        unsubscribe = listenForMessages((notification) => {
            console.log(
                "🔔 Header received Firebase notification:",
                notification
            );

            setNotifications((prev) => [
                ...prev,
                notification,
            ]);

            // Refresh orders
            fetchOrders();
        });
    };

    setupNotifications();

    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    };
}, []);

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-[1200px] mx-auto px-5 py-7">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    {/* Logo */}
                    <div>
                        <h1 className="text-4xl font-bold tracking-wider">
                            Fashio
                            <span className="text-pink-500">.</span>
                        </h1>
                    </div>

                    {/* Search */}
                    <div
                        ref={dropdownRef}
                        className="relative flex w-full lg:w-[650px] h-[52px] border border-gray-300 rounded-sm"
                    >

                        {/* Categories */}
                        <button
                            onClick={() =>
                                setShowCategories(!showCategories)
                            }
                            className="flex items-center gap-2 px-6 border-r border-gray-300 font-semibold text-sm"
                        >
                            All Categories
                            <FaChevronDown className="text-xs" />
                        </button>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="What do you need?"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="flex-1 px-5 text-sm outline-none"
                        />

                        {/* Search Button */}
                        <button
                            onClick={() => {
                                navigate("/shop", {
                                    state: {
                                        category: "",
                                        search: search,
                                    },
                                });
                            }}
                            className="flex items-center justify-center gap-2 bg-[#E7AB3C] hover:bg-[#d89d32] text-white px-8 duration-300"
                        >
                            <FaSearch className="text-lg" />
                        </button>

                        {/* Categories Dropdown */}
                        {showCategories && (
                            <div className="absolute left-0 top-full mt-1 w-56 bg-white border shadow-lg z-50">

                                {categories.map((category) => (
                                    <p
                                        key={category._id}
                                        onClick={() => {
                                            console.log(category);

                                            navigate("/shop", {
                                                state: {
                                                    category: category._id,
                                                    search: "",
                                                },
                                            });

                                            setShowCategories(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {category.name}
                                    </p>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Icons */}

                    <div className="flex items-center gap-6">

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setShowNotifications(!showNotifications)
                                }
                                className="relative"
                            >
                                <FaBell className="text-xl cursor-pointer hover:text-pink-500 duration-300" />

                                {notifications.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 top-8 w-80 bg-white border border-gray-200 shadow-lg z-50">

                                    <div className="px-4 py-3 border-b font-semibold">
                                        Notifications
                                    </div>

                                    {notifications.length === 0 ? (
                                        <p className="px-4 py-5 text-sm text-gray-500">
                                            No notifications
                                        </p>
                                    ) : (
                                        <div className="max-h-72 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="px-4 py-3 border-b hover:bg-gray-50"
                                                >
                                                    <div className="flex gap-3">
                                                        <FaBell className="text-pink-500 mt-1" />

                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {notification.message}
                                                            </p>

                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Status: {notification.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>

                        {/* Wishlist */}
                        <div className="relative">
                            <Link to="/wishlist">
                                <FaHeart className="text-xl cursor-pointer hover:text-pink-500 duration-300" />
                            </Link>

                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        </div>


                        {/* Orders */}
                        <div className="relative">
                            <Link to="/order">
                                <FaBoxOpen className="text-2xl cursor-pointer hover:text-pink-500 duration-300" />
                            </Link>

                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {orderCount}
                            </span>
                        </div>


                        {/* Cart */}
                        <div className="relative cursor-pointer">
                            <Link to="/cart">
                                <FaShoppingBag className="text-xl hover:text-pink-500 duration-300" />
                            </Link>

                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        </div>


                        {/* Cart Total */}
                        <p className="font-semibold">
                            ${cartTotal.toFixed(2)}
                        </p>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;