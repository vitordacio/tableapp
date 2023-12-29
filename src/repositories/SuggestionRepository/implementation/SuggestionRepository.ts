import { getRepository, Repository } from 'typeorm';
import { ISuggestion } from '@entities/Suggestion/ISuggestion';
import { Suggestion } from '@entities/Suggestion/Suggestion';
import { ISuggestionRepository } from '../ISuggestionRepository';

class SuggestionRepository implements ISuggestionRepository {
  private ormRepository: Repository<Suggestion>;

  constructor() {
    this.ormRepository = getRepository(Suggestion);
  }

  create(data: ISuggestion): Suggestion {
    const suggestion = this.ormRepository.create({
      id_suggestion: data.id,
      message: data.message,
      user_id: data.user_id,
    });

    return suggestion;
  }

  async save(suggestion: Suggestion): Promise<Suggestion> {
    const newSuggestion = await this.ormRepository.save(suggestion);

    return newSuggestion;
  }

  async saveMany(entities: Suggestion[]): Promise<Suggestion[]> {
    const suggestion = await this.ormRepository.save(entities);

    return suggestion;
  }

  async findById(id: string): Promise<Suggestion | undefined> {
    const suggestion = await this.ormRepository.findOne({
      where: { id_suggestion: id },
    });

    return suggestion;
  }

  async remove(entitie: Suggestion): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { SuggestionRepository };
