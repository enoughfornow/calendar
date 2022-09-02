import React from 'react';
import { Calendar } from './components/Calendar/Calendar';
import './static/css/global.css';
import { createYear } from './utils/helpers/date/createYear';
import { getMonthsNames } from './utils/helpers/date/getMonthsNames';

console.log('createYearMonthes', getMonthsNames);

export const App: React.FC = () => {
  const [selectedDate, selectDate] = React.useState(new Date());
  return (
    <div className="app__container">
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  );
};
