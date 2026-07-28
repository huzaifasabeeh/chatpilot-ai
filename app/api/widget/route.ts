import { NextResponse } from "next/server";

export async function GET() {
  const script = `
(function () {

if(document.getElementById("chatpilot-launcher")) return;

const button=document.createElement("button");

button.id="chatpilot-launcher";

button.innerHTML="💬";

button.style.position="fixed";
button.style.bottom="20px";
button.style.right="20px";
button.style.width="64px";
button.style.height="64px";
button.style.borderRadius="999px";
button.style.border="none";
button.style.background="#2563eb";
button.style.color="white";
button.style.fontSize="28px";
button.style.cursor="pointer";
button.style.zIndex="999999";
button.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

const iframe=document.createElement("iframe");

iframe.src=window.location.origin+"/widget";

iframe.style.position="fixed";
iframe.style.bottom="95px";
iframe.style.right="20px";
iframe.style.width="380px";
iframe.style.height="650px";
iframe.style.border="none";
iframe.style.borderRadius="20px";
iframe.style.boxShadow="0 10px 40px rgba(0,0,0,.3)";
iframe.style.display="none";
iframe.style.zIndex="999999";

button.onclick = () => {
  iframe.style.display = "block";
  button.style.display = "none";
};

document.body.appendChild(button);
document.body.appendChild(iframe);

window.addEventListener("message", (event) => {

  if (event.data === "close-chatpilot") {

    iframe.style.display = "none";

    button.style.display = "block";

  }

});

})();
`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}