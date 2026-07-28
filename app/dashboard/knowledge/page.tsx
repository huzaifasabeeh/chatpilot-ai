import KnowledgeForm from "@/components/dashboard/KnowledgeForm";
import WebsiteTrainer from "@/components/dashboard/WebsiteTrainer";

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold">
            📚 Knowledge Base
          </h1>

          <p className="mt-2 text-gray-500">
            Train your AI using your business information,
            website and documents.
          </p>
        </div>

        <WebsiteTrainer />

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <KnowledgeForm />
        </div>

      </div>
    </div>
  );
}