"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { ShowCard } from "@/components/shows";
import { useFeaturedShows, useTrendingShows, useShows } from "@/features/shows/hooks";

// ─── Stats Counter ───────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: "50K+", label: "Shows Tracked" },
    { value: "10K+", label: "Active Users" },
    { value: "5K+", label: "Favorites Lists" },
    { value: "4.9", label: "User Rating", suffix: "★" },
  ];

  return (
    <section className="border-y border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ───────────────────────────────────────────────────────────

const features = [
  {
    icon: SearchIcon,
    title: "Discover Shows",
    description: "Search across thousands of TV shows from all networks and streaming platforms.",
  },
  {
    icon: ListIcon,
    title: "Build Watchlists",
    description: "Track what you want to watch, what you're watching, and what you've finished.",
  },
  {
    icon: HeartIcon,
    title: "Curate Favorites",
    description: "Create ranked lists with notes and comments. Your personal recommendations.",
  },
  {
    icon: BellIcon,
    title: "Stay Updated",
    description: "Know when new seasons premiere and never miss a return date.",
  },
  {
    icon: StarIcon,
    title: "Rate & Review",
    description: "Score shows and write reviews to remember your thoughts.",
  },
  {
    icon: GlobeIcon,
    title: "Universal Coverage",
    description: "From indie darlings to mainstream hits — if it exists, it's here.",
  },
];

function FeaturesGrid() {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Everything you need to{" "}
          <span className="text-primary">track your TV</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Powerful tools wrapped in a beautiful, simple interface.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Search for a show",
    description: "Find any TV show from our database of thousands of titles across all networks and streaming platforms.",
  },
  {
    number: "02",
    title: "Track your progress",
    description: "Add shows to your watchlist and track episodes as you go. Mark seasons complete, note your thoughts.",
  },
  {
    number: "03",
    title: "Build your collection",
    description: "Create favorites lists, rank your top picks, and share your personal recommendations.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get started in <span className="text-primary">seconds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No complex setup. No learning curve. Just start tracking.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] right-0 h-px bg-gradient-to-r from-border to-transparent" />
              )}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-2xl mb-6">
                {step.number}
              </div>
              <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Staff Picks ─────────────────────────────────────────────────────────────

function StaffPicks() {
  const { data, isLoading } = useFeaturedShows(8);

  if (isLoading || !data?.length) return null;

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-primary text-sm font-medium mb-2 tracking-wider uppercase">
            Curated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Staff Picks
          </h2>
        </div>
        <Link
          href="/shows"
          className="text-sm text-primary hover:underline font-medium hidden sm:block"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.slice(0, 6).map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Link href="/shows" className="text-sm text-primary hover:underline font-medium">
          View all →
        </Link>
      </div>
    </section>
  );
}

// ─── Genre Carousel ──────────────────────────────────────────────────────────

const carouselGenres = [
  "Drama", "Comedy", "Action", "Thriller", "Sci-Fi", "Romance", "Horror", "Mystery", "Documentary",
];

