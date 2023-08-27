import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { pubPerm, userPerm } from '@config/constants';
import { FindFriendshipByIdService } from '@services/Friendship/FindFriendship/FindFriendshipByIdService';

class FindFriendshipByIdController {
  private findFriendshipByIdService: FindFriendshipByIdService;

  constructor() {
    this.findFriendshipByIdService = container.resolve(
      FindFriendshipByIdService,
    );
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const friendshipInstance = await this.findFriendshipByIdService.execute(
      id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(friendshipInstance));
  }
}

export { FindFriendshipByIdController };
