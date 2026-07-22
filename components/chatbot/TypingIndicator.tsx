export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-100 rounded-2xl px-5 py-3 flex items-center gap-1">
        <span className="text-gray-500">AI</span>

        <span className="animate-bounce">
          .
        </span>

        <span className="animate-bounce delay-150">
          .
        </span>

        <span className="animate-bounce delay-300">
          .
        </span>
      </div>
    </div>
  );
}