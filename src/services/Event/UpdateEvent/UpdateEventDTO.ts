export interface IUpdateEventNameDTO {
  event_id: string;
  name: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventLocationDTO {
  event_id: string;
  location: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventHoursDTO {
  event_id: string;
  start_time: Date;
  finish_time?: Date;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventPrivateDTO {
  event_id: string;
  is_private: boolean;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventAdditionalDTO {
  event_id: string;
  additional: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventDrinkPreferencesDTO {
  event_id: string;
  drink_preferences: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventMinAmountDTO {
  event_id: string;
  min_amount: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventPerformerDTO {
  event_id: string;
  performer: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventClubNameDTO {
  event_id: string;
  club_name: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventTicketsValueDTO {
  event_id: string;
  ticket_value: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventTicketsFreeDTO {
  event_id: string;
  tickets_free: number;
  user: AuthorizedUser<UserPerm | PubPerm>;
}

export interface IUpdateEventAddressIdDTO {
  event_id: string;
  address_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
