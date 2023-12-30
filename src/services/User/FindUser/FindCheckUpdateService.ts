import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IUserUpdateRepository } from '@repositories/UserUpdateRepository/IUserUpdateRepository';
import { verifyCanUpdate } from '@utils/handleDate';
import { AppError } from '@utils/AppError';
import { UserUpdate } from '@entities/UserUpdate/UserUpdate';
import { IFindCheckUpdateServiceDTO } from './IFindUsersServiceDTO';

type CheckUpdateResponse = {
  canUpdate: boolean;
  update: UserUpdate | null;
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
    const response: CheckUpdateResponse = {
      canUpdate: false,
      update: null,
    };

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

    let days = 0;
    if (type === 'name') days = 7;
    if (type === 'email') days = 30;
    if (type === 'username') days = 30;
    if (type === 'password') days = 5;

    response.canUpdate = lastUpdate
      ? verifyCanUpdate({
          lastUpdate,
          days,
        })
      : true;

    if (lastUpdate) response.update = lastUpdate;

    return response;
  }
}

export { FindCheckUpdateService };
