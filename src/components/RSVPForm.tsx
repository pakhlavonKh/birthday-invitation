import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";
import { Check, Send, ChevronDown } from "lucide-react";

export default function RSVPForm() {
  const sectionRef = useScrollReveal<HTMLElement>(true);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attendance: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  const attendanceOptions = [
    { value: "yes", label: "Joyfully Accept" },
    { value: "no", label: "Regretfully Decline" }
  ];

  const guestOptions = [1, 2, 3, 4];

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
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenAttendance(!openAttendance);
                    setOpenGuests(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground text-left flex items-center justify-between hover:border-primary/50"
                >
                  <span className={form.attendance ? "text-foreground" : "text-muted-foreground"}>
                    {form.attendance ? attendanceOptions.find(o => o.value === form.attendance)?.label : "Select"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${openAttendance ? "rotate-180" : ""}`} />
                </button>
                {openAttendance && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {attendanceOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, attendance: option.value });
                          setOpenAttendance(false);
                        }}
                        className={`w-full px-4 py-3 text-left font-body text-sm transition-colors ${
                          form.attendance === option.value
                            ? "bg-primary/20 text-primary"
                            : "text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Number of Guests</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenGuests(!openGuests);
                    setOpenAttendance(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-body text-sm text-foreground text-left flex items-center justify-between hover:border-primary/50"
                >
                  <span>{form.guests}</span>
                  <ChevronDown className={`w-4 h-4 text-primary transition-transform ${openGuests ? "rotate-180" : ""}`} />
                </button>
                {openGuests && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {guestOptions.map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, guests: num.toString() });
                          setOpenGuests(false);
                        }}
                        className={`w-full px-4 py-3 text-left font-body text-sm transition-colors ${
                          form.guests === num.toString()
                            ? "bg-primary/20 text-primary"
                            : "text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
