import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ListItem from "../components/listItem";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  //Add new user state
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [rePassword, setRePassword] = useState(false);

  // const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewUser = async () => {
    if (!username || !email || !password || !rePassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3000/api/users", {
          username,
          email,
          password,
        });
        console.log(response.data);
        alert("User added successfully");
        fetchData(); // Refresh the user list
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Failed to add user", error);
      }
    }
  };

  return (
    <div className="h-screen p-2 font-mono">
      <Header />
      <div className="flex flex-col justify-between  my-4 px-4">
        <h1 className="text-2xl text-cyan-600 font-bold">Add New User</h1>
        <div className="flex gap-2">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
            <input
              className="border px-3"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User name"
            />
            <input
              className="border px-3 py-1"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border px-3 py-1"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border px-3 py-1"
              placeholder="Enter Re-Password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <button
            className="cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors duration-200"
            onClick={handleNewUser}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="w-full pt-2 ">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full text-center border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>CREATED AT</th>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((user) => (
                  <ListItem userData={user} key={user.id} />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
