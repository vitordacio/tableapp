import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { verifyCanUpdateDate } from '@utils/handleDate';
import { AppError } from '@utils/AppError';
import { UserUpdate } from '@entities/UserUpdate/UserUpdate';
import { IFindCheckUpdateServiceDTO } from './IFindUsersServiceDTO';

type CheckUpdateResponse = {
  canUpdate: boolean;
  update: UserUpdate | undefined;
};

@injectable()
class FindCheckUpdateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserUpdateRepository')
    private userUpdateRepository: IUserUpdateRepository,
  ) {}

  async execute({
    type,
    reqUser,
  }: IFindCheckUpdateServiceDTO): Promise<CheckUpdateResponse> {
    let update: UserUpdate | undefined;
    const [user, lastUpdate] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.userUpdateRepository.findLastByTypeAndUserId(type, reqUser.id),
    ]);

    if (!user) {
      throw new AppError(
        'Token expirado. Por favor, realize login novamente.',
        404,
      );
    }

    const canUpdate = lastUpdate
      ? verifyCanUpdateDate({
          lastUpdate: lastUpdate.created_at,
          days: 5,
        })
      : true;

    if (lastUpdate) update = lastUpdate;

    return {
      canUpdate,
      update,
    };
  }
}

export { FindCheckUpdateService };
