// import { Brackets, getRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';
import { IUser } from '@entities/User/IUser';
import { User } from '@entities/User/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  findByDocument(doc: string, roleName: string): Promise<User | undefined> {
    const user = this.ormRepository
      .createQueryBuilder('user')
      .where('(user.role_name = :roleName OR :nullRole::text IS NULL)', {
        roleName,
        nullRole: roleName,
      })
      .andWhere({ document: doc })
      .getOne();
    return user;
  }

  // create(data: IUser): User {
  //   const user = this.ormRepository.create({
  //     avatar: data.avatar,
  //     email: data.email,
  //     id_user: data.id,
  //     name: data.name,
  //     surname: data.surname,
  //     document: data.document,
  //     phone: data.phone,
  //     password: data.password,
  //     role_name: data.role,
  //     address: data.address,
  //     permissions: data.permissions,
  //   });

  //   return user;
  // }

  create(data: IUser): User {
    const user = this.ormRepository.create({
      id_user: data.id,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    return user;
  }

  async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  async findByEmail(email: string, role?: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      // relations: ['permissions', 'vehicles', 'address'],
      where: { email, role_name: role },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      // relations: ['permissions', 'vehicles', 'address'],
      where: { username },
    });

    return user;
  }

  // async findByEmail(
  //   email: string,
  //   roleName: string,
  // ): Promise<User | undefined> {
  //   const query = await this.ormRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.permissions', 'permissions')
  //     .leftJoinAndSelect('user.vehicles', 'vehicle')
  //     .leftJoinAndSelect('user.workshop', 'workshop')
  //     .leftJoinAndSelect('user.address', 'address')
  //     .where('(user.role_name = :roleName OR :nullRole::text IS NULL)', {
  //       roleName,
  //       nullRole: roleName,
  //     });

  //   if (roleName === 'workshop') {
  //     query.andWhere(
  //       new Brackets(qb => {
  //         qb.where('LOWER(user.email) = :email', {
  //           email: email.toLowerCase(),
  //         }).orWhere('workshop.cnpj = :cnpj', { cnpj: email });

  //         return qb;
  //       }),
  //     );
  //   }

  //   if (roleName === 'user') {
  //     query.andWhere(
  //       new Brackets(qb => {
  //         qb.where('LOWER(user.email) = :email', {
  //           email: email.toLowerCase(),
  //         });

  //         qb.orWhere('user.document = :document', { document: email });

  //         return qb;
  //       }),
  //     );
  //   }

  //   if (roleName === 'admnistrator' || roleName === 'master') {
  //     query.andWhere('LOWER(user.email) = :email', {
  //       email: email.toLowerCase(),
  //     });
  //   }

  //   const user = await query.getOne();

  //   return user;
  // }

  async findByPhone(
    phone: string,
    roleName: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository
      .createQueryBuilder('user')
      .where('(user.role_name = :roleName OR :nullRole::text IS NULL)', {
        roleName,
        nullRole: roleName,
      })
      .andWhere('user.phone = :phone', { phone })
      .getOne();

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      // relations: ['permissions', 'vehicles', 'address'],
      where: { id_user: id },
    });

    return user;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      relations: ['permissions'],
      where: { role_name: role },
    });

    return users;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async remove(entitie: User): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { UserRepository };
