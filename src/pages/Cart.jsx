import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart/6a69f7b37c693b5acf03fb96`
            );

            setCartItems(response.data.cartItems);

        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Failed to load cart");
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">
                    Shopping Cart
                </h1>
            </div>
        );
    }

    return (
  <div className="max-w-6xl mx-auto py-10 px-4">

    <h1 className="text-3xl font-bold mb-6">
      Shopping Cart
    </h1>

    {
      cartItems.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        cartItems.map((item) => (

          <div
            key={item._id}
            className="flex items-center justify-between border rounded-lg p-4 mb-4"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {item.product.title}
              </h2>

              <p>Price: ${item.product.price}</p>

              <p>Quantity: {item.quantity}</p>
            </div>

          </div>

        ))

      )
    }

  </div>
);
}

export default Cart;