import React, { useState, useEffect } from 'react';

const Clock = ({ paused, selectedCountry }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let intervalId;

    const fetchTime = async () => {
      try {
        if (!paused && selectedCountry) {
          const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
          const { datetime, utc_offset } = await response.json();
          const offsetInMinutes = parseInt(utc_offset, 10) / 60;
          setTime(new Date(new Date(datetime).getTime() + offsetInMinutes * 60 * 1000));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTime();

    if (!paused) {
      intervalId = setInterval(fetchTime, 1000);
    }

    return () => clearInterval(intervalId);
  }, [paused, selectedCountry]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(time);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h3>{formattedDateTime}</h3>
    </div>
  );
};

export default Clock;
