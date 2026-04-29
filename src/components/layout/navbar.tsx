"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession, useSignOut } from "@/features/auth/hooks";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, isLoading } = useSession();
  const signOut = useSignOut();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Écran
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/shows" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Browse
          </Link>
          <Link href="/watchlist" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Watchlist
          </Link>
          <Link href="/favorites" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Favorites
          </Link>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              {theme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
          )}

          {!isLoading && (
            <>
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{session.user.displayName}</span>
                  <Button variant="outline" size="sm" onClick={() => signOut.mutate()}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
