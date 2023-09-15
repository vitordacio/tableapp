export interface ICreateAddressPubDTO {
  // user: AuthorizedUser<UserPerm | PubPerm>;
  lat: number;
  long: number;
  user_id: string;
  zip?: string;
  street?: string;
  uf?: string;
  city?: string;
  district?: string;
  number?: string;
}
