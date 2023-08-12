export interface ICreateTableDTO {
  name: string;
  location: string;
  time: Date;
  additional?: string;
  drink_preferences?: string;
  age_limit?: number;
  free_woman?: number;
  free_man?: number;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
