import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  
  // Sample events data
  const events = [
    {
      date: dayjs().format('YYYY-MM-DD'),
      startTime: "10:00",
      endTime: "11:30",
      color: "#f6be23",
      title: "Daily Standup",
    },
    {
      date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      startTime: "14:30",
      endTime: "15:30",
      color: "#f6501e",
      title: "Weekly catchup",
    }
  ];

  // Navigation functions
  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  // Get days in month
  const getDaysInMonth = () => {
    const startDay = currentDate.startOf('month').day();
    const daysInMonth = currentDate.daysInMonth();
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt; Previous</button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth}>Next &gt;</button>
      </div>

      <div className="calendar-grid">
        {/* Week days header */}
        {weekDays.map(day => (
          <div key={day} className="week-day">{day}</div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          }

          const dateString = currentDate.date(day).format('YYYY-MM-DD');
          const dayEvents = events.filter(event => event.date === dateString);
          const isToday = dateString === dayjs().format('YYYY-MM-DD');

          return (
            <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
              <div className="day-number">{day}</div>
              {dayEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className="event" 
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;