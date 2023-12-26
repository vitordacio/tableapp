import { React } from '@entities/React/React';

export interface IEmoji {
  id: string;
  value: string;
  shorthand: string;
  order: number;
  type_id: string;
  reacts?: React[];
}
