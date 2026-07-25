const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Welcome back, Admin! Here's what's happening with your store.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Users */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            120
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +12% from last month
          </p>
        </div>

        {/* Products */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Products
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            45
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +8% from last month
          </p>
        </div>

        {/* Orders */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Orders
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            86
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +15% from last month
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            $4,250
          </h2>

          <p className="mt-2 text-sm text-green-600">
            +10% from last month
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">#1001</td>
                <td className="py-4">Ali</td>
                <td className="py-4">$120</td>
                <td className="py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Paid
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">#1002</td>
                <td className="py-4">Ahmed</td>
                <td className="py-4">$80</td>
                <td className="py-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4">#1003</td>
                <td className="py-4">Sara</td>
                <td className="py-4">$200</td>
                <td className="py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Paid
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;