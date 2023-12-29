import { ISuggestion } from '@entities/Suggestion/ISuggestion';
import { Suggestion } from '@entities/Suggestion/Suggestion';

export interface ISuggestionRepository {
  save(block: Suggestion): Promise<Suggestion>;
  saveMany(users: Suggestion[]): Promise<Suggestion[]>;
  create(data: ISuggestion): Suggestion;
  findById(id: string): Promise<Suggestion | undefined>;
  remove(entitie: Suggestion): Promise<void>;
}
