import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IBlockDTO } from '../IBlockServiceDTO';

@injectable()
class DeleteBlockService {
  constructor(
    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({ user_id, reqUser }: IBlockDTO): Promise<void> {
    const block = await this.blockRepository.findByAuthorAndReceiver(
      reqUser.id,
      user_id,
    );

    if (!block) {
      throw new AppError('Bloqueio não encontrado.', 404);
    }

    await this.blockRepository.remove(block);
  }
}

export { DeleteBlockService };
