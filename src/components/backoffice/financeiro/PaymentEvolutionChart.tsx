"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

interface MonthlyRevenue {
  month: string;
  revenueInCents: number;
  paymentsCount: number;
  chargesCount: number;
}

interface PaymentEvolutionChartProps {
  data: MonthlyRevenue[];
  type?: "line" | "area" | "bar";
}

export function PaymentEvolutionChart({
  data,
  type = "area",
}: PaymentEvolutionChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      month: item.month,
      revenue: item.revenueInCents / 100,
      payments: item.paymentsCount,
      charges: item.chargesCount,
    }));
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800">
          <p className="mb-2 font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.dataKey === "revenue"
                ? formatCurrency(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">
          Nenhum dado disponível para exibir
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Evolução de Pagamentos
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        {type === "area" ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Receita"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="payments"
              stroke="#10b981"
              fillOpacity={0.3}
              fill="#10b981"
              name="Pagamentos"
            />
          </AreaChart>
        ) : type === "bar" ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#3b82f6"
              name="Receita"
            />
            <Bar
              yAxisId="right"
              dataKey="payments"
              fill="#10b981"
              name="Pagamentos"
            />
          </BarChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" tickFormatter={formatCurrency} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Receita"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="payments"
              stroke="#10b981"
              strokeWidth={2}
              name="Pagamentos"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
