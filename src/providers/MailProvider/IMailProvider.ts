export interface IAddress {
  name: string;
  address: string;
}

export interface IEmail {
  to: IAddress;
  from: IAddress;
  subject: string;
  html: string;
}

export interface IPushNotification {
  message: string;
  workshopName: string;
  userIds: string[];
}

export interface ISMS {
  phones: string[];
  message: string;
}

export interface IMailProvider {
  sendEmail(email: IEmail): Promise<void>;
  sendPush(data: IPushNotification): Promise<void>;
  sendManyPush(data: IPushNotification[]): Promise<void>;
  sendSms(data: ISMS): Promise<void>;
}
