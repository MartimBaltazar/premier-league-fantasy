import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlayerStats } from "@/services/api";
import StatCard from "@/components/StatCard";
import { Users, Trophy, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["playerStats"],
    queryFn: getPlayerStats,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="p-8 bg-destructive/10 border-destructive">
          <p className="text-destructive font-semibold">Failed to load statistics</p>
          <p className="text-sm text-muted-foreground mt-2">
            Make sure your backend is running and accessible
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-accent rounded-2xl p-8 text-primary-foreground shadow-glow">
        <h1 className="text-4xl font-bold mb-2">Premier League Fantasy</h1>
        <p className="text-lg opacity-90">
          Track player stats, manage your squad, and dominate your league
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Players"
          value={stats?.totalPlayers || 0}
          icon={Users}
        />
        <StatCard
          title="Teams"
          value={Object.keys(stats?.playersByTeam || {}).length}
          icon={Trophy}
        />
        <StatCard
          title="Top Scorer Goals"
          value={stats?.topScorers[0]?.goals || 0}
          icon={Target}
        />
        <StatCard
          title="Top Assists"
          value={stats?.topAssists[0]?.assists || 0}
          icon={TrendingUp}
        />
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scorers */}
        <Card className="p-6 shadow-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-stat-goals" />
            Top Scorers
          </h2>
          <div className="space-y-3">
            {stats?.topScorers.slice(0, 5).map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary w-6">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.team} • {player.position}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-stat-goals">
                  {player.goals}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Assists */}
        <Card className="p-6 shadow-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-stat-assists" />
            Top Assists
          </h2>
          <div className="space-y-3">
            {stats?.topAssists.slice(0, 5).map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary w-6">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {player.team} • {player.position}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-stat-assists">
                  {player.assists}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
