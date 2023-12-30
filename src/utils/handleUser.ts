import { container } from 'tsyringe';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';
import { User } from '@entities/User/User';

export function clearUsername(username: string): string {
  username = username
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '');

  username = username.toLowerCase().replace(/\s+/g, '');
  return username;
}

export async function generateUniqueUsername(username: string) {
  let newUsername = clearUsername(username);
  let userExists = true;

  const userRepository = container.resolve(UserRepository);

  while (userExists) {
    // eslint-disable-next-line no-await-in-loop
    const existingUser = await userRepository.findByUsername(newUsername);

    if (existingUser) {
      newUsername = `${newUsername}${Math.floor(Math.random() * 100000)}`;
    } else {
      userExists = false;
    }
  }

  return newUsername;
}

type checkCanSeeUserContent = {
  requester: User;
  user: User;
  friendship_status: User['friendship_status'];
};

export const checkCanSeeUserContent = ({
  requester,
  user,
  friendship_status,
}: checkCanSeeUserContent): boolean => {
  if (requester.id_user === user.id_user) return true;
  if (user.role_name === 'pub' || !user.private) return true;
  if (friendship_status === 'friends') return true;

  return false;
};
