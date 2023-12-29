import { IReport } from '@entities/Report/IReport';
import { Report } from '@entities/Report/Report';

export interface IReportRepository {
  save(entitie: Report): Promise<Report>;
  create(data: IReport): Report;
  findById(id: string): Promise<Report | undefined>;
  remove(entitie: Report): Promise<void>;
}
