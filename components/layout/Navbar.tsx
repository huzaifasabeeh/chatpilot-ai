import { Button } from "@/components/ui/button";

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

        <Button>Get Started</Button>
      </div>
    </header>
  );
}