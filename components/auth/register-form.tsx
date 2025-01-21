"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link'

export function RegisterForm() {
  return (
    <form action="registerUser">
      <div className="p-1 space-y-8">
        <div className="flex flex-col space-y-5 items-center justify-center gap-15">
          <h2 className="text-6xl font-bold text-center">Register</h2>
          <h3 className="text-2xl">If you already have an account login <Link href="/login">here</Link></h3>
        </div>
        <div className="space-y-2">
          <Input id="email" placeholder="Email" />
        </div>
        <div className="space-y-2">
          <Input id="name" placeholder="Username" />
        </div>
        <div className="space-y-2">
          <Input id="password" placeholder="Password" />
        </div>
        <div className="space-y-2">
          <Input id="confirm_password" placeholder="Confirm Password"/>
        </div>
        <div className="flex justify-center">
          <Button type = "submit" className="text-lg w-204">Register</Button>
        </div>
      </div>
    </form>
  );
}