import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Check, Send } from "lucide-react";

export default function RSVPForm() {
  const sectionRef = useScrollReveal<HTMLElement>(true);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attendance: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.attendance) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for your RSVP!");
  };

  if (submitted) {
    return (
      <section ref={sectionRef} id="rsvp" className="section-reveal py-24 sm:py-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="gold-border gold-glow rounded-2xl bg-background/60 backdrop-blur-sm p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">You're on the list!</h3>
            <p className="text-muted-foreground font-body">We can't wait to celebrate with you, {form.name}.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="rsvp" className="section-reveal py-24 sm:py-32 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12 stagger-child">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-body font-medium mb-3">Kindly Respond</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground text-balance leading-[1.1]">RSVP</h2>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-6" />
        </div>

        <form onSubmit={handleSubmit} className="gold-border gold-glow rounded-2xl bg-background/60 backdrop-blur-sm p-8 sm:p-10 space-y-6 stagger-child">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Will you attend? *</label>
              <select
                value={form.attendance}
                onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground"
              >
                <option value="">Select</option>
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Number of Guests</label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">Message (Optional)</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground placeholder:text-muted-foreground resize-none"
              placeholder="Any dietary restrictions or a birthday wish…"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <Send className="w-4 h-4" />
            Send RSVP
          </button>
        </form>
      </div>
    </section>
  );
}
