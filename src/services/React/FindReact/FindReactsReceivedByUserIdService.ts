import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IBlockRepository } from '@repositories/BlockRepository/IBlockRepository';
import { IFindReceivedByUserIdDTO } from './IFindReactsDTO';

@injectable()
class FindReactsReceivedByUserIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('BlockRepository')
    private blockRepository: IBlockRepository,
  ) {}

  async execute({
    user_id,
    name,
    page,
    limit,
    reqUser,
  }: IFindReceivedByUserIdDTO): Promise<React[]> {
    const reacts = name
      ? await this.reactRepository.findByUserIdAndName(
          user_id,
          page || 1,
          limit || 20,
          name,
        )
      : await this.reactRepository.findReceivedsByUserId(
          user_id,
          page || 1,
          limit || 20,
        );

    if (reacts.length !== 0) {
      const user_ids = reacts.map(react => react.author_id);

      const userBlocks = await this.blockRepository.checkBlocks(
        reqUser.id,
        user_ids,
      );

      if (userBlocks.length !== 0) {
        const block_ids = userBlocks.map(block => block.author_id);
        reacts.filter(react => !block_ids.includes(react.author_id));
      }
    }

    return reacts;
  }
}

export { FindReactsReceivedByUserIdService };
