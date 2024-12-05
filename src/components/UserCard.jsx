import React from "react";

function UserCard({ id, email, first_name, last_name, avatar }) {
  const handleClick = () => {
    console.log(id, email, first_name, last_name, avatar);
  };
  return (
    <div
      className="w-full max-w-sm h-full max-h-fit p-6 rounded-xl shadow-lg bg-white flex flex-col hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-300 cursor-pointer "
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4">
        <img
          src={avatar}
          alt={`User ${id} Avatar`}
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-2xl font-semibold text-gray-800">
          {first_name} {last_name}
        </div>
        <div className="text-xl text-gray-600">{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
