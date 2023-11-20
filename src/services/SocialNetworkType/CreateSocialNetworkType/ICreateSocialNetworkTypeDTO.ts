export interface ICreateSocialNetworkTypeDTO {
  base_url: string;
  deep_link?: string;
  type: 'instagram' | 'tiktok' | 'twitter' | 'twitch' | 'youtube';
}
