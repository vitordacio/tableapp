import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindUserFriendsService } from '@services/User/FindUser/FindUserFriendsService';

class FindUserFriendsController {
  private findUserFriendshipByUserIdService: FindUserFriendsService;

  constructor() {
    this.findUserFriendshipByUserIdService = container.resolve(
      FindUserFriendsService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const friendshipInstance =
      await this.findUserFriendshipByUserIdService.execute({
        user_id,
        name: name as string,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        reqUser: req.user,
      });

    return res.status(201).json(instanceToPlain(friendshipInstance));
  }
}

export { FindUserFriendsController };
