'use client';

import { useState, useEffect } from "react";
import { EpisodeForm } from "@/components/episode-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Headphones, Users } from "lucide-react";

type Episode = {
  client: string;
  invoicedAmount: number;
  datePaid: string;
  earnedAfterFees: number;
};

export default function HomePage() {
  const [stats, setStats] = useState({
    activeClients: 4,
    activeProjects: 6,
    hoursTracked: 24.5,
    unpaidInvoices: 0
  });

  useEffect(() => {
    async function fetchUnpaidInvoices() {
      try {
        const response = await fetch("/api/sheets");
        const { data } = await response.json();
        
        // Calculate total unpaid invoices
        const unpaidTotal = data.reduce((total: number, episode: Episode) => {
          console.log('Episode:', episode);
          // Add to total if there's no payment date and there's an invoiced amount
          if ((!episode.datePaid || episode.datePaid.trim() === '') && episode.earnedAfterFees) {
            return total + episode.earnedAfterFees;
          }
          return total;
        }, 0);

        setStats(prev => ({
          ...prev,
          unpaidInvoices: Number(unpaidTotal.toFixed(2))
        }));

      } catch (error) {
        console.error("Error fetching unpaid invoices:", error);
      }
    }

    fetchUnpaidInvoices();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Time Logger</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Log Editing Time</CardTitle>
        </CardHeader>
        <CardContent>
          <EpisodeForm />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursTracked}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.unpaidInvoices.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent episodes found.
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No pending invoices found.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
