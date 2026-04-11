"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShow } from "@/features/shows/hooks";
import { useAddToWatchlist } from "@/features/watchlist/hooks";
import { useAddFavoriteItem, useFavoriteLists } from "@/features/favorites/hooks";
import { useSession } from "@/features/auth/hooks";

export default function ShowDetailPage() {
  const params = useParams();
  const showId = Number(params.id);
  const { data: show, isLoading } = useShow(showId);
  const { data: session } = useSession();
  const addToWatchlist = useAddToWatchlist();
  const addFavoriteItem = useAddFavoriteItem();
  const { data: lists } = useFavoriteLists();

  const handleAddToWatchlist = (status: "want_to_watch" | "watching" | "watched") => {
    if (!show) return;
    addToWatchlist.mutate({ showId: String(showId), showData: show, status });
  };

  const handleAddToFavorites = (listId: string) => {
    if (!show) return;
    addFavoriteItem.mutate({ listId, showId: String(showId), showData: show });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-muted rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <p className="text-muted-foreground">Show not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Poster */}
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted shadow-2xl shadow-primary/5">
            {show.image ? (
              <Image src={show.image} alt={show.name} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                <FilmIcon className="h-16 w-16 opacity-30" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title & Meta */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{show.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                {show.rating && (
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <StarIcon className="h-4 w-4 fill-primary" />
                    {show.rating.toFixed(1)}
                  </span>
                )}
                {show.premiered && (
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {show.premiered.split("-")[0]}
                  </span>
                )}
                {show.genres.slice(0, 3).map((g) => (
                  <span key={g} className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            {show.summary && (
              <div
                className="text-muted-foreground leading-relaxed [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            )}

            {/* Actions for authenticated users */}
            {session && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => handleAddToWatchlist("watching")} size="sm" className="gap-2">
                    <PlayIcon className="h-4 w-4" />
                    Watching
                  </Button>
                  <Button variant="secondary" onClick={() => handleAddToWatchlist("want_to_watch")} size="sm" className="gap-2">
                    <BookmarkIcon className="h-4 w-4" />
                    Want to Watch
                  </Button>
                  <Button variant="secondary" onClick={() => handleAddToWatchlist("watched")} size="sm" className="gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Watched
                  </Button>
                </div>

                {lists && lists.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Add to Favorites</h4>
                    <div className="flex flex-wrap gap-2">
                      {lists.map((list) => (
                        <Button
                          key={list.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToFavorites(list.id)}
                          className="text-xs"
                        >
                          {list.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {show.network && (
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TvIcon className="h-4 w-4" />
                      Network
                    </div>
                    <p className="font-semibold">{show.network.name}</p>
                  </CardContent>
                </Card>
              )}
              {show.schedule?.time && (
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <ClockIcon className="h-4 w-4" />
                      Schedule
                    </div>
                    <p className="font-semibold">
                      {show.schedule.time} on {show.schedule.days.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// SVG Icons
function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function FilmIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TvIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
