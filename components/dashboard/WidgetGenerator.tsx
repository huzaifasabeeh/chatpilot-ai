"use client";

import { useEffect, useState } from "react";
import WidgetPreview from "./WidgetPreview";

export default function WidgetGenerator() {
  const [widgetColor, setWidgetColor] = useState("#2563eb");
  const [widgetPosition, setWidgetPosition] = useState("right");
  const [widgetTitle, setWidgetTitle] = useState("Chat with us");
  const [widgetGreeting, setWidgetGreeting] = useState(
    "Hi 👋 How can I help you today?"
  );

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/widget/settings");

        if (!res.ok) return;

        const data = await res.json();

        setWidgetColor(data.widgetColor);
        setWidgetPosition(data.widgetPosition);
        setWidgetTitle(data.widgetTitle);
        setWidgetGreeting(data.widgetGreeting);
      } catch (err) {
        console.error(err);
      }
    }

    loadSettings();
  }, []);

  async function saveSettings() {
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/widget/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          widgetColor,
          widgetPosition,
          widgetTitle,
          widgetGreeting,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);

    } catch (err) {
      console.error(err);
      alert("Failed to save widget settings.");
    }

    setLoading(false);
  }

const [embedCode, setEmbedCode] = useState("");

useEffect(() => {
  const frame = window.requestAnimationFrame(() => {
    setEmbedCode(`<script src="${window.location.origin}/api/widget"></script>`);
  });
  return () => window.cancelAnimationFrame(frame);
}, []);

  return (
    <div className="space-y-8">

      <div>
        <label className="mb-2 block font-medium">
          Widget Title
        </label>

        <input
          value={widgetTitle}
          onChange={(e) => setWidgetTitle(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Greeting Message
        </label>

        <textarea
          rows={4}
          value={widgetGreeting}
          onChange={(e) => setWidgetGreeting(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Widget Color
        </label>

        <input
          type="color"
          value={widgetColor}
          onChange={(e) => setWidgetColor(e.target.value)}
          className="h-12 w-28"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Position
        </label>

        <select
          value={widgetPosition}
          onChange={(e) => setWidgetPosition(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="right">
            Bottom Right
          </option>

          <option value="left">
            Bottom Left
          </option>
        </select>
      </div>

      <button
        onClick={saveSettings}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>

      {saved && (
        <p className="text-green-600 font-medium">
          ✅ Settings Saved Successfully
        </p>
      )}

      <hr />

      <WidgetPreview
        color={widgetColor}
        title={widgetTitle}
        greeting={widgetGreeting}
        position={widgetPosition}
      />

      <div>
        <h2 className="mb-3 text-xl font-bold">
          Embed Code
        </h2>

        <textarea
          readOnly
          value={embedCode}
          className="h-24 w-full rounded-xl border bg-gray-100 p-4"
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(embedCode);
            alert("Copied!");
          }}
          className="mt-4 rounded-xl bg-black px-6 py-3 text-white"
        >
          Copy Embed Code
        </button>
      </div>

    </div>
  );
}