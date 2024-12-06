import React from "react";
import LoadingIcon from "../components/LoadingIcon";

function LoadingScreen() {
  return (
    <div className="h-full flex items-center justify-center bg-grey">
      <div className="flex flex-col items-center justify-center space-y-4">
        <LoadingIcon />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
