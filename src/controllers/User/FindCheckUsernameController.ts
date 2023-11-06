import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { FindCheckUsernameService } from '@services/User/FindUser/FindCheckUsernameService';

class FindCheckUsernameController {
  private findCheckUsernameService: FindCheckUsernameService;

  constructor() {
    this.findCheckUsernameService = container.resolve(FindCheckUsernameService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const userInstance = await this.findCheckUsernameService.execute(username);

    return res.status(200).json(instanceToPlain(userInstance));
  }
}

export { FindCheckUsernameController };
