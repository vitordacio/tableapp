import { IMeetingType } from '../../entities/MeetingType/IMeetingType';
import { MeetingType } from '../../entities/MeetingType/MeetingType';

export interface IMeetingTypeRepository {
  save(meeting: MeetingType): Promise<MeetingType>;
  create(data: IMeetingType): MeetingType;
  findById(id: string): Promise<MeetingType | undefined>;
  findByType(type: string): Promise<MeetingType | undefined>;
  delete(id: string): Promise<void>;
}
