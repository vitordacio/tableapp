import { inject, injectable } from 'tsyringe';
import { React } from '@entities/React/React';
import { IReactRepository } from '@repositories/ReactRepository/IReactRepository';
import { AppError } from '@utils/AppError';

@injectable()
class FindReactByIdService {
  constructor(
    @inject('ReactRepository')
    private reactRepository: IReactRepository,
  ) {}

  async execute(react_id: string): Promise<React> {
    const react = await this.reactRepository.findById(react_id);

    if (!react) {
      throw new AppError('React não encontrado.', 404);
    }

    return react;
  }
}

export { FindReactByIdService };
