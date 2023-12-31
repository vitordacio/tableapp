export interface IFindByEventIdDTO {
  event_id: string;
  page?: number;
  limit?: number;
}

export interface IFindByUserIdDTO {
  user_id: string;
  page?: number;
  limit?: number;
}

export interface IFindReceivedByUserIdDTO {
  user_id: string;
  name?: string;
  page?: number;
  limit?: number;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
