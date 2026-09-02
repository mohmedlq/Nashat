export interface BroadcastSection {
  section: string;
  content: string;
}
 
export interface Broadcast {
  id: number;
  title: string;
  type: string;
  level: string;
  content: BroadcastSection[];
}