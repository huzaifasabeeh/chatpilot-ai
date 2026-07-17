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
      className={`mb-6 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-5 py-4 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}