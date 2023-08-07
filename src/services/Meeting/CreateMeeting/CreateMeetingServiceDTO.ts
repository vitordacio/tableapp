export interface ICreateMeetingDTO {
  type_id: string;
  name: string;
  location: string;
  description?: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
