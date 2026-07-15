import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight">
        AI Code Review Assistant
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Improve your code with AI-powered reviews, static analysis,
        performance suggestions, and best practices.
      </p>

      <div className="mt-8 flex gap-4">
         <Link href="/login">
        <Button size="lg" >Start Reviewing </Button>
         </Link>
          <Link href="#features">
          <Button variant="outline" size="lg">
          Learn More
        </Button>
         </Link>
      </div>
    </section>
  );
}