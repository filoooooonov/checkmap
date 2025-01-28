"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.replace("/dashboard");
      setError(null);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
          <Input id="email" type="email" name="email" placeholder="Email" />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    </form>
  );
}
