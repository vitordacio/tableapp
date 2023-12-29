import { inject, injectable } from 'tsyringe';

import { v4 } from 'uuid';
import { Report } from '@entities/Report/Report';

import { IReportRepository } from '@repositories/ReportRepository/IReportRepository';
import { ICreateReportEventDTO } from './ICreateReportEventServiceDTO';

@injectable()
class CreateReportEventService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,
  ) {}

  async execute({
    message,
    event_id,
    reqUser,
  }: ICreateReportEventDTO): Promise<Report> {
    const report = this.reportRepository.create({
      id: v4(),
      type: 'event',
      message,
      author_id: reqUser.id,
      event_id,
    });

    await this.reportRepository.save(report);

    return report;
  }
}

export { CreateReportEventService };
