"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
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
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[65vh] min-h-[480px]">
          <div className="absolute inset-0">
            {show.image && (
              <>
                <Image src={show.image} alt={show.name} fill className="object-cover object-top opacity-30" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
              </>
            )}
          </div>
          
          <div className="container mx-auto px-4 h-full relative pt-8">
            <div className="flex gap-8 h-full items-end pb-12">
              <div className="relative w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 flex-shrink-0 hidden md:block">
                {show.image ? (
                  <Image src={show.image} alt={show.name} fill className="object-cover" priority />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <FilmIcon className="h-16 w-16 opacity-30" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {show.genres.slice(0, 3).map(g => (
                    <span key={g} className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-medium text-primary">{g}</span>
                  ))}
                  {show.rating && (
                    <span className="flex items-center gap-1 text-primary font-bold text-lg">
                      <StarIcon className="h-5 w-5 fill-primary" />{show.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">{show.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                  {show.premiered && <span>{show.premiered.split("-")[0]}</span>}
                  {show.network && <span>• {show.network.name}</span>}
                  {show.status && <span>• {show.status}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Mobile Poster */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden md:hidden max-w-xs mx-auto">
                {show.image ? (
                  <Image src={show.image} alt={show.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <FilmIcon className="h-16 w-16 opacity-30" />
                  </div>
                )}
              </div>
              
              {/* Summary */}
              {show.summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
                  <div className="text-muted-foreground leading-relaxed [&_p]:mb-3" dangerouslySetInnerHTML={{ __html: show.summary }} />
                </div>
              )}
              
              {/* Show Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {show.network && (
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <TvIcon className="h-4 w-4" />
                      Network
                    </div>
                    <p className="font-semibold">{show.network.name}</p>
                  </div>
                )}
                {show.schedule?.time && (
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <ClockIcon className="h-4 w-4" />
                      Schedule
                    </div>
                    <p className="font-semibold">{show.schedule.time}</p>
                    <p className="text-sm text-muted-foreground">{show.schedule.days.join(", ")}</p>
                  </div>
                )}
                {show.language && (
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <GlobeIcon className="h-4 w-4" />
                      Language
                    </div>
                    <p className="font-semibold">{show.language}</p>
                  </div>
                )}
                {show.status && (
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <CircleIcon className="h-4 w-4" />
                      Status
                    </div>
                    <p className="font-semibold">{show.status}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Track This Show</h3>
                {session ? (
                  <div className="space-y-3">
                    <Button onClick={() => handleAddToWatchlist("watching")} className="w-full gap-2">
                      <PlayIcon className="h-4 w-4" />
                      Start Watching
                    </Button>
                    <Button variant="secondary" onClick={() => handleAddToWatchlist("want_to_watch")} className="w-full gap-2">
                      <BookmarkIcon className="h-4 w-4" />
                      Want to Watch
                    </Button>
                    <Button variant="secondary" onClick={() => handleAddToWatchlist("watched")} className="w-full gap-2">
                      <CheckIcon className="h-4 w-4" />
                      Watched
                    </Button>
                    
                    {lists && lists.length > 0 && (
                      <div className="pt-4 border-t border-border/50">
                        <h4 className="text-sm font-medium mb-3">Add to Favorites</h4>
                        <div className="flex flex-wrap gap-2">
                          {lists.map((list) => (
                            <Button
                              key={list.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddToFavorites(list.id)}
                            >
                              {list.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <a href="/auth/signin">Sign In</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="/auth/signup">Create Account</a>
                    </Button>
                  </div>
                )}
              </div>
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

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
