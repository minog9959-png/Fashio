import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">

      <h1 className="text-3xl font-bold mb-4">
        Payment Cancelled
      </h1>

      <p className="mb-6">
        Your payment was cancelled or could not be completed.
      </p>

      <button
        onClick={() => navigate("/order")}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Back to Orders
      </button>

    </div>
  );
};

export default PaymentFailed;