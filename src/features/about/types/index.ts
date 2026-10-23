export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  highlight?: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}
