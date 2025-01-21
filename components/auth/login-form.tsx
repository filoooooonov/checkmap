"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'

export function LoginForm() {
  return (
    <form action="loginUser">
      <div className="p-1 space-y-8">
        <div className="flex flex-col space-y-5 items-center justify-center gap-15">
          <h2 className="text-6xl font-bold text-center">Login</h2>
          <h3 className="text-2xl">If you don't have an account register <Link href="/register">here</Link></h3>
        </div>
        <div className="space-y-2">
          <Input id="id" placeholder="Email or Username" />
        </div>
        <div className="space-y-2">
          <Input id="password" placeholder="Password" />
        </div>
        <div className="flex justify-center">
          <Button type = "submit" className="text-lg w-204">Login</Button>
        </div>
      </div>
    </form>
  );
}