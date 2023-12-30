import { IBlock } from '@entities/Block/IBlock';
import { Block } from '@entities/Block/Block';

export interface IBlockRepository {
  save(block: Block): Promise<Block>;
  create(data: IBlock): Block;
  findById(id: string): Promise<Block | undefined>;
  findByAuthorAndReceiver(
    author_id: string,
    receiver_id: string,
  ): Promise<Block | undefined>;
  findByUser(user_id: string): Promise<Block[]>;
  checkBlocks(user_id: string, friend_ids: string[]): Promise<Block[]>;
  remove(entitie: Block): Promise<void>;
}
