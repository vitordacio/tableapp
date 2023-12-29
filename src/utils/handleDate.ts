import { UserUpdate } from '@entities/UserUpdate/UserUpdate';

type verifyDifferenceInDays = {
  startDate: Date;
  finishDate: Date;
};

export const verifyDifferenceInDays = ({
  startDate,
  finishDate,
}: verifyDifferenceInDays): number => {
  const timeDifference: number = startDate.getTime() - finishDate.getTime();

  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
};

type verifyCanUpdate = {
  lastUpdate: UserUpdate;
  days: number;
};

export const verifyCanUpdate = ({
  lastUpdate,
  days,
}: verifyCanUpdate): boolean => {
  const now = new Date();
  const daysDifference = verifyDifferenceInDays({
    startDate: lastUpdate.created_at,
    finishDate: now,
  });

  return daysDifference >= days;
};
