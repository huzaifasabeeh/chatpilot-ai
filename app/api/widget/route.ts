import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { origin } = new URL(req.url);

  const script = `
(function () {

  if (document.getElementById("chatpilot-bubble")) return;

  const bubble = document.createElement("div");

  bubble.id = "chatpilot-bubble";
  bubble.innerHTML = "💬";

  bubble.style.position = "fixed";
  bubble.style.bottom = "24px";
  bubble.style.right = "24px";
  bubble.style.width = "64px";
  bubble.style.height = "64px";
  bubble.style.borderRadius = "50%";
  bubble.style.background = "#2563eb";
  bubble.style.color = "#fff";
  bubble.style.display = "flex";
  bubble.style.alignItems = "center";
  bubble.style.justifyContent = "center";
  bubble.style.fontSize = "28px";
  bubble.style.cursor = "pointer";
  bubble.style.boxShadow = "0 12px 35px rgba(0,0,0,.25)";
  bubble.style.zIndex = "999999";

  document.body.appendChild(bubble);

  const iframe = document.createElement("iframe");

  iframe.src = "${origin}/widget";

  iframe.style.position = "fixed";
  iframe.style.bottom = "100px";
  iframe.style.right = "24px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "20px";
  iframe.style.boxShadow = "0 12px 35px rgba(0,0,0,.25)";
  iframe.style.display = "none";
  iframe.style.zIndex = "999999";

  document.body.appendChild(iframe);

  bubble.onclick = function () {
    iframe.style.display =
      iframe.style.display === "none"
        ? "block"
        : "none";
  };

})();
`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}