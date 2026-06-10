"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ActivityPoint } from "@/types/dashboard";

export function ActivityChart({ data }: { data: ActivityPoint[] }) {
  return (
    <div className="h-64 w-full" aria-label="Engineering activity chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="systemsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5f5f5" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#f5f5f5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="featuresGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a3a3a3" stopOpacity={0.24} />
              <stop offset="95%" stopColor="#a3a3a3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ffffff14" vertical={false} />
          <XAxis dataKey="label" stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#0b0b0b",
              border: "1px solid rgb(255 255 255 / 0.12)",
              borderRadius: 8,
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="features"
            stroke="#a3a3a3"
            strokeWidth={2}
            fill="url(#featuresGradient)"
          />
          <Area
            type="monotone"
            dataKey="systems"
            stroke="#f5f5f5"
            strokeWidth={2}
            fill="url(#systemsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
