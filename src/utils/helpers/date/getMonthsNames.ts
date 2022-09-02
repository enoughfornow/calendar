import { createDate } from './createDate';

export const getMonthsNames = (locale: string = 'default') => {
  const monthsNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
    date: ReturnType<typeof createDate>['date'];
  }[] = Array.from({ length: 12 });

  const d = new Date();

  monthsNames.forEach((_, i) => {
    const { month, monthShort, monthIndex, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, d.getDate()),
    });
    monthsNames[monthIndex] = { month, monthShort, monthIndex, date };
  });

  return monthsNames;
};
