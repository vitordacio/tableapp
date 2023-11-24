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
  findByName(name: string, page: number, limit: number): Promise<User[]>;
  findLatest(): Promise<User[]>;
  findByRole(role: string): Promise<User[]>;
  delete(id: string): Promise<void>;
  remove(entitie: User): Promise<void>;
}
