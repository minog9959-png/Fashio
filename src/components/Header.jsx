import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
    FaSearch,
    FaHeart,
    FaShoppingBag,
    FaChevronDown,
    FaBoxOpen,
    FaBell,
    FaUser,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import socket from "../socketConnection";
import {
    requestNotificationPermission,
    listenForMessages,
} from "../firebaseMessaging";

const Header = ({ search, setSearch }) => {
    const [categories, setCategories] = useState([]);

    // Cart states
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // Wishlist / Orders
    const [wishlistCount, setWishlistCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    // Notifications
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Categories dropdown
    const [showCategories, setShowCategories] = useState(false);

    // Search suggestions
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    // =========================
    // Fetch Categories
    // =========================
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );

            console.log("Categories:", response.data);

            setCategories(response.data.categories || []);
        } catch (error) {
            console.log("Categories Error:", error);
        }
    };

    // =========================
    // Fetch Cart
    // =========================
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

            const cartItems = response.data.cartItems || [];

            // Calculate total quantity
            const count = cartItems.reduce(
                (total, item) => total + (item.quantity || 0),
                0
            );

            // Calculate cart total
            const total = cartItems.reduce(
                (total, item) =>
                    total +
                    (item.product?.price || 0) * (item.quantity || 0),
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

    // =========================
    // Fetch Wishlist
    // =========================
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

            setWishlistCount(response.data.wishlistItems?.length || 0);
        } catch (error) {
            console.log("Header Wishlist Error:", error);
            setWishlistCount(0);
        }
    };

    // =========================
    // Fetch Orders
    // =========================
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

            setOrderCount(response.data.orders?.length || 0);
        } catch (error) {
            console.log("Header Orders Error:", error);
            setOrderCount(0);
        }
    };

    // =========================
    // Fetch Products
    // =========================
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/products`
            );

            setProducts(response.data.products || []);
        } catch (error) {
            console.log("Products Error:", error);
            setProducts([]);
        }
    };

    // =========================
    // Initial Fetch
    // =========================
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    // =========================
    // Fetch User Data
    // =========================
    useEffect(() => {
        fetchCart();
        fetchWishlist();
        fetchOrders();
    }, [location.pathname]);

    // =========================
    // Cart Updated Event
    // =========================
    useEffect(() => {
        const handleCartUpdated = () => {
            console.log("Header received cartUpdated event");
            fetchCart();
        };

        window.addEventListener("cartUpdated", handleCartUpdated);

        return () => {
            window.removeEventListener(
                "cartUpdated",
                handleCartUpdated
            );
        };
    }, []);

    // =========================
    // Order Updated Event
    // =========================
    useEffect(() => {
        const handleOrderUpdated = () => {
            console.log("Header received orderUpdated event");
            fetchOrders();
        };

        window.addEventListener("orderUpdated", handleOrderUpdated);

        return () => {
            window.removeEventListener(
                "orderUpdated",
                handleOrderUpdated
            );
        };
    }, []);

    // =========================
    // Close Dropdown Outside
    // =========================
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowCategories(false);
                setShowSuggestions(false);
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

    // =========================
    // Socket Notifications
    // =========================
    useEffect(() => {
        if (!socket) return;

        const handleOrderStatusUpdated = (data) => {
            console.log(
                "Header Socket notification:",
                data
            );

            setNotifications((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    message: data.message,
                    status: data.status,
                },
            ]);

            fetchOrders();
        };

        socket.on(
            "orderStatusUpdated",
            handleOrderStatusUpdated
        );

        return () => {
            socket.off(
                "orderStatusUpdated",
                handleOrderStatusUpdated
            );
        };
    }, []);

    // =========================
    // Firebase Notifications
    // =========================
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

    // =========================
    // Search Handler
    // =========================
    const handleSearchChange = (e) => {
        const value = e.target.value;

        setSearch(value);

        if (!value.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = products
            .filter((product) =>
                product.title
                    ?.toLowerCase()
                    .includes(value.toLowerCase())
            )
            .slice(0, 5);

        setSuggestions(filtered);
        setShowSuggestions(true);
    };

    // =========================
    // Search Submit
    // =========================
    const handleSearch = () => {
        setShowSuggestions(false);
        setShowCategories(false);

        navigate("/shop", {
            state: {
                category: "",
                search: search,
            },
        });
    };

    return (
        <header className="border-b border-gray-200 bg-white">

            <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-5 py-5 sm:py-7">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">

                    {/* =========================
                        Logo
                    ========================= */}
                    <div className="shrink-0">
                        <Link to="/">
                            <h1 className="text-4xl font-bold tracking-wider">
                                Fashio
                                <span className="text-pink-500">.</span>
                            </h1>
                        </Link>
                    </div>

                    {/* =========================
                        Search
                    ========================= */}
                    <div
                        ref={dropdownRef}
                        className="
                            relative
                            flex
                            w-full
                            lg:w-[650px]
                            max-w-full
                            h-[50px]
                            sm:h-[52px]
                            border
                            border-gray-300
                            rounded-sm
                            overflow-visible
                        "
                    >

                        {/* =========================
                            Categories Button
                        ========================= */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowCategories(
                                    !showCategories
                                )
                            }
                            className="
                                flex
                                shrink-0
                                items-center
                                justify-center
                                gap-1
                                sm:gap-2
                                px-2
                                sm:px-4
                                border-r
                                border-gray-300
                                font-semibold
                                text-[10px]
                                min-[375px]:text-xs
                                sm:text-sm
                                whitespace-nowrap
                            "
                        >
                            <span>All Categories</span>

                            <FaChevronDown
                                className="text-[9px] sm:text-xs shrink-0"
                            />
                        </button>

                        {/* =========================
                            Search Input
                        ========================= */}
                        <input
                            type="text"
                            placeholder="What do you need?"
                            value={search}
                            onChange={handleSearchChange}
                            onFocus={() => {
                                if (search.trim()) {
                                    setShowSuggestions(true);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            className="
                                flex-1
                                min-w-0
                                w-full
                                px-2
                                sm:px-4
                                text-xs
                                sm:text-sm
                                outline-none
                            "
                        />

                        {/* =========================
                            Search Suggestions
                        ========================= */}
                        {showSuggestions &&
                            suggestions.length > 0 && (
                                <div
                                    className="
                                        absolute
                                        top-full
                                        left-0
                                        right-0
                                        mt-1
                                        bg-white
                                        border
                                        border-gray-200
                                        shadow-lg
                                        z-[100]
                                        max-h-60
                                        overflow-y-auto
                                    "
                                >
                                    {suggestions.map(
                                        (product) => (
                                            <button
                                                type="button"
                                                key={product._id}
                                                onClick={() => {
                                                    setSearch(
                                                        product.title
                                                    );
                                                    setShowSuggestions(
                                                        false
                                                    );

                                                    navigate(
                                                        "/shop",
                                                        {
                                                            state: {
                                                                category:
                                                                    "",
                                                                search: product.title,
                                                            },
                                                        }
                                                    );
                                                }}
                                                className="
                                                    block
                                                    w-full
                                                    text-left
                                                    px-3
                                                    sm:px-4
                                                    py-3
                                                    text-xs
                                                    sm:text-sm
                                                    hover:bg-gray-100
                                                    cursor-pointer
                                                "
                                            >
                                                {product.title}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}

                        {/* =========================
                            Search Button
                        ========================= */}
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="
                                flex
                                shrink-0
                                w-12
                                sm:w-16
                                h-full
                                items-center
                                justify-center
                                bg-[#B77900]
                                hover:bg-[#A66A00]
                                text-white
                                duration-300
                            "
                            aria-label="Search Products"
                        >
                            <FaSearch
                                className="text-base sm:text-lg"
                                aria-hidden="true"
                            />
                        </button>

                        {/* =========================
                            Categories Dropdown
                        ========================= */}
                        {showCategories && (
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-full
                                    mt-1
                                    w-52
                                    sm:w-56
                                    max-w-[90vw]
                                    bg-white
                                    border
                                    border-gray-200
                                    shadow-lg
                                    z-[100]
                                    max-h-72
                                    overflow-y-auto
                                "
                            >
                                {categories.length === 0 ? (
                                    <p className="px-4 py-3 text-sm text-gray-500">
                                        No categories found
                                    </p>
                                ) : (
                                    categories.map(
                                        (category) => (
                                            <button
                                                type="button"
                                                key={category._id}
                                                onClick={() => {
                                                    console.log(
                                                        category
                                                    );

                                                    navigate(
                                                        "/shop",
                                                        {
                                                            state: {
                                                                category:
                                                                    category._id,
                                                                search: "",
                                                            },
                                                        }
                                                    );

                                                    setShowCategories(
                                                        false
                                                    );
                                                }}
                                                className="
                                                    block
                                                    w-full
                                                    text-left
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    hover:bg-gray-100
                                                    cursor-pointer
                                                "
                                            >
                                                {category.name}
                                            </button>
                                        )
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* =========================
                        Icons
                    ========================= */}
                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-5
                            sm:gap-6
                            flex-wrap
                        "
                    >

                        {/* =========================
                            Notifications
                        ========================= */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowNotifications(
                                        !showNotifications
                                    )
                                }
                                className="relative"
                                aria-label="Notifications"
                            >
                                <FaBell
                                    className="
                                        text-lg
                                        sm:text-xl
                                        cursor-pointer
                                        hover:text-pink-500
                                        duration-300
                                    "
                                    aria-hidden="true"
                                />

                                {notifications.length > 0 && (
                                    <span
                                        className="
                                            absolute
                                            -top-2
                                            -right-2
                                            bg-red-500
                                            text-white
                                            text-[10px]
                                            w-5
                                            h-5
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        {notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-8
                                        w-[280px]
                                        sm:w-80
                                        max-w-[90vw]
                                        bg-white
                                        border
                                        border-gray-200
                                        shadow-lg
                                        z-[100]
                                    "
                                >
                                    <div className="px-4 py-3 border-b font-semibold">
                                        Notifications
                                    </div>

                                    {notifications.length ===
                                    0 ? (
                                        <p className="px-4 py-5 text-sm text-gray-500">
                                            No notifications
                                        </p>
                                    ) : (
                                        <div className="max-h-72 overflow-y-auto">
                                            {notifications.map(
                                                (
                                                    notification
                                                ) => (
                                                    <div
                                                        key={
                                                            notification.id
                                                        }
                                                        className="
                                                            px-4
                                                            py-3
                                                            border-b
                                                            hover:bg-gray-50
                                                        "
                                                    >
                                                        <div className="flex gap-3">
                                                            <FaBell className="text-pink-500 mt-1 shrink-0" />

                                                            <div className="min-w-0">
                                                                <p className="text-sm font-medium break-words">
                                                                    {
                                                                        notification.message
                                                                    }
                                                                </p>

                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Status:{" "}
                                                                    {
                                                                        notification.status
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* =========================
                            Wishlist
                        ========================= */}
                        <div className="relative">
                            <Link
                                to="/wishlist"
                                aria-label="Wishlist"
                            >
                                <FaHeart
                                    className="
                                        text-lg
                                        sm:text-xl
                                        cursor-pointer
                                        hover:text-pink-500
                                        duration-300
                                    "
                                    aria-hidden="true"
                                />
                            </Link>

                            <span
                                className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-pink-500
                                    text-white
                                    text-[10px]
                                    w-5
                                    h-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {wishlistCount}
                            </span>
                        </div>

                        {/* =========================
                            Orders
                        ========================= */}
                        <div className="relative">
                            <Link
                                to="/order"
                                aria-label="Order"
                            >
                                <FaBoxOpen
                                    className="
                                        text-xl
                                        sm:text-2xl
                                        cursor-pointer
                                        hover:text-pink-500
                                        duration-300
                                    "
                                    aria-hidden="true"
                                />
                            </Link>

                            <span
                                className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-pink-500
                                    text-white
                                    text-[10px]
                                    w-5
                                    h-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {orderCount}
                            </span>
                        </div>

                        {/* =========================
                            Cart
                        ========================= */}
                        <div className="relative">
                            <Link
                                to="/cart"
                                aria-label="Cart"
                            >
                                <FaShoppingBag
                                    className="
                                        text-lg
                                        sm:text-xl
                                        cursor-pointer
                                        hover:text-pink-500
                                        duration-300
                                    "
                                    aria-hidden="true"
                                />
                            </Link>

                            <span
                                className="
                                    absolute
                                    -top-2
                                    -right-2
                                    bg-pink-500
                                    text-white
                                    text-[10px]
                                    w-5
                                    h-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                {cartItemsCount}
                            </span>
                        </div>

                        {/* =========================
                            Cart Total
                        ========================= */}
                        <p
                            className="
                                font-semibold
                                text-sm
                                sm:text-base
                            "
                        >
                            ${cartTotal.toFixed(2)}
                        </p>

                        {/* =========================
                            Profile
                        ========================= */}
                        <div className="relative">
                            <Link
                                to="/profile"
                                aria-label="Profile"
                            >
                                <FaUser
                                    className="
                                        text-base
                                        sm:text-lg
                                        cursor-pointer
                                        hover:text-pink-500
                                        duration-300
                                    "
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
