export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="rounded-2xl bg-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-600"></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-gray-600"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-gray-600"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}