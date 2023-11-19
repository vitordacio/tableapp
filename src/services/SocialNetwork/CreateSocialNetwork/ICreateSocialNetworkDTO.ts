export interface ICreateSocialNetworkDTO {
  username: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
  type: 'instagram' | 'tiktok' | 'twitter' | 'twitch' | 'youtube';
}
