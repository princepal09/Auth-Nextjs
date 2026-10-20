import React from "react";
import { Suspense } from "react";
type UserProfileProps = {
  params: Promise<{ id: string }>;
};

const UserProfile = async ({ params }: UserProfileProps) => {
  const { id } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      {" "}
      <h1 className="text-3xl font-bold text-white">
        {" "}
        Profile Page{" "}
        <span className="rounded-lg  px-4 py-2 text-white shadow-lg">
          {" "}
          {id}{" "}
        </span>{" "}
      </h1>{" "}
    </div>
  );
};
export default UserProfile;
