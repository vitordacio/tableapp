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

export interface IFindByEventAndUserDTO {
  event_id: string;
  user_id: string;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IFindRequestsDTO {
  event_id: string;
  page?: number;
  limit?: number;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}
