import { useState, useEffect } from "react";
import { Player } from "@/services/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlayerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player?: Player | null;
  onSubmit: (player: Player) => void;
  mode: "add" | "edit";
}

// Define initial player structure for form resetting
const emptyPlayer: Player = {
  // Use null or 0 for numeric fields as appropriate, 0 is safer for immediate use
  name: "",
  nation: "",
  position: "FW",
  team: "",
  age: 0,
  born: "",
  played: 0,
  starts: 0,
  minutes: 0,
  goals: 0,
  assists: 0,
  penalty_kicks: 0,
  penalty_kicks_attempts: 0,
  yellow: 0,
  red: 0,
  expected_goals: 0,
  progressive_carries: 0,
  progressive_passes: 0,
  received_progressive_passes: 0,
};

const PlayerForm = ({ open, onOpenChange, player, onSubmit, mode }: PlayerFormProps) => {
  const [formData, setFormData] = useState<Player>(emptyPlayer);

  // Effect to reset form or load player data when dialog opens or player changes
  useEffect(() => {
    if (open) {
      setFormData(player || emptyPlayer);
    }
  }, [player, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation: ensure name, nation, team are present
    if (!formData.name || !formData.nation || !formData.team) {
        console.error("Required fields (Name, Nation, Team) must be filled.");
        // In a real app, you would use a toast/message to inform the user
        return;
    }
    
    onSubmit(formData);
  };

  /**
   * Handles changes for all input types.
   * - Ensures text inputs update directly.
   * - Ensures numeric inputs (type="number") handle empty strings by converting them to 0.
   */
  const handleChange = (field: keyof Player, value: string | number) => {
    let finalValue: string | number = value;

    // Type casting logic for numeric fields
    if (typeof value === 'string') {
        // Check if the target field is expected to be a number (based on emptyPlayer)
        const isNumericField = typeof emptyPlayer[field] === 'number';
        
        if (isNumericField) {
            // If the string is empty or just "-", treat as 0
            if (value === "" || value === "-") {
                finalValue = 0;
            } else if (field === 'expected_goals') {
                // Use parseFloat for decimal values
                finalValue = parseFloat(value);
            } else {
                // Use parseInt for integer values
                finalValue = parseInt(value, 10);
            }
            // If parsing results in NaN, default to 0
            if (isNaN(finalValue as number)) {
                finalValue = 0;
            }
        }
    }
    
    setFormData((prev) => ({ 
        ...prev, 
        [field]: finalValue 
    } as Player)); // Casting to Player to satisfy TypeScript
  };


  // Helper function for number inputs (binds to onChange)
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Player) => {
    handleChange(field, e.target.value);
  };
  
  // Helper function for text/select inputs (binds to onChange)
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Player) => {
    handleChange(field, e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {mode === "add" ? "Add New Player" : "Edit Player"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleTextInputChange(e, "name")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nation">Nation *</Label>
                <Input
                  id="nation"
                  value={formData.nation}
                  onChange={(e) => handleTextInputChange(e, "nation")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => handleChange("position", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GK">GK - Goalkeeper</SelectItem>
                    <SelectItem value="DF">DF - Defender</SelectItem>
                    <SelectItem value="MF">MF - Midfielder</SelectItem>
                    <SelectItem value="FW">FW - Forward</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="team">Team *</Label>
                <Input
                  id="team"
                  value={formData.team}
                  onChange={(e) => handleTextInputChange(e, "team")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age === 0 ? "" : formData.age} // Use empty string for 0 to allow placeholder effect
                  onChange={(e) => handleNumberInputChange(e, "age")}
                />
              </div>
              <div>
                <Label htmlFor="born">Born</Label>
                <Input
                  id="born"
                  value={formData.born}
                  onChange={(e) => handleTextInputChange(e, "born")}
                />
              </div>
            </div>
          </div>

          {/* Match Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Match Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="played">Played</Label>
                <Input
                  id="played"
                  type="number"
                  value={formData.played === 0 ? "" : formData.played}
                  onChange={(e) => handleNumberInputChange(e, "played")}
                />
              </div>
              <div>
                <Label htmlFor="starts">Starts</Label>
                <Input
                  id="starts"
                  type="number"
                  value={formData.starts === 0 ? "" : formData.starts}
                  onChange={(e) => handleNumberInputChange(e, "starts")}
                />
              </div>
              <div>
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  value={formData.minutes === 0 ? "" : formData.minutes}
                  onChange={(e) => handleNumberInputChange(e, "minutes")}
                />
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="goals">Goals</Label>
                <Input
                  id="goals"
                  type="number"
                  value={formData.goals === 0 ? "" : formData.goals}
                  onChange={(e) => handleNumberInputChange(e, "goals")}
                />
              </div>
              <div>
                <Label htmlFor="assists">Assists</Label>
                <Input
                  id="assists"
                  type="number"
                  value={formData.assists === 0 ? "" : formData.assists}
                  onChange={(e) => handleNumberInputChange(e, "assists")}
                />
              </div>
              <div>
                <Label htmlFor="penalty_kicks">Penalty Goals</Label>
                <Input
                  id="penalty_kicks"
                  type="number"
                  value={formData.penalty_kicks === 0 ? "" : formData.penalty_kicks}
                  onChange={(e) => handleNumberInputChange(e, "penalty_kicks")}
                />
              </div>
              <div>
                <Label htmlFor="penalty_kicks_attempts">Penalty Attempts</Label>
                <Input
                  id="penalty_kicks_attempts"
                  type="number"
                  value={formData.penalty_kicks_attempts === 0 ? "" : formData.penalty_kicks_attempts}
                  onChange={(e) => handleNumberInputChange(e, "penalty_kicks_attempts")}
                />
              </div>
              <div>
                <Label htmlFor="yellow">Yellow Cards</Label>
                <Input
                  id="yellow"
                  type="number"
                  value={formData.yellow === 0 ? "" : formData.yellow}
                  onChange={(e) => handleNumberInputChange(e, "yellow")}
                />
              </div>
              <div>
                <Label htmlFor="red">Red Cards</Label>
                <Input
                  id="red"
                  type="number"
                  value={formData.red === 0 ? "" : formData.red}
                  onChange={(e) => handleNumberInputChange(e, "red")}
                />
              </div>
              <div>
                <Label htmlFor="expected_goals">Expected Goals (xG)</Label>
                <Input
                  id="expected_goals"
                  type="number"
                  step="0.01"
                  value={formData.expected_goals === 0 ? "" : formData.expected_goals}
                  onChange={(e) => handleNumberInputChange(e, "expected_goals")}
                />
              </div>
            </div>
          </div>

          {/* Advanced Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Advanced Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="progressive_carries">Progressive Carries</Label>
                <Input
                  id="progressive_carries"
                  type="number"
                  value={formData.progressive_carries === 0 ? "" : formData.progressive_carries}
                  onChange={(e) => handleNumberInputChange(e, "progressive_carries")}
                />
              </div>
              <div>
                <Label htmlFor="progressive_passes">Progressive Passes</Label>
                <Input
                  id="progressive_passes"
                  type="number"
                  value={formData.progressive_passes === 0 ? "" : formData.progressive_passes}
                  onChange={(e) => handleNumberInputChange(e, "progressive_passes")}
                />
              </div>
              <div>
                <Label htmlFor="received_progressive_passes">Received Progressive</Label>
                <Input
                  id="received_progressive_passes"
                  type="number"
                  value={formData.received_progressive_passes === 0 ? "" : formData.received_progressive_passes}
                  onChange={(e) => handleNumberInputChange(e, "received_progressive_passes")}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
            >
              {mode === "add" ? "Add Player" : "Update Player"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerForm;
