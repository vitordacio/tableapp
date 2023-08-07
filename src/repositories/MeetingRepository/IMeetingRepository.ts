import { IMeeting } from '../../entities/Meeting/IMeeting';
import { Meeting } from '../../entities/Meeting/Meeting';

export interface IMeetingRepository {
  save(meeting: Meeting): Promise<Meeting>;
  create(data: IMeeting): Meeting;
  findById(id: string): Promise<Meeting | undefined>;
  delete(id: string): Promise<void>;
}
