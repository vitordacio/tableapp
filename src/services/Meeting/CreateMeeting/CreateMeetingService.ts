import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { Meeting } from '@entities/Meeting/Meeting';
import { IMeetingRepository } from '@repositories/MeetingRepository/IMeetingRepository';
import { IUserRepository } from '@repositories/UserRepository/IUserRepository';
import { IMeetingTypeRepository } from '@repositories/MeetingTypeRepository/IMeetingTypeRepository';

import { AppError } from '@utils/AppError';
import { ICreateMeetingDTO } from './CreateMeetingServiceDTO';

@injectable()
class CreateMeetingService {
  constructor(
    @inject('MeetingRepository')
    private meetingRepository: IMeetingRepository,

    @inject('MeetingTypeRepository')
    private meetingTypeRepository: IMeetingTypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    type_id,
    name,
    location,
    description,
    user,
  }: ICreateMeetingDTO): Promise<Meeting> {
    const owner = await this.userRepository.findById(user.id);

    if (!owner) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const meetingType = await this.meetingTypeRepository.findById(type_id);

    if (!meetingType) {
      throw new AppError('Tipo não encontrado.', 404);
    }

    const meeting = this.meetingRepository.create({
      id: v4(),
      type_id,
      name,
      location,
      description,
      owner_id: user.id,
    });

    await this.meetingRepository.save(meeting);

    return meeting;
  }
}

export { CreateMeetingService };
