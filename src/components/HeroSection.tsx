import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import heroBg from "@/assets/hero-bg.jpg";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      </div>

      {/* Shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px animate-shimmer" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <p
          className={`text-xs uppercase tracking-[0.35em] text-primary font-body font-medium mb-6 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          You're Invited
        </p>

        {/* Name */}
        <h1
          className={`font-display text-6xl sm:text-8xl font-bold text-foreground leading-[0.9] tracking-tight mb-4 transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ lineHeight: "0.95" }}
        >
          <span className="gold-gradient-text">Lucas</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-display text-xl sm:text-2xl text-muted-foreground italic mb-10 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          is turning thirty
        </p>

        {/* Event details */}
        <div
          className={`flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 transition-all duration-700 delay-[450ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          id="details"
        >
          <div className="flex items-center gap-2 text-sm font-body text-foreground/80">
            <Calendar className="w-4 h-4 text-primary" />
            <span>May 15, 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-body text-foreground/80">
            <Clock className="w-4 h-4 text-primary" />
            <span>7:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-body text-foreground/80">
            <MapPin className="w-4 h-4 text-primary" />
            <span>The Rooftop at NoMad</span>
          </div>
        </div>

        {/* Countdown */}
        <div
          className={`transition-all duration-700 delay-[600ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <CountdownTimer />
        </div>

        {/* CTA */}
        <div
          className={`mt-12 transition-all duration-700 delay-[750ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#rsvp"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.97] transition-all shadow-lg shadow-primary/20"
          >
            RSVP Now
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
