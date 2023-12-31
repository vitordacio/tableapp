export interface IFindEventsServiceDTO {
  name?: string;
  page?: number;
  limit?: number;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IFindByUserIdDTO {
  user_id: string;
  page?: number;
  limit?: number;
}
