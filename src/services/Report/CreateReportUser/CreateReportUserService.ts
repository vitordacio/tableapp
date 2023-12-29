import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { Report } from '@entities/Report/Report';
import { IReportRepository } from '@repositories/ReportRepository/IReportRepository';
import { ICreateReportUserDTO } from './ICreateReportUserServiceDTO';

@injectable()
class CreateReportUserService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,
  ) {}

  async execute({
    message,
    user_id,
    reqUser,
  }: ICreateReportUserDTO): Promise<Report> {
    const report = this.reportRepository.create({
      id: v4(),
      type: 'user',
      message,
      author_id: reqUser.id,
      receiver_id: user_id,
    });

    await this.reportRepository.save(report);

    return report;
  }
}

export { CreateReportUserService };
