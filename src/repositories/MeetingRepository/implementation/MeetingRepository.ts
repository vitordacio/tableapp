// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IMeeting } from '@entities/Meeting/IMeeting';
import { Meeting } from '@entities/Meeting/Meeting';
import { IMeetingRepository } from '../IMeetingRepository';

class MeetingRepository implements IMeetingRepository {
  private ormRepository: Repository<Meeting>;

  constructor() {
    this.ormRepository = getRepository(Meeting);
  }

  create(data: IMeeting): Meeting {
    const meeting = this.ormRepository.create({
      id_meeting: data.id,
      name: data.name,
      location: data.location,
      description: data.description,
      type_id: data.type_id,
      owner_id: data.owner_id,
    });

    return meeting;
  }

  async save(meeting: Meeting): Promise<Meeting> {
    const newMeeting = await this.ormRepository.save(meeting);

    return newMeeting;
  }

  async findById(id: string): Promise<Meeting | undefined> {
    const meeting = await this.ormRepository.findOne({
      where: { id_meeting: id },
    });

    return meeting;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Meeting): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { MeetingRepository };
