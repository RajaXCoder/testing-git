import axios from "axios";
import React, { useState } from "react";

const ListItem = ({ userData }) => {
  const { username, email, created_at } = userData;

  const [isEdit, setIsEdit] = useState(false);
  const [inputUsername, setInputUsername] = useState(username);
  const [inputEmail, setInputEmail] = useState(email);

  // console.log(userData);

  const date = new Date(created_at);

  // Extract year, month, day, and time
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the output
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // console.log(formattedDate);

  const saveUser = async () => {
    setIsEdit(false);

    const { data } = await axios.put(
      `http://localhost:3000/api/users/${userData.id}`,
      {
        username: inputUsername,
        email: inputEmail,
        id: userData.id,
      }
    );
    console.log(data);
  };

  // Assuming user is an object with properties: username, email, password, time
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="border border-gray-300 p-2">
        {isEdit ? (
          <input
            className="w-full border"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        ) : (
          username
        )}
      </td>
      <td className="border border-gray-300 p-2">
        {isEdit ? (
          <input
            className="w-full border"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        ) : (
          email
        )}
      </td>
      <td className="border border-gray-300 p-2">{formattedDate}</td>
      <td className="border border-gray-300 p-2">
        {!isEdit ? (
          <button
            className="bg-blue-400 border-none cursor-pointer px-3 py-1 rounded-sm text-white"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-blue-400 border-none cursor-pointer px-3 py-1 rounded-sm text-white"
            onClick={saveUser}
          >
            Save
          </button>
        )}
      </td>
      <td className="border border-gray-300 p-2">
        <button className="bg-red-500 border-none cursor-pointer px-3 py-1 rounded-sm text-white">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
