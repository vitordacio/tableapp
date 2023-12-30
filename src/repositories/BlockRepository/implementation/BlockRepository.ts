import { getRepository, Repository } from 'typeorm';
import { IBlock } from '@entities/Block/IBlock';
import { Block } from '@entities/Block/Block';
import { IBlockRepository } from '../IBlockRepository';

class BlockRepository implements IBlockRepository {
  private ormRepository: Repository<Block>;

  constructor() {
    this.ormRepository = getRepository(Block);
  }

  create(data: IBlock): Block {
    const block = this.ormRepository.create({
      id_block: data.id,
      author_id: data.author_id,
      receiver_id: data.receiver_id,
    });

    return block;
  }

  async save(block: Block): Promise<Block> {
    const newBlock = await this.ormRepository.save(block);

    return newBlock;
  }

  async findById(id: string): Promise<Block | undefined> {
    const block = await this.ormRepository.findOne({
      where: { id_block: id },
    });

    return block;
  }

  async findByAuthorAndReceiver(
    author_id: string,
    receiver_id: string,
  ): Promise<Block | undefined> {
    const block = await this.ormRepository.findOne({
      where: { author_id, receiver_id },
    });

    return block;
  }

  async findByUser(user_id: string): Promise<Block[]> {
    const block = await this.ormRepository.find({
      where: { author_id: user_id },
    });

    return block;
  }

  async checkBlocks(user_id: string, friend_ids: string[]): Promise<Block[]> {
    const friendships = await this.ormRepository
      .createQueryBuilder('block')
      .where(
        '(block.author_id IN(:...friend_ids) AND block.receiver_id = :user_id)',
        {
          user_id,
          friend_ids,
        },
      )
      .getMany();

    return friendships;
  }

  async remove(entitie: Block): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { BlockRepository };
