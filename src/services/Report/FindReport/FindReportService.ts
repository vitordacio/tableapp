import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IReportRepository } from '@repositories/ReportRepository/IReportRepository';
import { Report } from '@entities/Report/Report';

@injectable()
class FindReportService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,
  ) {}

  async execute(
    report_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<Report> {
    const report = await this.reportRepository.findById(report_id);

    if (!report || report.author_id !== reqUser.id) {
      throw new AppError('Sugestão não encontrada.', 404);
    }

    return report;
  }
}

export { FindReportService };
