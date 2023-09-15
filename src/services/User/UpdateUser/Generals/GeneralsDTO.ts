export interface IUpdateUsernameDTO {
  username: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateEmailDTO {
  email: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdatePasswordDTO {
  password: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdatePrivateDTO {
  set_private: boolean;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdatePictureDTO {
  picture: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateCoverPhotoDTO {
  cover_photo: string;
  user: AuthorizedUser<UserPerm>;
}
