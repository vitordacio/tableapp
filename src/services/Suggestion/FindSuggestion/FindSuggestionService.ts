import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { ISuggestionRepository } from '@repositories/SuggestionRepository/ISuggestionRepository';
import { Suggestion } from '@entities/Suggestion/Suggestion';

@injectable()
class FindSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,
  ) {}

  async execute(
    suggestion_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Suggestion> {
    const suggestion = await this.suggestionRepository.findById(suggestion_id);

    if (!suggestion || suggestion.user_id !== reqUser.id) {
      throw new AppError('Sugestão não encontrada.', 404);
    }

    return suggestion;
  }
}

export { FindSuggestionService };
