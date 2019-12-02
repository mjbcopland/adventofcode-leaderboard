export interface Leaderboard {
  members: Member[];
  owner_id: string;
  event: string;
}

export interface Member {
  id: string;
  name: string;
  stars: number;
  local_score: number;
  global_score: number;
  last_star_ts: string;
  completion_day_level: Record<string, Record<string, CompletionLevel>>;
}

export interface CompletionLevel {
  get_star_ts: string;
}
