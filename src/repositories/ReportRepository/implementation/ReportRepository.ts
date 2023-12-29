import { getRepository, Repository } from 'typeorm';
import { IReport } from '@entities/Report/IReport';
import { Report } from '@entities/Report/Report';
import { IReportRepository } from '../IReportRepository';

class ReportRepository implements IReportRepository {
  private ormRepository: Repository<Report>;

  constructor() {
    this.ormRepository = getRepository(Report);
  }

  create(data: IReport): Report {
    const report = this.ormRepository.create({
      id_report: data.id,
      type: data.type,
      message: data.message,
      author_id: data.author_id,
      receiver_id: data.receiver_id,
      event_id: data.event_id,
    });

    return report;
  }

  async save(report: Report): Promise<Report> {
    const newReport = await this.ormRepository.save(report);

    return newReport;
  }

  async findById(id: string): Promise<Report | undefined> {
    const report = await this.ormRepository.findOne({
      where: { id_report: id },
    });

    return report;
  }

  async remove(entitie: Report): Promise<void> {
    await this.ormRepository.softRemove(entitie);
  }
}

export { ReportRepository };
