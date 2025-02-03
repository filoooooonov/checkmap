"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getUserData } from "@/actions/getUserData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex  overflow-hidden rounded-full", className)}
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
  const [base64Image, setBase64Image] = useState<string>("");
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
  useEffect(() => {
    if (session?.user?.id) {
      const storedImage = localStorage.getItem("profileImgData");
      if (storedImage) {
        setBase64Image(storedImage);
      } else {
        getUserData(session.user.id).then((userData) => {
          setBase64Image(userData?.profilePicture || "");
          localStorage.setItem(
            "profileImgData",
            userData?.profilePicture || ""
          );
        });
      }
    }
  }, [session]);
  return (
    <div className="relative flex">
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className="cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={localStorage.getItem("profileImgData") || base64Image}
                  alt="User Avatar"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User2 className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link
                href="/dashboard"
                className="flex items-center p-4 rounded-md duration-300"
              >
                <Avatar className="size-8 cursor-pointer ">
                  <AvatarImage
                    src={localStorage.getItem("profileImgData") || base64Image}
                    className="size-8 rounded-full object-cover"
                    alt="User"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-sm font-bold">{session.user.name}</h2>
                  <p className="text-neutral-500 text-sm">
                    {session.user.email}
                  </p>
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session && (
              <>
                <DropdownMenuItem>
                  <Link
                    href="\dashboard"
                    className="w-full py-2 px-4 text-left block font-medium text-black rounded-md cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full py-2 px-4 text-left block font-medium text-black rounded-md cursor-pointer"
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarWithDropdown };
