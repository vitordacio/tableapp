import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Suggestion } from '@entities/Suggestion/Suggestion';

import { ISuggestionRepository } from '@repositories/SuggestionRepository/ISuggestionRepository';
import { ICreateSuggestionDTO } from './ICreateSuggestionServiceDTO';

@injectable()
class CreateSuggestionService {
  constructor(
    @inject('SuggestionRepository')
    private suggestionRepository: ISuggestionRepository,
  ) {}

  async execute({
    message,
    reqUser,
  }: ICreateSuggestionDTO): Promise<Suggestion> {
    const suggestion = this.suggestionRepository.create({
      id: v4(),
      user_id: reqUser.id,
      message,
    });

    await this.suggestionRepository.save(suggestion);

    return suggestion;
  }
}

export { CreateSuggestionService };
