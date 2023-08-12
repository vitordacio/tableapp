import { User } from '@entities/User/User';
import { Event } from '@entities/Event/Event';
import { IParticipationType } from '@entities/ParticipationType/IParticipationType';

export interface IParticipation {
  id: string;
  user: User;
  confirmed?: boolean;
  event: Event;
  type: IParticipationType;
  allower?: User;
}
