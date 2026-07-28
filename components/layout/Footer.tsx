import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">

        <p>© 2026 ChatPilot AI. All rights reserved.</p>

        <div className="flex gap-6">

          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>

          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>

          <a href="mailto:support@chatpilot.ai" className="hover:text-foreground">
            Contact
          </a>

        </div>

      </div>
    </footer>
  );
}