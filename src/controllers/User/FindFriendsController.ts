import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindFriendsService } from '@services/User/FindFriends/FindFriendsService';

class FindFriendsController {
  private findFriendshipByUserIdService: FindFriendsService;

  constructor() {
    this.findFriendshipByUserIdService = container.resolve(FindFriendsService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, page, limit } = req.query;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const friendshipInstance = await this.findFriendshipByUserIdService.execute(
      {
        friend_id: id,
        user: req.user,
        name: name as string,
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
      },
    );

    return res.status(201).json(instanceToPlain(friendshipInstance));
  }
}

export { FindFriendsController };
