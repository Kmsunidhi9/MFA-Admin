import React, { useState } from "react";

const AdminApp = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Editor" },
    { id: 2, name: "Jane Smith", role: "Viewer" },
  ]);

  const [newUser, setNewUser] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ---------------- Token Handling ----------------
  const token = localStorage.getItem("token");
  let payload: any = null;
  let tokenError = false;

  if (!token) tokenError = true;
  else {
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch {
      tokenError = true;
    }
  }

  if (tokenError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-2xl">
        Unauthorized / Invalid Token
      </div>
    );

  // ---------------- Handlers ----------------
  const addUser = () => {
    if (!newUser.trim()) return;
    setUsers([...users, { id: Date.now(), name: newUser, role: "Viewer" }]);
    setNewUser("");
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen p-8 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-500">
            Welcome Admin {payload?.name}
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Toggle Theme
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Users", value: users.length, color: "text-blue-600" },
            { title: "Active Projects", value: 5, color: "text-green-600" },
            { title: "Pending Requests", value: 3, color: "text-yellow-600" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
            >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className={`text-3xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Add User */}
        <div className="flex gap-3 mb-6">
          <input
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Enter user name"
            className="border p-2 rounded-lg flex-1 
                       bg-white text-gray-900
                       dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />

          <button
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>

          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 
                             hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.role}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );

};

export default AdminApp;