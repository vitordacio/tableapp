export interface IMeeting {
  id: string;
  name: string;
  location: string;
  description?: string;
  type_id: string;
  owner_id: string;
}
