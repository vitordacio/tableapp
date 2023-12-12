export interface IFindByUserIdDTO {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface IFindByEventIdDTO {
  event_id: string;
  page?: number;
  limit?: number;
}
