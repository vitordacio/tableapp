// interface IAddress {
//   zip: string;
//   street: string;
//   uf: string;
//   city: string;
//   district: string;
//   number: string;
// }

interface IUpdateTable {
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

interface IUpdateTableDTO {
  fields: IUpdateTable;
  // TableId: string;
  requestUser: ExpressUser;
}

export { IUpdateTableDTO, IUpdateTable };
