import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold">
          AI Code Review
        </Link>
        
        <div className="flex items-center gap-3">
            <Link href="/login">
            <Button variant="ghost">
                Login
                </Button>
                </Link>
            <Link href="/register">
            <Button variant="ghost">
                Get Started
                </Button>
                </Link>

        </div>
        
      </div>
    </nav>
  );
}