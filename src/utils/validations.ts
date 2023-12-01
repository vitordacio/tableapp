export function isEmail(login: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(login);
}

export function isUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
}