function GenreRow({ genre }: { genre: string }) {
  const { data, isLoading } = useShows(undefined, genre);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="flex gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-36">
            <div className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
            <div className="mt-2 h-3 bg-muted rounded w-3/4 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const shows = data?.data ?? [];

  return (
    <div className="relative group/row">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-border/50 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-hidden scroll-smooth"
      >
        {shows.slice(0, 12).map((show) => (
          <Link
            key={show.id}
            href={`/shows/${show.id}`}
            className="flex-shrink-0 w-36 md:w-40 transition-transform duration-200 hover:scale-105 hover:z-10"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
              {show.image ? (
                <Image
                  src={show.image}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FilmIcon className="h-8 w-8 opacity-30" />
                </div>
              )}
              {show.rating && (
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                  <StarIcon className="h-3 w-3 text-primary fill-primary" />
                  {show.rating.toFixed(1)}
                </div>
              )}
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm line-clamp-1">{show.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {show.genres[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-border/50 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none`}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function GenreCarousel() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Browse by <span className="text-primary">genre</span>
          </h2>
        </div>
      </div>

      <div className="space-y-10">
        {carouselGenres.map((genre) => (
          <div key={genre} className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{genre}</h3>
              <Link
                href={`/shows?genre=${encodeURIComponent(genre)}`}
                className="text-sm text-primary hover:underline font-medium"
              >
                View all →
              </Link>
            </div>
            <GenreRow genre={genre} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "Finally a tracker that gets it right. The interface is gorgeous and I actually enjoy logging what I watch.",
    name: "Alex Chen",
    handle: "@alexc",
  },
  {
    quote:
      "I've tried every show tracker out there. Écran is the only one that feels made for actual TV fans.",
    name: "Maria Santos",
    handle: "@mariasantos",
  },
  {
    quote:
      "The staff picks alone have introduced me to five new shows I now love. Great curation.",
    name: "James Wright",
    handle: "@jwright",
  },
];

function Testimonials() {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Loved by <span className="text-primary">TV fans</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Join thousands of users who track their TV life with Écran.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-card border border-border/50"
          >
            <QuoteIcon className="h-8 w-8 text-primary/40 mb-4" />
            <p className="text-foreground leading-relaxed mb-6 italic">
              "{t.quote}"
            </p>
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.handle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "Is Écran free to use?",
    answer:
      "Yes! Écran has a generous free tier that covers everything most users need. We offer optional Pro features for power users who want advanced statistics and export options.",
  },
  {
    question: "Where does the show data come from?",
    answer:
      "We use the TVMaze API, one of the most comprehensive and up-to-date TV show databases available — covering network TV, cable, and every major streaming platform.",
  },
  {
    question: "Can I use Écran on my phone?",
    answer:
      "The web app is fully responsive and works great on mobile browsers. A native iOS and Android app is coming soon.",
  },
  {
    question: "Can I import my watch history from other trackers?",
    answer:
      "Yes! We support importing from several popular tracking services. Check your profile settings to get started.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. Your watch history, lists, and preferences are private by default. You choose what to share publicly.",
  },
];

function FAQSection() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently asked <span className="text-primary">questions</span>
          </h2>
        </div>
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 p-10 md:p-16 text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 hero-gradient opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-card via-card to-transparent" />

        <div className="relative z-10">
          <MailIcon className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Stay in the loop
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Get notified about new features, show recommendations, and everything
            Écran. No spam, just TV.
          </p>
          {submitted ? (
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <CheckIcon className="h-5 w-5" />
              You're on the list!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Mobile App CTA ────────────────────────────────────────────────────────────

const mobileFeatures = [
  {
    icon: WifiIcon,
    label: "Offline Sync",
    description: "Take your watchlist offline",
  },
  {
    icon: BellIcon,
    label: "Push Alerts",
    description: "Never miss a premiere",
  },
  {
    icon: WidgetIcon,
    label: "Home Widgets",
    description: "Track at a glance",
  },
];

function MobileAppCTA() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Feature callouts */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <SparklesIcon className="h-3 w-3" />
              Coming 2025
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Écran in your
              <br />
              <span className="text-primary">pocket</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto lg:mx-0">
              The full Écran experience, anywhere you go. Your watchlist, favorites,
              and recommendations — always within reach.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              {mobileFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* App store badges */}
            <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/50 text-muted-foreground text-xs font-medium opacity-60 cursor-not-allowed">
                <AppleIcon className="h-5 w-5" />
                App Store
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/50 text-muted-foreground text-xs font-medium opacity-60 cursor-not-allowed">
                <GooglePlayIcon className="h-5 w-5" />
                Google Play
              </div>
            </div>
          </div>

          {/* Right: Animated phone mockup */}
          <div className="relative flex-shrink-0">
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />

            {/* Phone frame */}
            <div className="relative animate-float-slow">
              <div className="w-64 h-[520px] rounded-[3rem] bg-card border-2 border-border shadow-2xl shadow-primary/20 overflow-hidden">
                {/* Status bar */}
                <div className="h-12 bg-card border-b border-border/50 flex items-center justify-center">
                  <div className="w-20 h-6 rounded-full bg-foreground/10" />
                </div>
                {/* App content preview */}
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between px-2">
                    <div className="text-xs font-bold">Écran</div>
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                  </div>
                  {/* Show row */}
                  <div className="flex gap-3 px-2 py-2">
                    <div className="w-14 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10" />
                    </div>
                    <div className="flex-1 py-1 space-y-2">
                      <div className="h-3 bg-foreground/10 rounded w-3/4" />
                      <div className="h-2 bg-foreground/5 rounded w-1/2" />
                      <div className="h-2 bg-foreground/5 rounded w-2/3" />
                    </div>
                  </div>
                  {/* Show row */}
                  <div className="flex gap-3 px-2 py-2">
                    <div className="w-14 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-purple-500/10" />
                    </div>
                    <div className="flex-1 py-1 space-y-2">
                      <div className="h-3 bg-foreground/10 rounded w-2/3" />
                      <div className="h-2 bg-foreground/5 rounded w-1/3" />
                      <div className="h-2 bg-foreground/5 rounded w-1/2" />
                    </div>
                  </div>
                  {/* Show row */}
                  <div className="flex gap-3 px-2 py-2">
                    <div className="w-14 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-blue-500/10" />
                    </div>
                    <div className="flex-1 py-1 space-y-2">
                      <div className="h-3 bg-foreground/10 rounded w-4/5" />
                      <div className="h-2 bg-foreground/5 rounded w-1/2" />
                      <div className="h-2 bg-foreground/5 rounded w-3/4" />
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="absolute bottom-4 left-4 right-4 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-around">
                    <div className="w-4 h-4 rounded-sm bg-primary/40" />
                    <div className="w-4 h-4 rounded-sm bg-foreground/10" />
                    <div className="w-4 h-4 rounded-sm bg-foreground/10" />
                    <div className="w-4 h-4 rounded-sm bg-foreground/10" />
                  </div>
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="absolute -top-4 -right-8 px-3 py-1.5 rounded-full bg-card border border-border/50 shadow-lg animate-float-delayed text-xs font-medium">
                <span className="text-primary">●</span> Live sync
              </div>
              <div className="absolute -bottom-2 -left-10 px-3 py-1.5 rounded-full bg-card border border-border/50 shadow-lg animate-float text-xs font-medium">
                <span className="text-primary">★</span> Staff picks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Logo Strip ───────────────────────────────────────────────────────────────

const platforms = [
  "Netflix", "HBO", "Disney+", "Amazon Prime", "Hulu", "Apple TV+",
];

function LogoStrip() {
  return (
    <section className="py-16 container mx-auto px-4">
      <p className="text-center text-sm text-muted-foreground mb-8 tracking-widest uppercase">
        Shows from every platform
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {platforms.map((p, i) => (
          <span
            key={i}
            className="text-muted-foreground/50 font-semibold text-base md:text-lg tracking-tight hover:text-foreground transition-colors"
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function FloatingPosterCard({
  show,
  className,
}: {
  show: { id: number; name: string; image: string | null };
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 ${className}`}
    >
      <div className="relative w-32 h-44 md:w-40 md:h-56 bg-muted">
        {show.image ? (
          <Image
            src={show.image}
            alt={show.name}
            fill
            className="object-cover"
          />
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
        <FloatingPosterCard
          key={show.id}
          show={show}
          className={positions[i]}
        />
      ))}
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <HeroShowPosters />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,var(--color-background)_80%)]" />

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <div className="backdrop-blur-md bg-card/40 border border-border/50 rounded-3xl p-10 md:p-16 shadow-2xl shadow-primary/10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <SparklesIcon className="h-4 w-4" />
            Your personal TV companion
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            <span className="text-foreground">Track Your </span>
            <span className="text-primary relative">
              Favorite
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </span>
            <br />
            <span className="text-foreground">TV Shows</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
            Discover new shows, track your watch progress, and build curated
            favorites lists. Everything you watch, in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Link href="/shows">
              <Button size="lg" className="gap-2 text-base px-8">
                <SearchIcon className="h-4 w-4" />
                Browse Shows
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-base px-8 backdrop-blur-sm bg-background/50"
              >
                <UserIcon className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce animate-delay-500">
          <ChevronDownIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <LogoStrip />
        <FeaturesGrid />
        <HowItWorks />
        <StaffPicks />
        <GenreCarousel />
        <Testimonials />
        <FAQSection />
        <NewsletterSection />
        <MobileAppCTA />
      </main>

      <footer className="border-t border-border/50 py-16 mt-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <p className="text-2xl font-bold tracking-tight mb-3">Écran</p>
              <p className="text-sm text-muted-foreground">Track your favorite TV shows, build watchlists, and discover new content.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Discover</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/shows" className="hover:text-primary transition-colors">Browse Shows</a></li>
                <li><a href="/shows?genre=Drama" className="hover:text-primary transition-colors">Drama</a></li>
                <li><a href="/shows?genre=Comedy" className="hover:text-primary transition-colors">Comedy</a></li>
                <li><a href="/shows?genre=Action" className="hover:text-primary transition-colors">Action</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Your Library</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/watchlist" className="hover:text-primary transition-colors">Watchlist</a></li>
                <li><a href="/favorites" className="hover:text-primary transition-colors">Favorites</a></li>
                <li><a href="/auth/signin" className="hover:text-primary transition-colors">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Écran. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TrendingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FilmIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.69-1.327-.817-.55-.124-1.07-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l-.007.004z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Genre icons
function DramaIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ComedyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function ActionIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ThrillerIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SciFiIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function RomanceIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HorrorIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31A5.95 5.95 0 0 1 12 20zm6.31-3.1L7.1 5.69A5.95 5.95 0 0 1 12 4c1.65 0 3.15.66 4.25 1.73l1.06 1.17z" />
      <path d="M12 7v2m0 4v.01" />
    </svg>
  );
}

function DocumentaryIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}

function WidgetIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34-.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31-.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
    </svg>
  );
}
