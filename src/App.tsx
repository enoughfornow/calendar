import React from 'react';
import { Calendar } from './components/Calendar/Calendar';
import './static/css/global.css';
import { formateDate } from './utils/helpers/date';
import { createYear } from './utils/helpers/date/createYear';
import { getMonthsNames } from './utils/helpers/date/getMonthsNames';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  return (
    <div className="app__container">
      <div className="date__container">{formateDate(selectedDate, 'DD MM YYYY')}</div>
      {/* choose local */}
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};
