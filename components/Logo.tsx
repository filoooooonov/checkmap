import Link from "next/link";
import React from "react";
import logo from "@/public/icon.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" className="size-8" />
        <h1 className="text-xl font-bold text-black">Checkmap</h1>
      </Link>
    </div>
  );
}
