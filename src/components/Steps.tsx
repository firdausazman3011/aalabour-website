import { Reveal } from "./ui/Reveal";

export function Steps({ steps, dark = false }: { steps: { title: string; desc: string }[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className={`absolute top-7 right-[12%] left-[12%] hidden h-px lg:block ${dark ? "bg-white/15" : "bg-sand-200"}`} />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
          <span className={`relative grid size-14 place-items-center rounded-2xl text-lg font-extrabold ${dark ? "bg-brand-600 text-white" : "bg-navy-950 text-white"} shadow-lift`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-6 text-lg font-bold ${dark ? "text-white" : "text-navy-950"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm ${dark ? "text-navy-200" : "text-muted"}`}>{s.desc}</p>
        </Reveal>
      ))}
    </ol>
  );
}
