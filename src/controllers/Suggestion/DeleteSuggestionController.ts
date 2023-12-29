import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { DeleteSuggestionService } from '@services/Suggestion/DeleteSuggestion/DeleteSuggestionService';

class DeleteSuggestionController {
  private deleteSuggestionService: DeleteSuggestionService;

  constructor() {
    this.deleteSuggestionService = container.resolve(DeleteSuggestionService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { seggestion_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const suggestionInstance = await this.deleteSuggestionService.execute(
      seggestion_id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(suggestionInstance));
  }
}

export { DeleteSuggestionController };
