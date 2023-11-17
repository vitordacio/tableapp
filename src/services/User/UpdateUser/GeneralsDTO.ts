export interface IUpdateUsernameDTO {
  username: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateNameDTO {
  name: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateBioDTO {
  bio: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateLocationDTO {
  location: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateGenderDTO {
  gender: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateSocialDTO {
  social: string;
  username: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdatePrivateDTO {
  set_private: boolean;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdateEmailDTO {
  email: string;
  user: AuthorizedUser<UserPerm>;
}

export interface IUpdatePasswordDTO {
  password: string;
  new_password: string;
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
