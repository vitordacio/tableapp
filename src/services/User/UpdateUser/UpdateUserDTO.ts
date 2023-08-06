// interface IAddress {
//   zip: string;
//   street: string;
//   uf: string;
//   city: string;
//   district: string;
//   number: string;
// }

interface IUpdateUser {
  name?: string;
  // email?: string;
  // phone?: string;
  // address?: IAddress;
  // document?: string;
  // surname?: string;
  // password?: string;
  // permissions?: string[];
  // is_locator?: boolean;
}

interface IUpdateUserDTO {
  fields: IUpdateUser;
  // userId: string;
  requestUser: ExpressUser;
}

export { IUpdateUserDTO, IUpdateUser };
