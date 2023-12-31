import { Brackets, getRepository, Repository } from 'typeorm';
import { IReact } from '@entities/React/IReact';
import { React } from '@entities/React/React';
import { extractTagsFromText } from '@utils/generateTags';
import { IReactRepository } from '../IReactRepository';

const similarity = 0.3;

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

  async findReactUser(
    author_id: string,
    receiver_id: string,
  ): Promise<React | undefined> {
    const react = await this.ormRepository.findOne({
      relations: ['emoji', 'receiver'],
      where: { type: 'user', author_id, receiver_id },
    });

    return react;
  }

  async findReactEvent(
    author_id: string,
    event_id: string,
  ): Promise<React | undefined> {
    const react = await this.ormRepository.findOne({
      relations: ['emoji'],
      where: { type: 'event', author_id, event_id },
    });

    return react;
  }

  async findByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<React[]> {
    const reacts = await this.ormRepository.find({
      relations: ['emoji', 'receiver', 'event', 'event.type'],
      where: { author_id: user_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return reacts;
  }

  async findReceivedsByUserId(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<React[]> {
    const reacts = await this.ormRepository.find({
      relations: ['emoji', 'author'],
      where: { type: 'user', receiver_id: user_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return reacts;
  }

  async findReceivedsByEventId(
    event_id: string,
    page: number,
    limit: number,
  ): Promise<React[]> {
    const reacts = await this.ormRepository.find({
      relations: ['emoji', 'author'],
      where: { type: 'event', event_id },
      order: { created_at: 'DESC' },
      take: limit,
      skip: page && limit ? limit * (page - 1) : undefined,
    });

    return reacts;
  }

  async findByUserIdAndName(
    id: string,
    page: number,
    limit: number,
    name: string,
  ): Promise<React[]> {
    let tagName: string[] = [];
    tagName = extractTagsFromText(name);

    const conditions =
      tagName.length !== 0
        ? tagName
            .map(
              word =>
                `similarity(unaccent(LOWER(tag)), unaccent(lower('${word}'))) > ${similarity}`,
            )
            .join(' OR ')
        : null;

    const reacts = await this.ormRepository
      .createQueryBuilder('react')
      .leftJoinAndSelect('react.emoji', 'emoji')
      .leftJoinAndSelect('react.author', 'author')
      .where(
        new Brackets(qb => {
          qb.where(
            `${
              conditions
                ? `(react.receiver_id = :user_id AND EXISTS (SELECT 1 FROM unnest(author.tags) tag WHERE ${conditions}))`
                : '(react.receiver_id = :user_id AND (:nullName::text IS NULL OR EXISTS (SELECT 1 FROM unnest(author.tags) tag WHERE unaccent(LOWER(tag)) ~~ unaccent(:query))))'
            }`,
            {
              user_id: id,
              query: `%${name}%`,
              nullName: name,
            },
          );

          return qb;
        }),
      )
      .addSelect(
        `(SELECT count(*) FROM unnest(author.tags) as tag WHERE ${conditions})`,
        'qtd',
      )
      .orderBy('qtd', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return reacts;
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
