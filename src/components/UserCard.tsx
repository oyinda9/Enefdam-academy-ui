import React from "react";
import { Expand } from "lucide-react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-blue-400 even:bg-red-500 p-4 min-w-[230px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-500">
          2024/2025
        </span>
        <Expand className="cursor-pointer text-white" />
      </div>
      <h1 className="text-2xl text-white mt-2">12,3444</h1>
      <h2 className="capitalize text-sm font-medium">{type}s</h2>
    </div>
  );
};

export default UserCard;
