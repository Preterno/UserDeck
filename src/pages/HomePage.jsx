import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import showToast from "../components/Notification";
import LoadingScreen from "./LoadingScreen";

function HomePage() {
  const [searchQ, setSearchQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [apiResponse, setApiResponse] = useState([]);
  const base_url = import.meta.env.VITE_API_BASE_URL;

  const getUsers = async () => {
    try {
      setIsLoading(true);
      console.log(`${base_url}api/users?page=${currentPage}`);
      const response = await axios.get(
        `${base_url}api/users?page=${currentPage}`
      );
      setApiResponse(response.data.data);
      console.log(response.data);
    } catch (error) {
      showToast(error.message, { type: "error" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current Page:", currentPage);
    getUsers();
  }, [currentPage]);

  const filteredUsers = apiResponse.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQ.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQ.toLowerCase())
  );
  return (
    <div className="flex items-center h-full flex-col gap-10 py-9 max-sm:px-5 max-sm:justify-center ">
      {!isLoading ? (
        <div className="flex items-center rounded-full shadow-sm bg-white px-4 max-w-lg mx-auto hover:shadow-md transition-shadow focus-within:shadow-lg">
          <i className="bi bi-search text-2xl text-gray-400 transition-opacity focus-within:opacity-70"></i>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full py-3 px-2 outline-none text-xl text-gray-700 placeholder-gray-500 rounded-r-full focus:opacity-80"
          />
        </div>
      ) : (
        <LoadingScreen />
      )}

      {!isLoading && (
        <div className="grid grid-cols-3 gap-7 min-h-[28rem] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(
              ({ id, email, first_name, last_name, avatar }) => (
                <UserCard
                  key={id}
                  id={id}
                  email={email}
                  first_name={first_name}
                  last_name={last_name}
                  avatar={avatar}
                />
              )
            )
          ) : (
            <div className="w-full min-h-[28rem] col-span-full p-10 flex justify-center text-gray-500 text-2xl font-semibold">
              No records found
            </div>
          )}
        </div>
      )}
      <div className="flex gap-5">
        <div
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-md text-lg ${
            currentPage === 1
              ? "bg-black text-grey font-bold"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </div>
        <div
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-md text-lg ${
            currentPage === 2
              ? "bg-black text-grey font-bold"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setCurrentPage(2)}
        >
          2
        </div>
      </div>
    </div>
  );
}

export default HomePage;
