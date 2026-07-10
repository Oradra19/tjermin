import Image from "next/image";
export function Hero() {
  return (
    <section className="relative grid min-h-[440px] place-items-center overflow-hidden bg-navy px-6 text-center text-white sm:min-h-[520px]">
      <Image
        src="/hero.webp"
        alt="A curated collection of modern everyday objects"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy/75" />
      <div className="relative max-w-2xl">
        <p className="mb-4 text-sm font-medium tracking-[.2em] text-blue-200">
          CURATED FOR EVERYDAY
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Tjermin Marketplace.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
          Thoughtfully selected essentials that bring a little more intention to
          your everyday.
        </p>
        <a
          href="#catalog"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-navy"
        >
          Explore collection
        </a>
      </div>
    </section>
  );
}
