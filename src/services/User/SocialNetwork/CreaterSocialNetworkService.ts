import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { ISocialNetworkRepository } from '@repositories/SocialNetworkRepository/ISocialNetworkRepository';
import { ISocialNetworkTypeRepository } from '@repositories/SocialNetworkTypeRepository/ISocialNetworkTypeRepository';
import { AppError } from '@utils/AppError';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { SocialNetwork } from '@entities/SocialNetwork/SocialNetwork';
import { User } from '@entities/User/User';
import { ICreateSocialNetworkDTO } from './ISocialNetworkDTO';

@injectable()
class CreateSocialNetworkService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('SocialNetworkRepository')
    private socialNetworkRepository: ISocialNetworkRepository,

    @inject('SocialNetworkTypeRepository')
    private socialNetworkTypeRepository: ISocialNetworkTypeRepository,
  ) {}

  async execute({
    username,
    type_id,
    user,
  }: ICreateSocialNetworkDTO): Promise<User> {
    let social: SocialNetwork | undefined;
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const socialType = await this.socialNetworkTypeRepository.findById(type_id);

    if (!socialType) {
      throw new AppError('Tipo de rede social não encontrada.', 404);
    }

    if (foundUser.social_networks.length !== 0) {
      social = foundUser.social_networks.find(
        userSocial => userSocial.type_id === type_id,
      );

      if (social) {
        throw new AppError('Rede social já cadastrada.', 400);
      }
    }

    social = this.socialNetworkRepository.create({
      id: v4(),
      username,
      type_id: socialType.id_social_network_type,
      user_id: user.id,
    });

    await this.socialNetworkRepository.save(social);

    socialType.count += 1;
    await this.socialNetworkTypeRepository.save(socialType);

    social.type = socialType;
    foundUser.social_networks = [...foundUser.social_networks, social];

    return foundUser;
  }
}

export { CreateSocialNetworkService };
