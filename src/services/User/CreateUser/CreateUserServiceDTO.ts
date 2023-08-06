// interface IAddress {
//   zip: string;
//   street: string;
//   uf: string;
//   city: string;
//   district: string;
//   number: string;
// }

export interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
  // name?: string;
  // phone?: string;
  // avatar?: string;
  // role?: string;
  // permissions?: string[];
  // document: string;
  // address?: IAddress;
  // requestUser?: AuthorizedUser<MasterPerm>;
}
