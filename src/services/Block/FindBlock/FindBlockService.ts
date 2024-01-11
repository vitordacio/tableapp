import { inject, injectable } from 'tsyringe';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IBlockDTO } from '../IBlockServiceDTO';

@injectable()
class FindBlockService {
  constructor(
    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({ user_id, reqUser }: IBlockDTO): Promise<boolean> {
    const block = await this.blockRepository.findByAuthorAndReceiver(
      reqUser.id,
      user_id,
    );

    return !!block;
  }
}

export { FindBlockService };
