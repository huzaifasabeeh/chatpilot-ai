import {
  Bot,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI Chatbot",
      description:
        "Train your AI assistant on your business data in minutes.",
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description:
        "Upload PDFs, documents, and website content to teach your AI.",
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description:
        "Provide instant customer support anytime without hiring agents.",
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          Everything You Need
        </h2>

        <p className="mt-4 text-muted-foreground">
          Powerful tools to launch your AI customer support.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-xl border p-6 transition-shadow hover:shadow-lg"
            >
              <Icon className="mb-4 h-10 w-10" />

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}