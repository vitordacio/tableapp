import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindFriendshipByUserIdService } from '@services/Friendship/FindFriendship/FindFriendshipByUserIdService';

class FindFriendshipByUserIdController {
  private findFriendshipByUserIdService: FindFriendshipByUserIdService;

  constructor() {
    this.findFriendshipByUserIdService = container.resolve(
      FindFriendshipByUserIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const friendshipInstance = await this.findFriendshipByUserIdService.execute(
      user_id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(friendshipInstance));
  }
}

export { FindFriendshipByUserIdController };
