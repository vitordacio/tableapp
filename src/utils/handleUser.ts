import { container } from 'tsyringe';
import { UserRepository } from '@repositories/UserRepository/implementation/UserRepository';

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

// export async function generateUniqueUsername(username: string) {
//   let newUsername = clearUsername(username);
//   let unavailableUser;

//   const userRepository = container.resolve(UserRepository);

//   while ((unavailableUser = await userRepository.findByUsername(newUsername))) {
//     const randomDigits = Math.floor(Math.random() * 100000);
//     newUsername = `${newUsername}${randomDigits}`;
//   }

//   return newUsername;
// }
