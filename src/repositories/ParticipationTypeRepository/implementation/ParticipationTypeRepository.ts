// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IParticipationType } from '@entities/ParticipationType/IParticipationType';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { IParticipationTypeRepository } from '../IParticipationTypeRepository';

class ParticipationTypeRepository implements IParticipationTypeRepository {
  private ormRepository: Repository<ParticipationType>;

  constructor() {
    this.ormRepository = getRepository(ParticipationType);
  }

  create(data: IParticipationType): ParticipationType {
    const participationType = this.ormRepository.create({
      id_participation_type: data.id,
      type: data.type,
      type_name: data.type_name,
    });

    return participationType;
  }

  async save(participationType: ParticipationType): Promise<ParticipationType> {
    const newParticipationType = await this.ormRepository.save(
      participationType,
    );

    return newParticipationType;
  }

  async findById(id: string): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { id_event_interaction: id },
    });

    return participationType;
  }

  async findByUserAndEvent(
    user_id: string,
    event_id: string,
  ): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { user_id, event_id },
    });

    return participationType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: ParticipationType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ParticipationTypeRepository };
