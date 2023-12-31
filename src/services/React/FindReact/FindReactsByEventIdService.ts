import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IFindByEventIdDTO } from './IFindReactsDTO';

@injectable()
class FindReactsByEventIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,
  ) {}

  async execute({
    event_id,
    limit,
    page,
  }: IFindByEventIdDTO): Promise<React[]> {
    const reacts = await this.reactRepository.findReceivedsByEventId(
      event_id,
      page || 1,
      limit || 20,
    );

    return reacts;
  }
}

export { FindReactsByEventIdService };
