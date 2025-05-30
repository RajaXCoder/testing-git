import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ListItem from "../components/listItem";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen p-2 font-mono">
      <Header />
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
