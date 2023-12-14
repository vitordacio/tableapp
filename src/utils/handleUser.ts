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

type checkCanSeeContent = {
  user_id: string;
  profile: User;
};

export const checkCanSeeContent = ({
  user_id,
  profile,
}: checkCanSeeContent): boolean => {
  if (user_id === profile.id_user) return true;
  if (profile.role_name === 'pub' || !profile.private) return true;
  if (profile.friendship_status === 'friends') return true;

  return false;
};

// export function sortByDate(
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   array: any[],
//   reference: string,
//   asc?: boolean,
// ) {
//   const sorted = array || [];

//   return sorted.sort((a, b) => {
//     const dateA = new Date(a[reference]).getTime();
//     const dateB = new Date(b[reference]).getTime();

//     if (asc) return dateA - dateB;
//     return dateB - dateA;
//   });
// }
