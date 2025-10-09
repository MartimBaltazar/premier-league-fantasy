import { Player } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, TrendingUp, Target, Binoculars } from "lucide-react";


interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (playerName: string) => void;
}

const PlayerCard = ({ player, onEdit, onDelete }: PlayerCardProps) => {
  const getPositionColor = (position: string) => {
    const colors = {
      FW: "bg-stat-goals",
      MF: "bg-stat-assists",
      DF: "bg-primary",
      GK: "bg-stat-cards",
    };
    return colors[position as keyof typeof colors] || "bg-muted";
  };

  return (
    <Card className="p-5 shadow-card hover:shadow-hover transition-all duration-300 bg-card border-2 hover:border-primary/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{player.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {player.team} • {player.nation}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getPositionColor(
            player.position
          )}`}
        >
          {player.position}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <Target className="h-4 w-4 mx-auto mb-1 text-stat-goals" />
          <p className="text-2xl font-bold text-foreground">{player.goals}</p>
          <p className="text-xs text-muted-foreground">Goals</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-stat-assists" />
          <p className="text-2xl font-bold text-foreground">{player.assists}</p>
          <p className="text-xs text-muted-foreground">Assists</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <Binoculars className="h-4 w-4 mx-auto mb-1 text-stat-assists" />
          <p className="text-2xl font-bold text-foreground">{player.played}</p>
          <p className="text-xs text-muted-foreground">Apps</p>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(player)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(player.name)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PlayerCard;
