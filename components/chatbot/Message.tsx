type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({
  role,
  content,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex items-start gap-3 max-w-[80%]">

        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            AI
          </div>
        )}

        <div
          className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {content}
        </div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            U
          </div>
        )}

      </div>
    </div>
  );
}