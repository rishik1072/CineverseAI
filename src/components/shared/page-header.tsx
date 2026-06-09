import { Badge } from "@/components/ui/badge";

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10">
      <Badge variant="neon">{eyebrow}</Badge>
      <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
      {description ? <p className="mt-4 max-w-3xl text-slate-300">{description}</p> : null}
    </div>
  );
}
