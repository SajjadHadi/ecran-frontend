"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ShowCard } from "@/components/show-card";
import { useFeaturedShows, useTrendingShows } from "@/features/shows/hooks";

function TrendingShowsList() {
  const { data, isLoading } = useTrendingShows();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] rounded-lg bg-muted" />
            <div className="mt-2 h-4 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.data?.length) {
    return <p className="text-muted-foreground">No trending shows found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.data.slice(0, 6).map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}

function FeaturedShowsList() {
  const { data, isLoading } = useFeaturedShows(12);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] rounded-lg bg-muted" />
            <div className="mt-2 h-4 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return <p className="text-muted-foreground">No featured shows found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Track Your <span className="text-primary">Favorite</span> TV Shows
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Discover new shows, track your watch progress, and build curated favorites lists.
            Your personal TV companion.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shows">
              <Button size="lg" className="gap-2">
                <SearchIcon className="h-4 w-4" />
                Browse Shows
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="gap-2">
                <UserIcon className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingIcon className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Trending Now</h2>
            </div>
            <Link href="/shows" className="text-sm text-primary hover:underline font-medium">
              View all →
            </Link>
          </div>
          <TrendingShowsList />
        </section>

        {/* Featured Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-primary fill-primary" />
              <h2 className="text-2xl font-semibold">Featured</h2>
            </div>
            <Link href="/shows" className="text-sm text-primary hover:underline font-medium">
              View all →
            </Link>
          </div>
          <FeaturedShowsList />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Écran — Your Personal TV Show Tracker</p>
        </div>
      </footer>
    </div>
  );
}

// SVG Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TrendingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
