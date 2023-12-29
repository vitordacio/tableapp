import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Block } from '@entities/Block/Block';

import { AppError } from '@utils/AppError';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IBlockDTO } from '../IBlockServiceDTO';

@injectable()
class CreateBlockService {
  constructor(
    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({ user_id, reqUser }: IBlockDTO): Promise<Block> {
    const alreadyBlocked = await this.blockRepository.findByAuthorAndReceiver(
      reqUser.id,
      user_id,
    );

    if (!alreadyBlocked) {
      throw new AppError('Usuário já está bloqueado.', 400);
    }

    const block = this.blockRepository.create({
      id: v4(),
      author_id: reqUser.id,
      receiver_id: user_id,
    });

    await this.blockRepository.save(block);

    return block;
  }
}

export { CreateBlockService };
