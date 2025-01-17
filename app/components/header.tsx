import { Share2, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b p-1">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>
      <h2 className="text-lg font-semibold">Event name</h2>
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Avatar>
          <AvatarFallback>
            <User2 className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
