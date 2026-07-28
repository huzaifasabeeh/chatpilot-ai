"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgeForm() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [knowledge, setKnowledge] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function saveKnowledge() {
    setError("");
    setSuccess("");

    if (!businessName.trim() || !knowledge.trim()) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          knowledge,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setSuccess("✅ Knowledge saved successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-600 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
          {success}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Business Name
        </label>

        <input
          className="w-full rounded-xl border border-input bg-background p-3 outline-none focus:border-blue-500"
          placeholder="ABC Dental Clinic"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Business Information
        </label>

        <textarea
          className="h-72 w-full rounded-xl border border-input bg-background p-3 outline-none focus:border-blue-500"
          placeholder="Describe your business, products, pricing, opening hours, policies, FAQs..."
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
        />
      </div>

      <button
        onClick={saveKnowledge}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Knowledge"}
      </button>

    </div>
  );
}