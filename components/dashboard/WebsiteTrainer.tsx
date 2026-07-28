"use client";

import { useState } from "react";

export default function WebsiteTrainer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function trainWebsite() {
    if (!url.trim()) {
      alert("Please enter a website URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/train-website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error();
      }

      alert("✅ Website trained successfully!");
      setUrl("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to train website.");
    }

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        🌐 Train from Website
      </h2>

      <p className="mt-2 text-gray-500">
        Paste your website URL and ChatPilot AI will learn from it.
      </p>

      <input
        type="url"
        placeholder="https://yourwebsite.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mt-6 w-full rounded-xl border p-3"
      />

      <button
        onClick={trainWebsite}
        disabled={loading}
        className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {loading ? "Training..." : "Train Website"}
      </button>
    </div>
  );
}