import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock3,
  Compass,
  ExternalLink,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type Language = 'en' | 'te';

const menuItems = [
  {
    id: 'biryani',
    category: 'From the kitchen',
    name: 'Nellore-style mutton biryani',
    telugu: 'నెల్లూరు స్టైల్ మటన్ బిర్యానీ',
    description: 'Long-grain rice, tender mutton, fried onions and a deep, slow-cooked masala.',
    price: '₹320',
    image: '/images/hero-thali.jpg',
  },
  {
    id: 'gongura',
    category: 'Andhra signatures',
    name: 'Gongura mutton',
    telugu: 'గోంగూర మటన్',
    description: 'A bright, earthy gongura leaf curry with the gentle heat Andhra is known for.',
    price: '₹340',
    image: '/images/gongura-mutton.jpg',
  },
  {
    id: 'dosa',
    category: 'All-day favourites',
    name: 'Ghee roast dosa',
    telugu: 'నెయ్యి రోస్ట్ దోస',
    description: 'A delicately crisp fold, served with coconut chutney and a warm bowl of sambar.',
    price: '₹150',
    image: '/images/dosa-table.jpg',
  },
];

const navItems = [
  { href: '#story', label: 'Our story' },
  { href: '#menu', label: 'Menu' },
  { href: '#visit', label: 'Visit us' },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [activeDish, setActiveDish] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Nakshatra Grand | నక్షత్ర గ్రాండ్ రెస్టారెంట్';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      'content',
      'A warm, polished Andhra dining room in Seetharampuram. Dine in for generous biryanis, regional favourites and an evening worth dressing up for.',
    );
  }, []);

  const copy = {
    reserve: language === 'te' ? 'టేబుల్ రిజర్వ్ చేయండి' : 'Reserve a table',
    explore: language === 'te' ? 'మెనూను చూడండి' : 'Explore the menu',
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
    setSubmitted(false);
  };

  return (
    <main className="site-shell min-h-[100dvh]">
      <div className="fixed right-3 top-20 z-50 rounded-sm border border-[#d2b276]/60 bg-[#251d1a]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d2b276] shadow-lg backdrop-blur-sm">
      DEMO • CLIENT PREVIEW
    </div>
      <header className="nav-shell fixed inset-x-0 top-0 z-40 border-b border-white/10 text-[#f1e9dc]">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="group flex items-center gap-3"
            data-testid="link-home"
            aria-label="Nakshatra Grand home"
          >
            <span className="ornament grid h-10 w-10 place-items-center rounded-full border border-[#b28b4c]/60 text-[#d2b276]">
              <span className="font-display text-lg">N</span>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[17px] tracking-[0.13em] text-[#f1e9dc]">NAKSHATRA</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.32em] text-[#b28b4c]">GRAND RESTAURANT</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c7bfb2] transition-colors hover:text-[#d2b276]"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setLanguage((current) => (current === 'en' ? 'te' : 'en'))}
              className="border-l border-white/20 pl-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d2b276]"
              data-testid="button-language-toggle"
              aria-label="Switch language"
            >
              {language === 'en' ? 'తెలుగు' : 'English'}
            </button>
            <button
              type="button"
              onClick={() => setIsReservationOpen(true)}
              className="border border-[#b28b4c]/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f1e9dc] transition-colors hover:bg-[#b28b4c] hover:text-[#251d1a]"
              data-testid="button-reserve-header"
            >
              {copy.reserve}
            </button>
          </nav>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-white/20 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X size={19} /> : <MenuIcon size={19} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t border-white/10 bg-[#1e1917] px-5 pb-6 pt-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9d0c0]"
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLanguage((current) => (current === 'en' ? 'te' : 'en'))}
                className="border-b border-white/10 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#d2b276]"
                data-testid="button-mobile-language"
              >
                {language === 'en' ? 'తెలుగు' : 'English'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="mt-4 bg-[#b28b4c] px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#251d1a]"
                data-testid="button-mobile-reserve"
              >
                {copy.reserve}
              </button>
            </nav>
          </div>
        )}
      </header>

     <section
  id="top"
  className="hero-noise relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#251d1a] pt-[76px] text-[#f1e9dc] sm:min-h-[790px]"
>
  {/* HERO IMAGE */}
  <img
    src="/images/hero-thali.jpg"
    alt="A generous Indian thali and biryani set for an evening meal"
    className="hero-image absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-65"
    data-testid="img-hero-food"
  />

  {/* HERO OVERLAY */}
  <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(30,25,23,.96)_0%,rgba(30,25,23,.7)_38%,rgba(30,25,23,.18)_80%),linear-gradient(0deg,rgba(30,25,23,.96),transparent_50%)]" />

  {/* DECORATIVE GLOW */}
  <div className="absolute right-[-120px] top-[120px] -z-10 h-[360px] w-[360px] rounded-full border border-[#d2b276]/20" />
  <div className="absolute right-[-40px] top-[200px] -z-10 h-[220px] w-[220px] rounded-full border border-[#d2b276]/10" />

  {/* HERO CONTENT */}
  <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
    <div className="max-w-[760px]">

      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#d2b276]">
        Welcome to Nakshatra Grand
      </p>

      <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
        Where every meal
        <br />
        <em className="text-[#d2b276]">
          becomes a memory.
        </em>
      </h1>

      <p className="mt-7 max-w-[600px] text-sm leading-7 text-[#d8cfc2] sm:text-base">
        Experience rich Indian flavours, warm hospitality and an elegant
        dining atmosphere at Nakshatra Grand Restaurant.
      </p>

      {/* BUTTONS */}
      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() => setIsReservationOpen(true)}
          className="border border-[#b28b4c] bg-[#b28b4c] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#251d1a] transition hover:bg-[#d2b276]"
        >
          Reserve a Table
        </button>

        <a
          href="#menu"
          className="border border-[#f1e9dc]/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#f1e9dc] transition hover:border-[#d2b276] hover:text-[#d2b276]"
        >
          Explore Menu
        </a>

      </div>

      {/* RESTAURANT INFO */}
      <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[#c9bfb1]">
        <span>★ 4.1 / 5</span>
        <span>49 Reviews</span>
        <span>₹200–₹400 per person</span>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-[#a99d8e]">
        Narsapur, Seetharamapuram, Andhra Pradesh
      </p>

    </div>
  </div>
</section>


{/* SEPARATE VIDEO SECTION — IDI KOTTHADI */}
<section className="bg-[#251d1a] px-5 py-16 text-[#f1e9dc] sm:px-8 sm:py-24 lg:px-12">
  <div className="mx-auto max-w-[1200px]">

    <div className="mb-8 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d2b276]">
        Experience Nakshatra Grand
      </p>

      <h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
        A glimpse of <em className="text-[#d2b276]">our world.</em>
      </h2>
    </div>

    <div className="overflow-hidden border border-[#b28b4c]/60 shadow-2xl">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="block h-auto w-full object-cover"
      >
        <source
          src="/Nakshatra-Grand-Dining-Sep-26-11-46-40 (1).mp4"
          type="video/mp4"
        />
      </video>
    </div>

  </div>
</section>

      <section id="story" className="relative overflow-hidden bg-[#f1e9dc] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-24">
          <div>
            <p className="star-rule mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8d6b3e]">A little more than dinner</p>
            <h2 className="max-w-[510px] font-display text-5xl leading-[.98] tracking-[-0.045em] text-[#251d1a] sm:text-6xl" data-testid="heading-story">
              A room made for <em className="text-[#7f2639]">lingering.</em>
            </h2>
            <p className="mt-7 font-telugu text-xl leading-9 text-[#7f2639]" lang="te" data-testid="text-story-telugu">
              ఇక్కడ భోజనం ఒక అనుభవం
            </p>
          </div>
          <div className="max-w-[600px] border-l border-[#b28b4c] pl-7 sm:pl-10">
            <p className="text-lg leading-8 text-[#5d5148]">
              Nakshatra Grand is a warm invitation to slow down. We bring the character of Andhra to the table through spice, smoke, seasonal produce and recipes that know exactly where they come from.
            </p>
            <p className="mt-5 text-base leading-7 text-[#71645a]">
              Come in for a quick plate, stay for the second round. Our dining room is polished without being precious — generous portions, attentive service and the kind of food that keeps the conversation going.
            </p>
            <a href="#visit" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#7f2639] transition-colors hover:text-[#b28b4c]" data-testid="link-story-visit">
              Find your way here <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <section id="menu" className="bg-[#251d1a] px-5 py-20 text-[#f1e9dc] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="star-rule mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#d2b276]">The table, at a glance</p>
              <h2 className="font-display text-5xl leading-none tracking-[-0.045em] sm:text-6xl" data-testid="heading-menu">Come for the <em className="text-[#d2b276]">favourites.</em></h2>
            </div>
            <p className="max-w-[310px] text-sm leading-6 text-[#bfb3a2]">A short list of the plates that make Nakshatra feel like Nakshatra. Ask us what is cooking beautifully today.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {menuItems.map((item, index) => {
              const isActive = activeDish === item.id;
              return (
                <article key={item.id} className="menu-card group relative overflow-hidden border border-[#65544a] bg-[#332724]" data-testid={`card-menu-${item.id}`}>
                  <div className="relative h-[290px] overflow-hidden">
                    <img src={item.image} alt={item.name} className="menu-image h-full w-full object-cover" data-testid={`img-menu-${item.id}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#251d1a] via-transparent to-transparent opacity-70" />
                    <span className="absolute left-5 top-5 border border-[#d2b276]/70 bg-[#251d1a]/70 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#d2b276]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b28b4c]">{item.category}</p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-[#f1e9dc]" data-testid={`text-menu-name-${item.id}`}>{item.name}</h3>
                    <p className="mt-1 font-telugu text-sm text-[#c5b6a6]" lang="te">{item.telugu}</p>
                    <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="pt-4 text-sm leading-6 text-[#bfb3a2]">{item.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-[#65544a] pt-5">
                      <span className="font-display text-xl text-[#d2b276]" data-testid={`text-menu-price-${item.id}`}>{item.price}</span>
                      <button
                        type="button"
                        onClick={() => setActiveDish(isActive ? null : item.id)}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#d8cec0] hover:text-[#d2b276]"
                        aria-expanded={isActive}
                        data-testid={`button-menu-detail-${item.id}`}
                      >
                        {isActive ? 'Less' : 'Details'} {isActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#65544a] pt-6 text-xs text-[#bfb3a2]">
            <span className="flex items-center gap-3"><Utensils size={15} className="text-[#d2b276]" /> Typical spend ₹200–₹400 per person</span>
            <span className="text-[#d2b276]">Dine-in · Made to order</span>
          </div>
        </div>
      </section>

      <section className="bg-[#8b2e3e] px-5 py-20 text-[#f1e9dc] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1150px] gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="star-rule mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#f0ce91]">An evening in the making</p>
            <h2 className="max-w-[700px] font-display text-5xl leading-[.96] tracking-[-0.045em] sm:text-7xl" data-testid="heading-invitation">
              Bring your appetite.<br /><em className="text-[#f0ce91]">We’ll bring the rest.</em>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="group flex w-fit items-center gap-5 border border-[#f0ce91]/70 px-6 py-5 text-xs font-bold uppercase tracking-[0.17em] text-[#f1e9dc] transition-colors hover:bg-[#f0ce91] hover:text-[#251d1a]"
            data-testid="button-reserve-invitation"
          >
            {copy.reserve} <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <section id="visit" className="bg-[#e5dacb] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1150px] gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div>
            <p className="star-rule mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8d6b3e]">Your table is waiting</p>
            <h2 className="font-display text-5xl leading-[.96] tracking-[-0.045em] text-[#251d1a] sm:text-7xl" data-testid="heading-visit">Make a night<br /><em className="text-[#7f2639]">of it.</em></h2>
            <div className="mt-10 grid max-w-[580px] grid-cols-1 gap-7 border-t border-[#c1ae98] pt-7 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8d6b3e]"><MapPin size={14} /> Find us</p>
                <p className="mt-3 text-base leading-7 text-[#544940]" data-testid="text-address">CMF2+HR2, Seetharampuram,<br />Narsapur, Andhra Pradesh 534275</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=CMF2%2BHR2%2C%20Sitarampuram%2C%20Seetharamapuram%2C%20Andhra%20Pradesh%20534275"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-[#7f2639] hover:text-[#b28b4c]"
                  data-testid="link-directions"
                >
                  Get directions <ExternalLink size={14} />
                </a>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8d6b3e]"><Clock3 size={14} /> Hours</p>
                <p className="mt-3 text-base leading-7 text-[#544940]" data-testid="text-hours">Open until 11:00 PM<br /><span className="text-sm text-[#786a5f]">Dine-in service</span></p>
                <button type="button" onClick={() => setIsReservationOpen(true)} className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-[#7f2639] hover:text-[#b28b4c]" data-testid="button-check-availability">
                  Check availability <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden bg-[#251d1a] p-7 text-[#f1e9dc] sm:min-h-[430px] sm:p-10">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(178,139,76,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(178,139,76,.4) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
            <div className="absolute left-[50%] top-[47%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d2b276]/50" />
            <div className="absolute left-[50%] top-[47%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d2b276] shadow-[0_0_0_9px_rgba(210,178,118,.18)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[#d2b276]"><Compass size={18} /><span className="text-[10px] font-bold uppercase tracking-[0.24em]">Seetharampuram</span></div>
                <h3 className="mt-5 max-w-[230px] font-display text-4xl leading-none">Follow the<br /><em>glow.</em></h3>
              </div>
              <div className="border-t border-[#65544a] pt-5">
                <p className="text-sm leading-6 text-[#c6b9aa]">CMF2+HR2<br />Seetharamapuram, AP 534275</p>
                <a href="https://www.google.com/maps/search/?api=1&query=CMF2%2BHR2%2C%20Seetharampuram%2C%20Narsapur%2C%20Andhra%20Pradesh%20534275" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d2b276]" data-testid="link-map-card">Open in maps <ArrowRight size={13} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1e1917] px-5 py-12 text-[#f1e9dc] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl tracking-[-0.03em]">Nakshatra Grand</p>
            <p className="mt-2 font-telugu text-lg text-[#b28b4c]" lang="te">నక్షత్ర గ్రాండ్ రెస్టారెంట్</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#bfb3a2]">
            <a href="#top" className="hover:text-[#d2b276]" data-testid="link-footer-top">Back to top</a>
            <a href="#menu" className="hover:text-[#d2b276]" data-testid="link-footer-menu">Menu</a>
            <a href="#visit" className="hover:text-[#d2b276]" data-testid="link-footer-visit">Visit</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#d2b276]" data-testid="link-instagram"><Instagram size={15} /> Instagram</a>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.15em] text-[#81766e] sm:flex-row">
          <span data-testid="text-footer-location">Seetharampuram · Andhra Pradesh</span>
          <span data-testid="text-footer-service">Dine-in · Open until 11:00 PM</span>
        </div>
      </footer>

      {isReservationOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1e1917]/80 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
          <div className="relative max-h-full w-full max-w-[520px] overflow-y-auto bg-[#f1e9dc] p-7 text-[#251d1a] shadow-2xl sm:p-10">
            <button type="button" onClick={closeReservation} className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-[#c1ae98] text-[#7f2639] hover:bg-[#e5dacb]" aria-label="Close reservation dialog" data-testid="button-close-reservation"><X size={17} /></button>
            {!submitted ? (
              <>
                <p className="star-rule mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8d6b3e]">A seat at Nakshatra</p>
                <h2 id="reservation-title" className="font-display text-4xl leading-none sm:text-5xl">Reserve your<br /><em className="text-[#7f2639]">evening.</em></h2>
                <p className="mt-5 text-sm leading-6 text-[#66584e]">Send us the details below and we’ll keep your request ready for the dining room.</p>
                <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} data-testid="form-reservation">
                  <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.17em] text-[#8d6b3e]">Your name</span><input required name="name" className="w-full border-b border-[#bda88e] bg-transparent px-0 py-3 text-base outline-none focus:border-[#7f2639]" placeholder="How should we welcome you?" data-testid="input-reservation-name" /></label>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.17em] text-[#8d6b3e]">Date</span><input required type="date" name="date" className="w-full border-b border-[#bda88e] bg-transparent px-0 py-3 text-base outline-none focus:border-[#7f2639]" data-testid="input-reservation-date" /></label>
                    <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.17em] text-[#8d6b3e]">Guests</span><select name="guests" defaultValue="2" className="w-full border-b border-[#bda88e] bg-transparent px-0 py-3 text-base outline-none focus:border-[#7f2639]" data-testid="select-reservation-guests"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5+">5+ guests</option></select></label>
                  </div>
                  <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.17em] text-[#8d6b3e]">A way to reach you</span><input required name="contact" className="w-full border-b border-[#bda88e] bg-transparent px-0 py-3 text-base outline-none focus:border-[#7f2639]" placeholder="Email or phone number" data-testid="input-reservation-contact" /></label>
                  <button type="submit" className="mt-3 flex w-full items-center justify-center gap-3 bg-[#7f2639] px-5 py-4 text-xs font-bold uppercase tracking-[0.17em] text-[#f1e9dc] hover:bg-[#662030]" data-testid="button-submit-reservation">Request a table <ArrowRight size={15} /></button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#b28b4c] text-[#7f2639]"><Star size={24} /></div>
                <h2 id="reservation-title" className="mt-7 font-display text-4xl">Request received.</h2>
                <p className="mx-auto mt-4 max-w-[320px] text-sm leading-6 text-[#66584e]">Thank you. Our team will be in touch to confirm your table at Nakshatra Grand.</p>
                <button type="button" onClick={closeReservation} className="mt-8 border border-[#7f2639] px-6 py-4 text-xs font-bold uppercase tracking-[0.17em] text-[#7f2639] hover:bg-[#7f2639] hover:text-[#f1e9dc]" data-testid="button-close-confirmation">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
