export interface PersonalInfo {
  birthDate: string;
  gender: "male" | "female";
  currentLocation: string;
  currentJob: string;
  currentSelf: string;
}

export interface PastSituation {
  year: number;
  pastChoice: string;
  desiredChange: string;
}

export interface UniverseFormData extends PersonalInfo, PastSituation {
  saveData?: boolean;
}

export interface TimelineItem {
  title: string;
  contents: string;
}

export interface SimulationResult {
  timeline: TimelineItem[];
  lastMessage: string;
}

export type FormStep = "intro" | "personal" | "past" | "complete";
