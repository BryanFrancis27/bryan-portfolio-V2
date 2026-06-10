import { CommandCenterView } from "@/components/dashboard/CommandCenterView";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function CommandCenterPage() {
  return (
    <DashboardShell>
      <CommandCenterView />
    </DashboardShell>
  );
}
