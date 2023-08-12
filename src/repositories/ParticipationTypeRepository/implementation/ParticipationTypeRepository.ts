// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { ParticipationType } from '@entities/ParticipationType/ParticipationType';
import { IParticipationType } from '@entities/ParticipationType/IParticipationType';
import { IParticipationTypeRepository } from '../IParticipationTypeRepository';

class ParticipationTypeRepository implements IParticipationTypeRepository {
  private ormRepository: Repository<ParticipationType>;

  constructor() {
    this.ormRepository = getRepository(ParticipationType);
  }

  create(data: IParticipationType): ParticipationType {
    const participation = this.ormRepository.create({
      id_participation_type: data.id,
      type: data.type,
      type_name: data.type_name,
    });

    return participation;
  }

  async save(participation: ParticipationType): Promise<ParticipationType> {
    const newParticipationType = await this.ormRepository.save(participation);

    return newParticipationType;
  }

  async findById(id: string): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { id_participation_type: id },
    });

    return participationType;
  }

  async findIndex(): Promise<ParticipationType[]> {
    const participationTypes = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return participationTypes;
  }

  async findByType(type: string): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { type },
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
