"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

type Episode = {
  podcastName: string;
  episodeTitle: string;
};

type TimeLogFormData = {
  episodeId: string;
  lengthHours: number;
  lengthMinutes: number;
  lengthSeconds: number;
  editingHours: number;
  editingMinutes: number;
  editingSeconds: number;
  note: string;
};

type NewEpisodeData = {
  podcastName: string;
  episodeTitle: string;
  episodeType: string;
};

export function EpisodeForm() {
  const [loading, setLoading] = useState(false);
  const [fetchingEpisodes, setFetchingEpisodes] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [showNewEpisodeDialog, setShowNewEpisodeDialog] = useState(false);
  const [newEpisode, setNewEpisode] = useState<NewEpisodeData>({
    podcastName: "",
    episodeTitle: "",
    episodeType: "Podcast"
  });
  const [formData, setFormData] = useState<TimeLogFormData>({
    episodeId: "",
    lengthHours: 0,
    lengthMinutes: 0,
    lengthSeconds: 0,
    editingHours: 0,
    editingMinutes: 0,
    editingSeconds: 0,
    note: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch existing episodes when component mounts
  useEffect(() => {
    fetchEpisodes();
  }, []);

  async function fetchEpisodes() {
    try {
      setFetchingEpisodes(true);
      const response = await fetch("/api/sheets");
      const { data } = await response.json();
      setEpisodes(data || []);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setFetchingEpisodes(false);
    }
  }

  const handleNewEpisodeSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episode: {
            ...newEpisode,
            earnedAfterFees: 0,
            invoicedAmount: 0,
            billedMinutes: 0,
            lengthHours: 0,
            lengthMinutes: 0,
            lengthSeconds: 0,
            paymentMethod: "",
            editingHours: 0,
            editingMinutes: 0,
            editingSeconds: 0,
            billableHours: 0,
            runningHourlyTotal: 0,
            dateInvoiced: "",
            datePaid: "",
            note: ""
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to create episode");

      // Refresh episodes list
      await fetchEpisodes();
      setShowNewEpisodeDialog(false);
      setNewEpisode({ podcastName: "", episodeTitle: "", episodeType: "Podcast" });
    } catch (error) {
      console.error("Error creating episode:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeSelect = (value: string) => {
    if (value === "new") {
      setShowNewEpisodeDialog(true);
    } else {
      setFormData({ ...formData, episodeId: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sheets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeLog: {
            episodeId: formData.episodeId,
            editingHours: formData.editingHours,
            editingMinutes: formData.editingMinutes,
            editingSeconds: formData.editingSeconds,
            note: formData.note,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to log time");

      // Reset form
      setFormData({
        episodeId: "",
        lengthHours: 0,
        lengthMinutes: 0,
        lengthSeconds: 0,
        editingHours: 0,
        editingMinutes: 0,
        editingSeconds: 0,
        note: "",
      });

    } catch (error) {
      console.error("Error logging time:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label>Select Episode</Label>
            <Select
              value={formData.episodeId}
              onValueChange={handleEpisodeSelect}
              onOpenChange={setDropdownOpen}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select episode to log time for" />
              </SelectTrigger>
              <SelectContent>
                {fetchingEpisodes && dropdownOpen ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    <SelectItem value="new">➕ Create New Episode</SelectItem>
                    {episodes
                      .filter(episode => episode.podcastName && episode.episodeTitle)
                      .reverse()
                      .map((episode, index) => (
                        <SelectItem 
                          key={index} 
                          value={index.toString()}
                        >
                          {`${episode.podcastName} - ${episode.episodeTitle}`}
                        </SelectItem>
                      ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Notes</Label>
            <Input
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Any additional notes about this editing session"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Logging Time..." : "Log Time"}
        </Button>
      </form>

      <Dialog open={showNewEpisodeDialog} onOpenChange={setShowNewEpisodeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Episode</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Podcast Name</Label>
              <Select
                value={newEpisode.podcastName}
                onValueChange={(value) => setNewEpisode({ ...newEpisode, podcastName: value })}
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
              <Label>Episode Title</Label>
              <Input
                value={newEpisode.episodeTitle}
                onChange={(e) => setNewEpisode({ ...newEpisode, episodeTitle: e.target.value })}
                placeholder="e.g., 506 - Gil Gayle"
              />
            </div>

            <div className="space-y-2">
              <Label>Episode Type</Label>
              <Select
                value={newEpisode.episodeType}
                onValueChange={(value) => setNewEpisode({ ...newEpisode, episodeType: value })}
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

            <Button 
              onClick={handleNewEpisodeSubmit} 
              disabled={loading || !newEpisode.podcastName || !newEpisode.episodeTitle}
              className="w-full"
            >
              {loading ? "Creating..." : "Create Episode"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 