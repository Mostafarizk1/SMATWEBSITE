import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, id, className = "", children }: Props) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <Reveal className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2 mt-5">
          {title}
        </h2>
        {intro && <p className="lede mt-5 max-w-2xl">{intro}</p>}
      </Reveal>
      {children}
    </div>
  );
}
