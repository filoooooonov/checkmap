import Logo from "@/components/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-3 left-4 text-xl font-bold">
        <Logo />
      </div>
      {children}
    </div>
  );
}
