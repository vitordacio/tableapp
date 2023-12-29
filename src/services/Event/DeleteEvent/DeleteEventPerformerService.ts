import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';
import { IPerformerRepository } from '@repositories/PerformerRepository/IPerformerRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IDeleteEventPerformerDTO } from './IDeleteEventServiceDTO';

@injectable()
class DeleteEventPerformerService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PerformerRepository')
    private performerRepository: IPerformerRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,
  ) {}

  async execute({
    performer_id,
    reqUser,
  }: IDeleteEventPerformerDTO): Promise<void> {
    const [requester, performer] = await Promise.all([
      this.userRepository.findById(reqUser.id),
      this.performerRepository.findById(performer_id),
    ]);

    if (!requester) {
      throw new AppError(
        'Token expirado, por favor realize o login novamente.',
        400,
      );
    }

    if (!performer) {
      throw new AppError('Artista não encontrado.', 404);
    }

    if (reqUser.id !== performer.event.author_id) {
      const auth = await this.participationRepository.checkMod(
        reqUser.id,
        performer.event_id,
      );

      if (!auth) {
        throw new AppError('Não autorizado.', 403);
      }
    }

    await this.performerRepository.remove(performer);
  }
}

export { DeleteEventPerformerService };
