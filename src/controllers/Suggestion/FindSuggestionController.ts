import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { FindSuggestionService } from '@services/Suggestion/FindSuggestion/FindSuggestionService';

class FindSuggestionController {
  private findSuggestionService: FindSuggestionService;

  constructor() {
    this.findSuggestionService = container.resolve(FindSuggestionService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { seggestion_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const suggestionInstance = await this.findSuggestionService.execute(
      seggestion_id,
      req.user,
    );

    return res.status(200).json(instanceToPlain(suggestionInstance));
  }
}

export { FindSuggestionController };
