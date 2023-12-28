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

type verifyCanUpdateDate = {
  startDate: Date;
  finishDate: Date;
  days: number;
};

export const verifyCanUpdateDate = ({
  startDate,
  finishDate,
  days,
}: verifyCanUpdateDate): boolean => {
  const daysDifference = verifyDifferenceInDays({ startDate, finishDate });
  if (daysDifference < days) return false;

  return true;
};
