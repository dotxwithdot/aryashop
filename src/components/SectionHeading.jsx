export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-9 max-w-2xl">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rosewood">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-base leading-7 text-stone-600">{text}</p>}
    </div>
  );
}
