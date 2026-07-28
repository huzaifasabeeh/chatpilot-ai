import WidgetGenerator from "@/components/dashboard/WidgetGenerator";

export default function WidgetPage() {
  return (
    <div className="mx-auto max-w-5xl p-8">

      <h1 className="text-4xl font-bold">
        💬 Widget Generator
      </h1>

      <p className="mt-2 text-gray-500">
        Customize your chatbot widget and copy the embed code.
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
        <WidgetGenerator />
      </div>

    </div>
  );
}