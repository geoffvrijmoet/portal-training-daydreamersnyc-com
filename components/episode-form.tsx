"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EpisodeFormData = {
  podcastName: string;
  episodeTitle: string;
  episodeType: string;
  lengthHours: number;
  lengthMinutes: number;
  lengthSeconds: number;
  editingHours: number;
  editingMinutes: number;
  editingSeconds: number;
  note: string;
};

export function EpisodeForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EpisodeFormData>({
    podcastName: "",
    episodeTitle: "",
    episodeType: "Podcast",
    lengthHours: 0,
    lengthMinutes: 0,
    lengthSeconds: 0,
    editingHours: 0,
    editingMinutes: 0,
    editingSeconds: 0,
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episode: {
            ...formData,
            earnedAfterFees: 0,
            invoicedAmount: 0,
            billedMinutes: 0,
            paymentMethod: "",
            billableHours: 0,
            runningHourlyTotal: 0,
            dateInvoiced: "",
            datePaid: "",
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to add episode");

      // Reset form
      setFormData({
        podcastName: "",
        episodeTitle: "",
        episodeType: "Podcast",
        lengthHours: 0,
        lengthMinutes: 0,
        lengthSeconds: 0,
        editingHours: 0,
        editingMinutes: 0,
        editingSeconds: 0,
        note: "",
      });

    } catch (error) {
      console.error("Error adding episode:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="podcastName">Podcast Name</Label>
          <Select
            value={formData.podcastName}
            onValueChange={(value) => setFormData({ ...formData, podcastName: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select podcast" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="That's My Girl">That&apos;s My Girl</SelectItem>
              <SelectItem value="MMIH">MMIH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="episodeTitle">Episode Title</Label>
          <Input
            id="episodeTitle"
            value={formData.episodeTitle}
            onChange={(e) => setFormData({ ...formData, episodeTitle: e.target.value })}
            placeholder="e.g., 506 - Gil Gayle"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="episodeType">Episode Type</Label>
          <Select
            value={formData.episodeType}
            onValueChange={(value) => setFormData({ ...formData, episodeType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Podcast">Podcast</SelectItem>
              <SelectItem value="Podcast Video">Podcast Video</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Episode Length</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Hours</Label>
              <Input
                type="number"
                min="0"
                value={formData.lengthHours}
                onChange={(e) => setFormData({ ...formData, lengthHours: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Minutes</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={formData.lengthMinutes}
                onChange={(e) => setFormData({ ...formData, lengthMinutes: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Seconds</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={formData.lengthSeconds}
                onChange={(e) => setFormData({ ...formData, lengthSeconds: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Time Spent Editing</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Hours</Label>
              <Input
                type="number"
                min="0"
                value={formData.editingHours}
                onChange={(e) => setFormData({ ...formData, editingHours: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Minutes</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={formData.editingMinutes}
                onChange={(e) => setFormData({ ...formData, editingMinutes: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Seconds</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={formData.editingSeconds}
                onChange={(e) => setFormData({ ...formData, editingSeconds: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Notes</Label>
          <Input
            id="note"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Any additional notes"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding Episode..." : "Add Episode"}
      </Button>
    </form>
  );
} 