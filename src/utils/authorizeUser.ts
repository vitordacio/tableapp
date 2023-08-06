type AuthorizeResult<T extends Partial<AppPermissions>> =
  | { type: 'ok'; user: AuthorizedUser<T | AppPermissions> }
  | { type: 'fail'; reason: string };

function authorize<T extends Partial<AppPermissions>>(
  user: ExpressUser,
  permission: T,
): AuthorizeResult<T> {
  if (user.role === 'master') {
    return { type: 'ok', user: user as AuthorizedUser<AppPermissions> };
  }

  if (permission.pub) {
    if (user.role === 'pub') {
      return { type: 'ok', user: user as AuthorizedUser<typeof permission> };
    }
  }

  if (permission.user) {
    if (user.role === 'user') {
      return { type: 'ok', user: user as AuthorizedUser<typeof permission> };
    }
  }

  return { type: 'fail', reason: 'Usuário não possue esta permissão.' };
}

export { authorize };
