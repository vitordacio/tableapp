interface IFindUsersServiceDTO {
  name?: string;
  page?: number;
  limit?: number;
  reqUser: AuthorizedUser<UserPerm | PubPerm>;
}

export { IFindUsersServiceDTO };
