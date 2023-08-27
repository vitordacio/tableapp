export interface ICreateAddressEventDTO {
  event_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
  zip?: string;
  street?: string;
  uf?: string;
  city?: string;
  district?: string;
  number?: string;
  lat?: number;
  long?: number;
}
