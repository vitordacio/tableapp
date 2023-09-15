export interface IAddress {
  id: string;
  zip?: string;
  street?: string;
  uf?: string;
  city?: string;
  district?: string;
  number?: string;
  lat: number;
  long: number;
  user_id?: string;
}
