import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Participation } from '@entities/Participation/Participation';
import { IMeetingRepository } from '@repositories/MeetingRepository/IMeetingRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IParticipationRepository } from '@repositories/ParticipationRepository/IParticipationRepository';

import { AppError } from '@utils/AppError';
import { ICreateParticipationDTO } from './CreateParticipationServiceDTO';

@injectable()
class CreateParticipationService {
  constructor(
    @inject('MeetingRepository')
    private meetingRepository: IMeetingRepository,

    @inject('ParticipationRepository')
    private participationRepository: IParticipationRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    meeting_id,
    user,
  }: ICreateParticipationDTO): Promise<Participation> {
    let participation: Participation | undefined;
    return 'a';
    const foundUser = await this.userRepository.findById(user.id);

    if (!foundUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const Meeting = await this.MeetingRepository.findById(Meeting_id);

    if (!Meeting) {
      throw new AppError('Meetingo não encontrado.', 404);
    }

    participation = await this.participationRepository.findByUserAndMeeting(
      user.id,
      Meeting.id_Meeting,
    );

    // if (participation) {
    //   participation.accepted = true;
    // } else {
    //   participation = this.participationRepository.create({
    //     id: v4(),
    //     Meeting_id,
    //     user_id: user.id,
    //   });
    // }

    await this.participationRepository.save(participation);

    return Participation;
  }
}

export { CreateParticipationService };
