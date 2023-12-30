import { getRepository, Repository } from 'typeorm';
import { IUserUpdate } from '@entities/UserUpdate/IUserUpdate';
import { UserUpdate } from '@entities/UserUpdate/UserUpdate';
import { IUserUpdateRepository } from '../IUserUpdateRepository';

class UserUpdateRepository implements IUserUpdateRepository {
  private ormRepository: Repository<UserUpdate>;

  constructor() {
    this.ormRepository = getRepository(UserUpdate);
  }

  create(data: IUserUpdate): UserUpdate {
    const userUpdate = this.ormRepository.create({
      id_user_update: data.id,
      type: data.type,
      from: data.from,
      to: data.to,
      user_id: data.user_id,
    });

    return userUpdate;
  }

  async save(userUpdate: UserUpdate): Promise<UserUpdate> {
    const newUserUpdate = await this.ormRepository.save(userUpdate);

    return newUserUpdate;
  }

  async saveMany(userUpdates: UserUpdate[]): Promise<UserUpdate[]> {
    const newUserUpdates = await this.ormRepository.save(userUpdates);

    return newUserUpdates;
  }

  async findById(id: string): Promise<UserUpdate | undefined> {
    const userUpdate = await this.ormRepository.findOne({
      where: { id_user_update: id },
    });

    return userUpdate;
  }

  async findLastByTypeAndUserId(
    type: string,
    user_id: string,
  ): Promise<UserUpdate | undefined> {
    const userUpdates = await this.ormRepository.findOne({
      where: { type, user_id },
      order: { created_at: 'DESC' },
    });

    return userUpdates;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: UserUpdate): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { UserUpdateRepository };
