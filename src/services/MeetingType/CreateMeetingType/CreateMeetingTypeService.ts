import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { MeetingType } from '@entities/MeetingType/MeetingType';
import { IMeetingTypeRepository } from '@repositories/MeetingTypeRepository/IMeetingTypeRepository';
import { AppError } from '@utils/AppError';
import { ICreateMeetingTypeDTO } from './CreateMeetingTypeServiceDTO';

@injectable()
class CreateMeetingTypeService {
  constructor(
    @inject('MeetingTypeRepository')
    private meetingTypeRepository: IMeetingTypeRepository,
  ) {}

  async execute({
    type,
    type_name,
  }: ICreateMeetingTypeDTO): Promise<MeetingType> {
    const foundMeetingType = await this.meetingTypeRepository.findByType(type);

    if (foundMeetingType) {
      throw new AppError('Tipo já cadastrado.', 400);
    }

    const meetingType = this.meetingTypeRepository.create({
      id: v4(),
      type,
      type_name,
    });

    await this.meetingTypeRepository.save(meetingType);

    return meetingType;
  }
}

export { CreateMeetingTypeService };
