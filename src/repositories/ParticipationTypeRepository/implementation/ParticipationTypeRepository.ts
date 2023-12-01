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
      name: data.name.toLowerCase(),
    });

    return participationType;
  }

  async save(entitie: ParticipationType): Promise<ParticipationType> {
    const newParticipationType = await this.ormRepository.save(entitie);

    return newParticipationType;
  }

  async findByName(name: string): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    return participationType;
  }

  async findById(id: string): Promise<ParticipationType | undefined> {
    const participationType = await this.ormRepository.findOne({
      where: { id_participation_type: id },
    });

    return participationType;
  }

  async findIndex(): Promise<ParticipationType[]> {
    const participationType = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return participationType;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: ParticipationType): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }

  async saveMany(entities: ParticipationType[]): Promise<ParticipationType[]> {
    const newTypes = await this.ormRepository.save(entities);

    return newTypes;
  }
}

export { ParticipationTypeRepository };
