"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ShowCard } from "@/components/show-card";
import { useFeaturedShows, useTrendingShows } from "@/features/shows/hooks";

function FloatingPosterCard({ show, className }: { show: { id: number; name: string; image: string | null }; className?: string }) {
  return (
    <div className={`absolute rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 ${className}`}>
      <div className="relative w-32 h-44 md:w-40 md:h-56 bg-muted">
        {show.image ? (
          <Image src={show.image} alt={show.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FilmIcon className="h-10 w-10 opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function HeroShowPosters() {
  const { data } = useTrendingShows();
  const shows = data?.data?.slice(0, 4) ?? [];

  if (!shows.length) return null;

  const positions = [
    "top-20 left-[5%] animate-float",
    "top-32 right-[8%] animate-float-delayed",
    "bottom-40 left-[12%] animate-float-slow",
    "bottom-28 right-[5%] animate-float",
  ];

  return (
    <>
      {shows.map((show, i) => (
        <FloatingPosterCard key={show.id} show={show} className={positions[i]} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 hero-gradient" />

          {/* Floating show posters */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <HeroShowPosters />
          </div>

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,var(--color-background)_80%)]" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
            {/* Glassmorphism container */}
            <div className="backdrop-blur-md bg-card/40 border border-border/50 rounded-3xl p-10 md:p-16 shadow-2xl shadow-primary/10 max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
                <SparklesIcon className="h-4 w-4" />
                Your personal TV companion
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animate-delay-100">
                <span className="text-foreground">Track Your </span>
                <span className="text-primary relative">
                  Favorite
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </span>
                <br />
                <span className="text-foreground">TV Shows</span>
              </h1>

              {/* Subtitle */}
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
                Discover new shows, track your watch progress, and build curated favorites lists.
                Everything you watch, in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
                <Link href="/shows">
                  <Button size="lg" className="gap-2 text-base px-8">
                    <SearchIcon className="h-4 w-4" />
                    Browse Shows
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" size="lg" className="gap-2 text-base px-8 backdrop-blur-sm bg-background/50">
                    <UserIcon className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce animate-delay-500">
              <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Content sections after hero */}
        <div className="container mx-auto py-12 px-4">
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
        </div>
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

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
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
