import { IUser } from '../../entities/User/IUser';
import { User } from '../../entities/User/User';

export interface IUserRepository {
  save(user: User): Promise<User>;
  create(data: IUser): User;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string, role?: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByPhone(phone: string, role?: string): Promise<User | undefined>;
  findByDocument(doc: string, role?: string): Promise<User | undefined>;
  findByRole(role: string): Promise<User[]>;
  delete(id: string): Promise<void>;
  remove(entitie: User): Promise<void>;
}
