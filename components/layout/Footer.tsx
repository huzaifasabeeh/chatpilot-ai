export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>© 2026 ChatPilot AI. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>

          <a href="#" className="hover:text-foreground">
            Terms
          </a>

          <a href="#" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}