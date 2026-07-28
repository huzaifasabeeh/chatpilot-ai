"use client";

type Props = {
  color: string;
  title: string;
  greeting: string;
  position: string;
};

export default function WidgetPreview({
  color,
  title,
  greeting,
  position,
}: Props) {
  return (
    <div className="mt-10">

      <h2 className="mb-4 text-xl font-bold">
        Live Preview
      </h2>

      <div className="relative h-[420px] rounded-2xl border bg-gray-100 overflow-hidden">

        {/* Chat Window */}

        <div
          className={`absolute bottom-24 ${
            position === "left" ? "left-6" : "right-6"
          } w-80 rounded-2xl bg-white shadow-xl border`}
        >

          <div
            className="rounded-t-2xl p-4 text-white"
            style={{ background: color }}
          >
            <h3 className="font-semibold">
              {title}
            </h3>
          </div>

          <div className="p-5">

            <div className="rounded-xl bg-gray-100 p-3">
              {greeting}
            </div>

          </div>

        </div>

        {/* Bubble */}

        <button
          className={`absolute bottom-6 ${
            position === "left" ? "left-6" : "right-6"
          } flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white shadow-xl`}
          style={{
            background: color,
          }}
        >
          💬
        </button>

      </div>

    </div>
  );
}