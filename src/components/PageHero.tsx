import { Reveal } from "./ui/Reveal";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 right-0 size-[520px] rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-5 text-brand-500">{eyebrow}</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-navy-200">{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
