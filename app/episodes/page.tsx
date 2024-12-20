'use client';

import { useState } from "react";
import { EpisodeForm } from "@/components/episode-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EpisodesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Time Logger</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Log Time"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Log Editing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <EpisodeForm />
          </CardContent>
        </Card>
      )}

      {/* Time logs list will go here */}
    </div>
  );
} 