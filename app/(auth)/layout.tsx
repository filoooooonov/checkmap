export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 dark:bg-blue-800">
        {children}
      </div>
    );
  }