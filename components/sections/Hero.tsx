"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Hero() {
  const { isSignedIn } = useUser();
  
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <span className="rounded-full border px-4 py-1 text-sm font-medium">
        🚀 AI-powered customer support
      </span>

      <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
        Build AI Chatbots
        <br />
        For Any Business
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Train an AI assistant using your website or documents and provide
        instant customer support 24/7.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

  {!isSignedIn ? (
    <Link href="/sign-up">
      <Button size="lg">
        Get Started
      </Button>
    </Link>
  ) : (
    <Link href="/dashboard">
      <Button size="lg">
        Dashboard
      </Button>
    </Link>
  )}

  <Link href="/dashboard">
    <Button variant="outline" size="lg">
      Live Demo
    </Button>
  </Link>

</div>
    </section>
  );
}