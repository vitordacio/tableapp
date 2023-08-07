// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IParticipation } from '@entities/Participation/IParticipation';
import { Participation } from '@entities/Participation/Participation';
import { IParticipationRepository } from '../IParticipationRepository';

class ParticipationRepository implements IParticipationRepository {
  private ormRepository: Repository<Participation>;

  constructor() {
    this.ormRepository = getRepository(Participation);
  }

  create(data: IParticipation): Participation {
    const participation = this.ormRepository.create({
      id_participation: data.id,
      going: data.going,
      description: data.description,
      meeting_id: data.meeting_id,
      user_id: data.user_id,
      type_id: data.type_id,
    });

    return participation;
  }

  async save(participation: Participation): Promise<Participation> {
    const newParticipation = await this.ormRepository.save(participation);

    return newParticipation;
  }

  async findById(id: string): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      where: { id_event_interaction: id },
    });

    return participation;
  }

  async findByUserAndEvent(
    user_id: string,
    meeting_id: string,
  ): Promise<Participation | undefined> {
    const participation = await this.ormRepository.findOne({
      where: { user_id, meeting_id },
    });

    return participation;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: Participation): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ParticipationRepository };
