export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  highlight?: boolean;
}


export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}
