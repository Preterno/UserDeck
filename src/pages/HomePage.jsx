import React, { useState } from "react";
import UserCard from "../components/UserCard";

function HomePage() {
  const apiResponse = {
    page: 2,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
      {
        id: 8,
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
        avatar: "https://reqres.in/img/faces/8-image.jpg",
      },
      {
        id: 9,
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
      },
      {
        id: 10,
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://reqres.in/img/faces/10-image.jpg",
      },
      {
        id: 11,
        email: "george.edwards@reqres.in",
        first_name: "George",
        last_name: "Edwards",
        avatar: "https://reqres.in/img/faces/11-image.jpg",
      },
      {
        id: 12,
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        avatar: "https://reqres.in/img/faces/12-image.jpg",
      },
    ],
    support: {
      url: "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
      text: "Tired of writing endless social media content? Let Content Caddy generate it for you.",
    },
  };
  const [searchQ, setSearchQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = apiResponse.data.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQ.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQ.toLowerCase())
  );
  return (
    <div className="flex items-center h-full flex-col gap-10 py-9 max-sm:px-5 max-sm:justify-center ">
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

      <div className="grid grid-cols-3 gap-7 min-h-[28rem] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(({ id, email, first_name, last_name, avatar }) => (
            <UserCard
              key={id}
              id={id}
              email={email}
              first_name={first_name}
              last_name={last_name}
              avatar={avatar}
            />
          ))
        ) : (
          <div className="w-full min-h-[28rem] col-span-full p-10 flex justify-center text-gray-500 text-2xl font-semibold">
            No records found
          </div>
        )}
      </div>
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
