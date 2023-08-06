const permissions = {
  master: true,
  user: true,
  pub: true,
} as const;

declare type AppPermissions = typeof permissions;

const masterPerm = { master: true } as const;
type MasterPerm = typeof masterPerm;

const userPerm = { user: true } as const;
type UserPerm = typeof userPerm;

const pubPerm = { pub: true } as const;
type PubPerm = typeof pubPerm;
