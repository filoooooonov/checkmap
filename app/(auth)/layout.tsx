import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="absolute top-3 left-8 text-xl font-bold">
        Checkmap
      </Link>
      {children}
    </div>
  );
}
