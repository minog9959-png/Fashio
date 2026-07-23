import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          setMessage("Payment session not found.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/stripe/verify-payment`,
          {
            sessionId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Payment Verification:", response.data);

        setSuccess(true);
        setMessage("Payment successful! Your order has been confirmed.");
      } catch (error) {
        console.log("Payment Verification Error:", error);

        setSuccess(false);
        setMessage(
          error.response?.data?.message ||
            "Payment verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">
          Verifying your payment...
        </h2>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">

      {success ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Payment Successful 🎉
          </h1>

          <p className="mb-6">
            {message}
          </p>

          <button
            onClick={() => navigate("/order")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            View My Orders
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Payment Verification Failed
          </h1>

          <p className="mb-6">
            {message}
          </p>

          <button
            onClick={() => navigate("/order")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Back to Orders
          </button>
        </>
      )}

    </div>
  );
};

export default PaymentSuccess;