import { IUserUpdate } from '@entities/UserUpdate/IUserUpdate';
import { UserUpdate } from '@entities/UserUpdate/UserUpdate';

export interface IUserUpdateRepository {
  create(data: IUserUpdate): UserUpdate;
  save(user: UserUpdate): Promise<UserUpdate>;
  saveMany(userUpdates: UserUpdate[]): Promise<UserUpdate[]>;
  findById(id: string): Promise<UserUpdate | undefined>;
  findLastByTypeAndUserId(
    type: string,
    user_id: string,
  ): Promise<UserUpdate | undefined>;
  delete(id: string): Promise<void>;
  remove(entitie: UserUpdate): Promise<void>;
}
