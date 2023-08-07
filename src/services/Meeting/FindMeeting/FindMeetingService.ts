import { inject, injectable } from 'tsyringe';

import { Meeting } from '@entities/Meeting/Meeting';
import { IMeetingRepository } from '@repositories/MeetingRepository/IMeetingRepository';

import { AppError } from '@utils/AppError';

@injectable()
class FindMeetingService {
  constructor(
    @inject('MeetingRepository')
    private meetingRepository: IMeetingRepository,
  ) {}

  async execute(meeting_id: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findById(meeting_id);

    if (!meeting) {
      throw new AppError('Evento não encontrado.', 404);
    }

    return meeting;
  }
}

export { FindMeetingService };
