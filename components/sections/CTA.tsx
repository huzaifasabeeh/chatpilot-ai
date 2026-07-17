import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="rounded-3xl border bg-muted/30 px-8 py-16 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Automate Your Customer Support?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Launch your AI chatbot in minutes. No coding required.
          Train it on your website and documents, then let it
          answer customer questions 24/7.
        </p>

        <div className="mt-8">
          <Button size="lg">
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
}