import { inject, injectable } from 'tsyringe';

import { Block } from '@entities/Block/Block';

import { AppError } from '@utils/AppError';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IBlockDTO } from '../IBlockServiceDTO';

@injectable()
class FindBlockService {
  constructor(
    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({ user_id, reqUser }: IBlockDTO): Promise<Block> {
    const block = await this.blockRepository.findByAuthorAndReceiver(
      reqUser.id,
      user_id,
    );

    if (!block) {
      throw new AppError('Bloqueio não encontrado.', 404);
    }

    return block;
  }
}

export { FindBlockService };
