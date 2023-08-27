// interface IAddress {
//   zip: string;
//   street: string;
//   uf: string;
//   city: string;
//   district: string;
//   number: string;
// }

interface IUpdateAddress {
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

interface IUpdateAddressDTO {
  fields: IUpdateAddress;
  // AddressId: string;
  requestAddress: ExpressUser;
}

export { IUpdateUserDTO, IUpdateUser };
