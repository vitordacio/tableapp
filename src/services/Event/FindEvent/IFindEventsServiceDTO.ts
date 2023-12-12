export interface IFindEventsServiceDTO {
  name?: string;
  page?: number;
  limit?: number;
}

export interface IFindByUserIdDTO {
  user_id: string;
  page?: number;
  limit?: number;
}
