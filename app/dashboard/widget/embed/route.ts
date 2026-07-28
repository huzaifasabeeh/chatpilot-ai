import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const user = searchParams.get("user");

  const script = `
(function(){

if(document.getElementById("chatpilot-widget")) return;

const bubble=document.createElement("div");

bubble.id="chatpilot-widget";

bubble.innerHTML="💬";

bubble.style.position="fixed";
bubble.style.bottom="24px";
bubble.style.right="24px";
bubble.style.width="65px";
bubble.style.height="65px";
bubble.style.borderRadius="50%";
bubble.style.background="#2563eb";
bubble.style.color="white";
bubble.style.display="flex";
bubble.style.alignItems="center";
bubble.style.justifyContent="center";
bubble.style.cursor="pointer";
bubble.style.fontSize="30px";
bubble.style.boxShadow="0 15px 40px rgba(0,0,0,.25)";
bubble.style.zIndex="999999";

document.body.appendChild(bubble);

const frame=document.createElement("iframe");

frame.src="${origin}/widget?user=${user}";

frame.style.position="fixed";
frame.style.bottom="100px";
frame.style.right="24px";
frame.style.width="380px";
frame.style.height="600px";
frame.style.border="none";
frame.style.borderRadius="20px";
frame.style.display="none";
frame.style.zIndex="999999";

document.body.appendChild(frame);

bubble.onclick=function(){

frame.style.display=
frame.style.display==="none"
?"block"
:"none";

};

})();
`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}