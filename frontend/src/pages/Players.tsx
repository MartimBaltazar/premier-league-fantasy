import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlayers, addPlayer, updatePlayer, deletePlayer, Player } from "@/services/api";
import PlayerCard from "@/components/PlayerCard";
import PlayerFilters from "@/components/PlayerFilters";
import PlayerForm from "@/components/PlayerForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid3x3, Table as TableIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Players = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    name: "",
    team: "all",
    position: "all",
    nation: "all",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Fetch players
  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ["players", filters],
    queryFn: () => {
      const apiFilters = {
        ...(filters.name && { name: filters.name }),
        ...(filters.team !== "all" && { team: filters.team }),
        ...(filters.position !== "all" && { position: filters.position }),
        ...(filters.nation !== "all" && { nation: filters.nation }),
      };
      return getPlayers(apiFilters);
    },
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["playerStats"] });
      toast.success("Player added successfully!");
      setIsFormOpen(false);
    },
    onError: () => {
      toast.error("Failed to add player");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["playerStats"] });
      toast.success("Player updated successfully!");
      setIsFormOpen(false);
    },
    onError: () => {
      toast.error("Failed to update player");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["playerStats"] });
      toast.success("Player deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete player");
    },
  });

  // Handlers
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddClick = () => {
    setFormMode("add");
    setSelectedPlayer(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (player: Player) => {
    setFormMode("edit");
    setSelectedPlayer(player);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (playerName: string) => {
    setPlayerToDelete(playerName);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (playerToDelete) {
      deleteMutation.mutate(playerToDelete);
      setDeleteDialogOpen(false);
      setPlayerToDelete(null);
    }
  };

  const handleFormSubmit = (player: Player) => {
    if (formMode === "add") {
      addMutation.mutate(player);
    } else {
      updateMutation.mutate(player);
    }
  };

  // Get unique values for filters
  const teams = Array.from(new Set(players.map((p) => p.team))).sort();
  const positions = Array.from(new Set(players.map((p) => p.position))).sort();
  const nations = Array.from(new Set(players.map((p) => p.nation))).sort();
  console.log("Players:", players);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading players...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="p-8 bg-destructive/10 border-2 border-destructive rounded-lg">
          <p className="text-destructive font-semibold">Failed to load players</p>
          <p className="text-sm text-muted-foreground mt-2">
            Make sure your backend is running at the correct URL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Players
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your fantasy football squad
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          >
            {viewMode === "grid" ? (
              <TableIcon className="h-5 w-5" />
            ) : (
              <Grid3x3 className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={handleAddClick}
            className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Filters */}
      <PlayerFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        teams={teams}
        positions={positions}
        nations={nations}
      />

      {/* Players Display */}
      {players.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No players found. Add some players to get started!
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.name}
              player={player}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-2 border-border bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Nation</TableHead>
                <TableHead className="text-center">Goals</TableHead>
                <TableHead className="text-center">Assists</TableHead>
                <TableHead className="text-center">Apps</TableHead>
                <TableHead className="text-center">xG</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.name} className="hover:bg-muted/50">
                  <TableCell className="font-semibold">{player.name}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                      {player.position}
                    </span>
                  </TableCell>
                  <TableCell>{player.nation}</TableCell>
                  <TableCell className="text-center font-bold text-stat-goals">
                    {player.goals}
                  </TableCell>
                  <TableCell className="text-center font-bold text-stat-assists">
                    {player.assists}
                  </TableCell>
                  <TableCell className="text-center">{player.played}</TableCell>
                  <TableCell className="text-center">{player.expected_goals.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(player)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(player.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Player Form Modal */}
      <PlayerForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        player={selectedPlayer}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the player from
              your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Players;
