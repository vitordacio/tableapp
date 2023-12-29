import { getRepository, Repository } from 'typeorm';
import { IReact } from '@entities/React/IReact';
import { React } from '@entities/React/React';
import { IReactRepository } from '../IReactRepository';

class ReactRepository implements IReactRepository {
  private ormRepository: Repository<React>;

  constructor() {
    this.ormRepository = getRepository(React);
  }

  create(data: IReact): React {
    const react = this.ormRepository.create({
      id_react: data.id,
      type: data.type,
      message: data.message,
      emoji_id: data.emoji_id,
      author_id: data.author_id,
      receiver_id: data.receiver_id,
      event_id: data.event_id,
    });

    return react;
  }

  async save(react: React): Promise<React> {
    const newReact = await this.ormRepository.save(react);

    return newReact;
  }

  async findById(id: string): Promise<React | undefined> {
    const react = await this.ormRepository.findOne({
      relations: ['emoji', 'author', 'receiver', 'event'],
      where: { id_react: id },
    });

    return react;
  }

  async findByUsers(
    author_id: string,
    receiver_id: string,
  ): Promise<React | undefined> {
    const react = await this.ormRepository.findOne({
      where: { type: 'user', author_id, receiver_id },
    });

    return react;
  }

  async findToRemove(id: string): Promise<React | undefined> {
    const event = await this.ormRepository.findOne({
      relations: ['notifications', 'emoji', 'author', 'receiver', 'event'],
      where: { id_react: id },
    });

    return event;
  }

  async remove(entitie: React): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ReactRepository };
