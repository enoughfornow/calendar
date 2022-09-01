import { createDate } from './createDate';

interface CreateMonthParams {
  date?: Date;
  locale?: string;
}

export const createMonth = (params?: CreateMonthParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;
  const getDay = (dayNumber: number) => {
    return createDate({ date: new Date(year, monthIndex, dayNumber), locale });
    const createMonthDays = () => {
      const days = [];
    };
  };
};
