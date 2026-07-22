"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="text-xl font-bold tracking-tight">
          ChatPilot AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">

          {!isSignedIn && (
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
          )}

          {isSignedIn && (
            <UserButton />
          )}

        </div>

      </div>
    </header>
  );
}