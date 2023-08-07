// interface IAddress {
//   zip: string;
//   street: string;
//   uf: string;
//   city: string;
//   district: string;
//   number: string;
// }

interface IUpdateMeeting {
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

interface IUpdateMeetingDTO {
  fields: IUpdateMeeting;
  // MeetingId: string;
  requestUser: ExpressUser;
}

export { IUpdateMeetingDTO, IUpdateMeeting };
