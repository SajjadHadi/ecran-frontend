"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout";
import { ShowCard } from "@/components/shows";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useShows, useGenres } from "@/features/shows/hooks";

function ShowsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const genreParam = searchParams.get("genre") || "";

  const [search, setSearch] = useState(searchQuery);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useShows(search || undefined, selectedGenre || undefined, page);
  const { data: genres } = useGenres();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Shows</h1>
          <p className="text-muted-foreground">Discover your next favorite TV show</p>
        </div>

        {/* Search & Filter */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search shows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <select
            className="h-10 px-3 rounded-md border border-input bg-card text-sm"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres?.data?.map((genre: string) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <Button type="submit" className="gap-2">
            <SearchIcon className="h-4 w-4" />
            Search
          </Button>
        </form>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] rounded-lg bg-muted" />
                <div className="mt-2 h-4 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Error loading shows</p>
            <p className="text-sm text-muted-foreground mt-1">{error?.message || "Please try again"}</p>
          </div>
        ) : data?.data?.length ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {data.pagination?.total || data.data.length} shows found
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.data.map((show: any) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>

            {/* Pagination */}
            {data.pagination && data.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  size="sm"
                  className="gap-1"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {data.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= data.pagination.totalPages}
                  size="sm"
                  className="gap-1"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FilmIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mt-4">No shows found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
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

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
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

export default function ShowsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-10 bg-muted rounded w-64" />
            <div className="grid grid-cols-6 gap-4 mt-8">
              {[...Array(12)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[2/3] rounded-lg bg-muted" />
                  <div className="mt-2 h-4 bg-muted rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    }>
      <ShowsContent />
    </Suspense>
  );
}
