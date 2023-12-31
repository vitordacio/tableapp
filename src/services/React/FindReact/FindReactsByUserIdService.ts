import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IFindByUserIdDTO } from './IFindReactsDTO';

@injectable()
class FindReactsByUserIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,
  ) {}

  async execute({ user_id, limit, page }: IFindByUserIdDTO): Promise<React[]> {
    const reacts = await this.reactRepository.findByUserId(
      user_id,
      page || 1,
      limit || 20,
    );

    return reacts;
  }
}

export { FindReactsByUserIdService };
