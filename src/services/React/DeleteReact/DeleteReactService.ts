import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IEventRepository } from '@repositories/EventRepository/IEventRepository';
import { IDeleteReactDTO } from './IDeleteReactServiceDTO';

@injectable()
class DeleteReactService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('EventRepository')
    private eventRepository: IEventRepository,
  ) {}

  async execute({ react_id, reqUser }: IDeleteReactDTO): Promise<void> {
    const react = await this.reactRepository.findToRemove(react_id);

    if (!react) {
      throw new AppError('Reação não encontrada.', 404);
    }

    if (react.type === 'user') {
      if (![react.author_id, react.receiver_id].includes(reqUser.id)) {
        throw new AppError('Não autorizado.', 403);
      }

      react.receiver.reacts_count -= 1;
      await this.userRepository.save(react.receiver);
    }

    // if (
    //   react.type === 'user' &&
    //   ![react.author_id, react.receiver_id].includes(reqUser.id)
    // ) {
    //   throw new AppError('Não autorizado.', 403);
    // }

    if (react.type === 'event') {
      let auth = false;

      if ([react.author_id, react.event.author_id].includes(reqUser.id))
        auth = true;

      if (!auth) {
        const participation = await this.participationRepository.checkMod(
          reqUser.id,
          react.event_id,
        );

        if (participation) auth = true;
      }

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }

      react.event.reacts_count -= 1;
      await this.eventRepository.save(react.event);
    }

    await this.reactRepository.remove(react);
  }
}

export { DeleteReactService };
