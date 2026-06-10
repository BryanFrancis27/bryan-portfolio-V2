import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CommandCenterCardProps {
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CommandCenterCard({
  label,
  title,
  children,
  className,
}: CommandCenterCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-white/[0.06] pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">{label}</p>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}
