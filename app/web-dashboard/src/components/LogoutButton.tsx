"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}