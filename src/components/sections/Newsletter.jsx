import { Container } from "@/components/layout/Container";
export function Newsletter() {
  return (
    <section id="about" className="bg-surface py-16 text-center">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-navy">
          Stay in the loop
        </p>
        <h2 className="mt-3 text-3xl font-bold">
          A little inspiration, delivered.
        </h2>
        <p className="mt-3 text-muted">
          New arrivals and thoughtful stories, occasionally.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            aria-label="Email address"
            type="email"
            placeholder="Your email address"
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-navy"
          />
          <button className="rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white">
            Subscribe
          </button>
        </form>
      </Container>
    </section>
  );
}
