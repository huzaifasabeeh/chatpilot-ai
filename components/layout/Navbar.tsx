import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <a href="/" className="text-xl font-bold tracking-tight">
          ChatPilot AI
        </a>

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

          <SignedOut>
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
          </SignedOut>


          <SignedIn>
            <UserButton />
          </SignedIn>

        </div>

      </div>
    </header>
  );
}