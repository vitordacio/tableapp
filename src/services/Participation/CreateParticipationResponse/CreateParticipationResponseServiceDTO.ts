export interface ICreateParticipationResponseDTO {
  participation_id: string;
  user: AuthorizedUser<UserPerm | PubPerm>;
}
