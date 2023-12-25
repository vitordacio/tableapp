import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { CreateUserService } from '../../services/User/CreateUser/CreateUserService';

class CreateUserController {
  private createUserService: CreateUserService;

  constructor() {
    this.createUserService = container.resolve(CreateUserService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, username, password } = req.body;

    const userInstance = await this.createUserService.execute({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      password,
    });

    return res.status(201).json(instanceToPlain(userInstance));
  }
}

export { CreateUserController };
