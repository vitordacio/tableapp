import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { CreateSuggestionService } from '@services/Suggestion/CreateSuggestion/CreateSuggestionService';

class CreateSuggestionController {
  private createSuggestionService: CreateSuggestionService;

  constructor() {
    this.createSuggestionService = container.resolve(CreateSuggestionService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { message } = req.body;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const suggestionInstance = await this.createSuggestionService.execute({
      message,
      reqUser: req.user,
    });

    return res.status(201).json(instanceToPlain(suggestionInstance));
  }
}

export { CreateSuggestionController };
