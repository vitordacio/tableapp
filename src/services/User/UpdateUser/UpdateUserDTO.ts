interface IUpdateUserDTO {
  name: string;
  bio?: string;
  location?: string;
  age?: number;
  gender?: string;
  user: AuthorizedUser<UserPerm>;
}

export { IUpdateUserDTO };
