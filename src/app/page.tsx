"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { ShowCard } from "@/components/show-card";
import { useFeaturedShows, useTrendingShows } from "@/features/shows/hooks";
import { useGenres } from "@/features/shows/hooks";

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

// ─── Genre Categories ────────────────────────────────────────────────────────

const genres = [
  { name: "Drama", icon: DramaIcon },
  { name: "Comedy", icon: ComedyIcon },
  { name: "Action", icon: ActionIcon },
  { name: "Thriller", icon: ThrillerIcon },
  { name: "Sci-Fi", icon: SciFiIcon },
  { name: "Romance", icon: RomanceIcon },
  { name: "Horror", icon: HorrorIcon },
  { name: "Documentary", icon: DocumentaryIcon },
];

function GenreCategories() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Browse by <span className="text-primary">genre</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find your next obsession by category.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {genres.map((g, i) => (
            <Link
              key={i}
              href={`/shows?genre=${encodeURIComponent(g.name)}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-200">
                <g.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium text-sm">{g.name}</span>
            </Link>
          ))}
        </div>
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

function MobileAppCTA() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card border border-border/50 p-10 md:p-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <SparklesIcon className="h-3 w-3" />
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Take Écran with you
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Native iOS and Android apps are on the way. Leave your email to be
              first in line when we launch.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <Button type="button" variant="outline" size="lg">
                Notify Me
              </Button>
            </form>
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
        <GenreCategories />
        <Testimonials />
        <FAQSection />
        <NewsletterSection />
        <MobileAppCTA />
      </main>

      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Écran — Your Personal TV Show Tracker</p>
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
