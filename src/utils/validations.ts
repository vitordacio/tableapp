import { Participation } from '@entities/Participation/Participation';

function hasModPermission(
  user_id: string,
  participations: Participation[],
): boolean {
  return participations.some(
    participation =>
      participation.user_id === user_id && participation.type === 'mod',
  );
}

function isEmail(login: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(login);
}

export { hasModPermission, isEmail };
