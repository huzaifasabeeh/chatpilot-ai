"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          ChatPilot AI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!isSignedIn ? (
            <>
              <Link href="/sign-in">
                <Button variant="outline">
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button>
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
            </>
          )}

        </div>

      </div>
    </header>
  );
}