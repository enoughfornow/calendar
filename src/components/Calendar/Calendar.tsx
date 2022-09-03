import React from 'react';

import { useCalendar } from './hooks/useCalendar';
import { checkDateIsEqual, checkIsToday } from '../../utils/helpers/date';

import './Calendar.css';
interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  setSelectedDate,
  selectedDate,
  firstWeekDay = 2,
}) => {
  const { state, functions } = useCalendar({ firstWeekDay, locale, selectedDate });

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div
          aria-hidden
          className="calendar__header__arrow__left"
          onClick={() => functions.onClickArrow('left')}
        />
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('months')}>
            {state.monthsNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} -{' '}
            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className="calendar__header__arrow__right"
          onClick={() => functions.onClickArrow('right')}
        />
      </div>
      <div className="calendar__body">
        {state.mode === 'days' && (
          <>
            <div className="calendar__week__names">
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className="calendar__days">
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                return (
                  <div
                    aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDay(day);
                    }}
                    className={[
                      'calendar__day',
                      isToday ? 'calendar__today__item' : '',
                      isSelectedDay ? 'calendar__selected__item' : '',
                      isAdditionalDay ? 'calendar__additional__day' : '',
                    ].join(' ')}>
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {state.mode === 'months' && (
          <div className="calendar__pick__item_container ">
            {state.monthsNames.map((monthsName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthsName.monthIndex &&
                new Date().getFullYear() === state.selectedYear;
              const isSelectedMonth = monthsName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthsName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentMonth ? 'calendar__today__item' : '',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                  ].join(' ')}>
                  {monthsName.monthShort}
                </div>
              );
            })}
          </div>
        )}
        {state.mode === 'years' && (
          <div className="calendar__pick__item_container ">
            <div className="calendar__unchoosable__year">{state.selectedYearsInterval[0] - 1}</div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : '',
                  ].join(' ')}>
                  {year}
                </div>
              );
            })}
            <div className="calendar__unchoosable__year">
              {(state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
