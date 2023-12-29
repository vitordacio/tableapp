import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { hasPermission } from '@utils/hasPermission';
import { AppError } from '@utils/AppError';
import { userPerm, pubPerm } from '@config/constants';
import { DeleteReportService } from '@services/Report/DeleteReport/DeleteReportService';

class DeleteReportController {
  private deleteReportService: DeleteReportService;

  constructor() {
    this.deleteReportService = container.resolve(DeleteReportService);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { report_id } = req.params;

    if (
      !hasPermission(req.user, userPerm) &&
      !hasPermission(req.user, pubPerm)
    ) {
      throw new AppError('Operação não permitida.', 403);
    }

    const reportInstance = await this.deleteReportService.execute(
      report_id,
      req.user,
    );

    return res.status(201).json(instanceToPlain(reportInstance));
  }
}

export { DeleteReportController };
