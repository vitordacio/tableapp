import { IUser } from '../../entities/User/IUser';
import { User } from '../../entities/User/User';

export interface IUserRepository {
  create(data: IUser): User;
  save(user: User): Promise<User>;
  saveMany(users: User[]): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findIndex(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByGoogleId(google_id: string): Promise<User | undefined>;
  findSearch(query: string, page: number, limit: number): Promise<User[]>;
  findByRole(role: string): Promise<User[]>;
  delete(id: string): Promise<void>;
  remove(entitie: User): Promise<void>;
  checkFriends(user_id: string, friend_ids: string[]): Promise<User[]>;
  findFriendsByUserId(
    id: string,
    page: number,
    limit: number,
    name: string,
  ): Promise<User[]>;
  findLatestFriendsByUserId(
    id: string,
    page: number,
    limit: number,
  ): Promise<User[]>;
}
