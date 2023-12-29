import { inject, injectable } from 'tsyringe';
import { AppError } from '@utils/AppError';
import { IReportRepository } from '@repositories/ReportRepository/IReportRepository';

@injectable()
class DeleteReportService {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportRepository,
  ) {}

  async execute(
    report_id: string,
    reqUser: AuthorizedUser<UserPerm | PubPerm>,
  ): Promise<void> {
    const report = await this.reportRepository.findById(report_id);

    if (!report || report.author_id !== reqUser.id) {
      throw new AppError('Denúncia não encontrada.', 404);
    }

    await this.reportRepository.remove(report);
  }
}

export { DeleteReportService };
