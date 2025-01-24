"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
  return (
    <form action="loginUser" className="">
      <div className="p-1 space-y-8">
        <div className="flex flex-col space-y-5 items-center justify-center gap-15">
          <h2 className="text-4xl font-bold text-center">Login</h2>
          <h3 className="text-neutral-800 text-sm">
            Don't have an account? Register{" "}
            <Link href="/register" className="font-bold">
              here
            </Link>
          </h3>
        </div>
        <div className="space-y-2">
          <Input id="id" type="email" placeholder="Email" />
        </div>
        <div className="space-y-2">
          <Input id="password" type="password" placeholder="Password" />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}
