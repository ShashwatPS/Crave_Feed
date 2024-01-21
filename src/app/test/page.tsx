"use client"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Test() {
    const router = useRouter();
    async function handleSignOut() {
        await signOut();
        // router.push("/");
        window.location.href = '/';
    }

    return (
        <div>
            <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white ring-red-300 transition duration-100 hover:bg-red-600 md:text-base"
            >
                Logout
            </button>
        </div>
    );
}
