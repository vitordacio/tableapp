import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { ISuggestionRepository } from '@repositories/SuggestionRepository/ISuggestionRepository';

@injectable()
class DeleteSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,
  ) {}

  async execute(
    suggestion_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const suggestion = await this.suggestionRepository.findById(suggestion_id);

    if (!suggestion || suggestion.user_id !== reqUser.id) {
      throw new AppError('Sugestão não encontrada.', 404);
    }

    await this.suggestionRepository.remove(suggestion);
  }
}

export { DeleteSuggestionService };
