import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface PlayerFiltersProps {
  filters: {
    name: string;
    team: string;
    position: string;
    nation: string;
  };
  onFilterChange: (key: string, value: string) => void;
  teams: string[];
  positions: string[];
  nations: string[];
}

const PlayerFilters = ({
  filters,
  onFilterChange,
  teams,
  positions,
  nations,
}: PlayerFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-card rounded-lg shadow-card border-2 border-border">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={filters.name}
          onChange={(e) => onFilterChange("name", e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={filters.team} onValueChange={(value) => onFilterChange("team", value)}>
        <SelectTrigger>
          <SelectValue placeholder="All Teams" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teams</SelectItem>
          {teams.map((team) => (
            <SelectItem key={team} value={team}>
              {team}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.position}
        onValueChange={(value) => onFilterChange("position", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Positions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Positions</SelectItem>
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.nation} onValueChange={(value) => onFilterChange("nation", value)}>
        <SelectTrigger>
          <SelectValue placeholder="All Nations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Nations</SelectItem>
          {nations.map((nation) => (
            <SelectItem key={nation} value={nation}>
              {nation}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlayerFilters;
