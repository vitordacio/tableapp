import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { decode } from 'jsonwebtoken';
import { IHashProvider } from '@providers/HashProvider/IHashProvider';
import { generateAccessToken } from '@providers/Token/AccessTokenProvider';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { AppError } from '@utils/AppError';
import { User } from '@entities/User/User';
import { extractTagsFromText } from '@utils/generateTags';
import { generateUniqueUsername } from '@utils/handleUser';
import { IGoogleDTO, ILoginResponse } from './LoginDTO';

@injectable()
class LoginGoogleService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(credential: string): Promise<ILoginResponse> {
    let user: User | undefined;
    const value = decode(credential);
    const googleUser = value as IGoogleDTO;

    if (!googleUser) {
      throw new AppError('Usuário inválido', 400);
    }

    user = await this.userRepository.findByGoogleId(googleUser.sub);

    if (!user) {
      const newUsername = await generateUniqueUsername(googleUser.name);

      const hashedPassword = await this.hashProvider.generateHash(
        googleUser.sub,
      );

      user = this.userRepository.create({
        id: v4(),
        name: googleUser.name,
        email: googleUser.email,
        username: newUsername,
        password: hashedPassword,
        picture: googleUser.picture,
        locale: googleUser.locale,
        google_id: googleUser.sub,
        tags: extractTagsFromText(`${newUsername} ${googleUser.name}`),
      });
    } else {
      user.name = googleUser.name;
      user.picture = googleUser.picture;
      user.tags = extractTagsFromText(
        `${user.username} ${googleUser.name}`,
      ) as unknown as string;
    }

    await this.userRepository.save(user);

    const accessToken = generateAccessToken(
      user.id_user,
      user.role_name as RoleOptions,
    );

    return {
      user,
      accessToken,
    };
  }
}

export { LoginGoogleService };
