import React from 'react';
import {
  createDate,
  createMonth,
  getMonthNumberOfDays,
  getMonthsNames,
  getWeekDaysNames,
} from '../../../utils/helpers/date';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDay: number;
}

export const useCalendar = ({
  firstWeekDay = 2,
  locale = 'default',
  selectedDate: date,
}: UseCalendarParams) => {
  const [mode, setMode] = React.useState<'days' | 'months' | 'years'>('days');
  const [selectedDate, setSelectedDate] = React.useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = React.useState(
    createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale }),
  );

  const [selectedYear, setSelectedYear] = React.useState(selectedDate.year);

  const monthNames = React.useMemo(() => getMonthsNames(locale), []);
  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDay, locale), []);
  const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  return {};
};
