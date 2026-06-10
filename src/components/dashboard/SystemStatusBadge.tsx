import { Badge } from "@/components/ui/badge";
import type { SystemStatus } from "@/types/dashboard";

const statusStyles: Record<SystemStatus, "success" | "default" | "warning" | "secondary"> = {
  ACTIVE: "success",
  PRODUCTION: "default",
  "PERSONAL PROJECT": "warning",
  ARCHIVED: "secondary",
};

export function SystemStatusBadge({ status }: { status: SystemStatus }) {
  return (
    <Badge variant={statusStyles[status]} className="font-mono tracking-[0.14em]">
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </Badge>
  );
}
