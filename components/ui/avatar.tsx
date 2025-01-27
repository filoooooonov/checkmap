"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const AvatarWithDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Avatar>
          <AvatarImage src="/path-to-image.jpg" alt="User Avatar" />
          <AvatarFallback>
            <User2 className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-0 right-0 z-[1000] p-1 mt-10 w-48 bg-white border-2 border-neutral-100 rounded-lg shadow-lg"
        >
          {session && (
            <>
              <Link
                href="\dashboard"
                className="block px-4 py-2 hover:bg-gray-100 duration-300 font-medium text-sm rounded-md cursor-pointer"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100 duration-300 font-medium text-sm rounded-md cursor-pointer"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarWithDropdown };
