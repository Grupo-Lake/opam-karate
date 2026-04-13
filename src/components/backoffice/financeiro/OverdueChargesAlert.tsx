"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApiClient } from "@/lib/api/client-hook";
import type { Charge } from "@/lib/api/payments-types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Eye, X } from "lucide-react";
import Link from "next/link";

export function OverdueChargesAlert() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const [overdueCharges, setOverdueCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadOverdueCharges = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiRef.current.charges.list({
        page: 1,
        limit: 10,
        status: "overdue",
      });
      setOverdueCharges(result.data);
    } catch (err) {
      console.error("Error loading overdue charges:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverdueCharges();
  }, [loadOverdueCharges]);

  if (loading || dismissed || overdueCharges.length === 0) {
    return null;
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const totalOverdue = overdueCharges.reduce(
    (sum, charge) => sum + charge.netAmountInCents,
    0
  );

  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Cobranças Vencidas
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {overdueCharges.length} cobrança(s) vencida(s) totalizando{" "}
                <strong>{formatCurrency(totalOverdue)}</strong>
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {overdueCharges.length > 0 && (
          <div className="mt-4 space-y-2">
            {overdueCharges.slice(0, 3).map((charge) => (
              <div
                key={charge.id}
                className="flex items-center justify-between rounded-md bg-white p-3 dark:bg-gray-800"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {String(charge.referenceMonth).padStart(2, "0")}/
                    {charge.referenceYear} - {formatCurrency(charge.netAmountInCents)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Vencimento: {formatDate(charge.dueDate)}
                  </p>
                </div>
                <Link href={`/backoffice/financeiro/cobrancas/${charge.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}

            {overdueCharges.length > 3 && (
              <Link href="/backoffice/financeiro/cobrancas?status=overdue">
                <Button variant="outline" className="w-full" size="sm">
                  Ver todas ({overdueCharges.length})
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export function UpcomingChargesNotification() {
  const api = useApiClient();
  const apiRef = useRef(api);
  const [upcomingCharges, setUpcomingCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const loadUpcomingCharges = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiRef.current.charges.list({
        page: 1,
        limit: 5,
        status: "pending",
      });

      // Filter charges due in the next 7 days
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);

      const upcoming = result.data.filter((charge) => {
        const dueDate = new Date(charge.dueDate);
        return dueDate >= today && dueDate <= sevenDaysFromNow;
      });

      setUpcomingCharges(upcoming);
    } catch (err) {
      console.error("Error loading upcoming charges:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpcomingCharges();
  }, [loadUpcomingCharges]);

  if (loading || upcomingCharges.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
              Cobranças Próximas do Vencimento
            </h3>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
              {upcomingCharges.length} cobrança(s) vencem nos próximos 7 dias
            </p>
            <div className="mt-2 space-y-1">
              {upcomingCharges.map((charge) => (
                <p key={charge.id} className="text-xs text-yellow-700 dark:text-yellow-300">
                  • {String(charge.referenceMonth).padStart(2, "0")}/
                  {charge.referenceYear} - Vence em {formatDate(charge.dueDate)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
