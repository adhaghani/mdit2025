// Voting System Types

export interface Team {
  team_id: string;
  team_name: string;
  team_university_logo_url: string;
  team_group_photo_url: string;
}

export interface Participant {
  participant_id: string;
  participant_ic: string;
  participant_name: string;
  participant_photo_url: string;
  team_id: string;
  has_voted: boolean;
}

export interface Vote {
  participant_id: string;
  pitching_excellence_participant_id: string;
  critical_thinking_defence_team_id: string;
  ai_driven_innovation_team_id: string;
}

export interface VotingData {
  teams: Team[];
  participants: Participant[];
  currentParticipant: Participant;
}

export interface VoteSubmission {
  participant_id: string;
  pitching_excellence: string;
  critical_thinking: string;
  ai_innovation: string;
}
