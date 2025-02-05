import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { MapBackground } from "@/components/landing-page/MapBackground";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-background relative overflow-hidden px-4 lg:px-0">
      <Header transparent={true} links={true} />
      <main className="h-full flex  flex-col items-center gap-12">
        <div className="flex flex-col justify-center mt-[30vh] md:mt-[40vh]">
          <h1 className="font-mono text-center text-5xl md:text-6xl font-semibold tracking-tighter text-primary dark:text-white mb-12">
            Create Maps with Checkpoints
          </h1>
          <p className="text-lg text-center text-primary_light mb-12 max-w-2xl mx-auto">
            Create custom maps with checkpoints for any purpose. Perfect for
            tourism, students, associations, and personal use.
          </p>
          <Link href="/register" className="z-10 mx-auto mb-2">
            <Button className="bg-primary cursor-pointer text-background hover:bg-primary_light">
              Start Now for Free
            </Button>
          </Link>
          <p className="text-center text-sm">[Social proof]</p>
        </div>

        <MapBackground
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 h-[100%] skew-y-12"
          )}
        />
      </main>
    </div>
  );
}
