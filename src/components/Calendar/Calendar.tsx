import React from 'react';
import { useCalendar } from './hooks/useCalendar';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectDate,
  selectedDate,
  firstWeekDay = 2,
}) => {
  const {} = useCalendar({ firstWeekDay, locale, selectedDate });
  return <div>Calendar</div>;
};
