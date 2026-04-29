"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout";
import { ShowCard } from "@/components/shows";
import { Button } from "@/components/ui/button";
import { useWatchlist, useUpdateWatchlistItem, useRemoveFromWatchlist } from "@/features/watchlist/hooks";
import { useSession } from "@/features/auth/hooks";

export default function WatchlistPage() {
  const router = useRouter();
  const { data: session, isLoading: sessionLoading } = useSession();
  const { data: watchlist, isLoading } = useWatchlist();
  const updateItem = useUpdateWatchlistItem();
  const removeItem = useRemoveFromWatchlist();

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/auth/signin");
    }
  }, [session, sessionLoading, router]);

  const statusLabels = {
    want_to_watch: "Want to Watch",
    watching: "Watching",
    watched: "Watched",
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const grouped = {
    watching: watchlist?.filter((w) => w.status === "watching") || [],
    want_to_watch: watchlist?.filter((w) => w.status === "want_to_watch") || [],
    watched: watchlist?.filter((w) => w.status === "watched") || [],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        {watchlist?.length === 0 ? (
          <p className="text-muted-foreground">Your watchlist is empty.</p>
        ) : (
          <div className="space-y-8">
            {(["watching", "want_to_watch", "watched"] as const).map((status) =>
              grouped[status].length > 0 ? (
                <section key={status}>
                  <h2 className="text-xl font-semibold mb-4">{statusLabels[status]}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {grouped[status].map((item) => (
                      <div key={item.id} className="relative">
                        <ShowCard show={item.showData} />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {status !== "watched" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                const nextStatus = status === "want_to_watch" ? "watching" : "watched";
                                updateItem.mutate({ showId: item.showId, data: { status: nextStatus } });
                              }}
                            >
                              {status === "want_to_watch" ? "Start" : "Mark Watched"}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeItem.mutate(item.showId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        )}
      </main>
    </div>
  );
}
