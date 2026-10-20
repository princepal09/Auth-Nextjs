"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState<any>("");

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (err: any) {}
  };

  
  return (
    <div className="flex min-h-screen flex-col gap-3 items-center justify-center bg-gray-950 px-4 py-12">
      <h1>Profile Page</h1>
      <hr />
      <Link href={`/profile/${data}`
      } className="text-blue-500 hover:underline">
        {data ? `User ID: ${data}` : "Click to get user details"}
      </Link>

      <button
        disabled={loading}
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        disabled={loading}
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
