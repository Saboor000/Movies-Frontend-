import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({ children }) {
  const session = await getServerSession(authOptions);

  // If user is not logged in, redirect to login page
  if (!session) {
    redirect("/login");
  }

  // User is logged in, render children
  return children;
}
