// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { MeetingType } from '@entities/MeetingType/MeetingType';
import { IMeetingType } from '@entities/MeetingType/IMeetingType';
import { IMeetingTypeRepository } from '../IMeetingTypeRepository';

class MeetingTypeRepository implements IMeetingTypeRepository {
  private ormRepository: Repository<MeetingType>;

  constructor() {
    this.ormRepository = getRepository(MeetingType);
  }

  create(data: IMeetingType): MeetingType {
    const meeting = this.ormRepository.create({
      id_meeting_type: data.id,
      type: data.type,
      type_name: data.type_name,
    });

    return meeting;
  }

  async save(meeting: MeetingType): Promise<MeetingType> {
    const newMeetingType = await this.ormRepository.save(meeting);

    return newMeetingType;
  }

  async findById(id: string): Promise<MeetingType | undefined> {
    const meetingType = await this.ormRepository.findOne({
      where: { id_meeting_type: id },
    });

    return meetingType;
  }

  async findByType(type: string): Promise<MeetingType | undefined> {
    const meetingType = await this.ormRepository.findOne({
      where: { type },
    });

    return meetingType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: MeetingType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { MeetingTypeRepository };
