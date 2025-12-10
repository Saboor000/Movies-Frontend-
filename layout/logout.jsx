import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <div>
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
}
