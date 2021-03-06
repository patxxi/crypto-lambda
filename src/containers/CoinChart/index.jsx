import React, { useState, useEffect } from 'react';
import { CoinChartUI } from './CoinChartUI';
import { getCoinHistory } from '../../utils/Api';
import { TimeConverter } from '../../utils/Dates';

const CoinChart = ({ id, history, setHistory, change }) => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(1);

  const handleChangeDateRange = range => {
    switch (range) {
      case 'd1':
        setDateRange(1);
        break;

      case 'w1':
        setDateRange(7);
        break;

      case 'm1':
        setDateRange(31);
        break;

      case 'm2':
        setDateRange(31 * 2);
        break;

      case 'm3':
        setDateRange(31 * 3);
        break;

      case 'm6':
        setDateRange(31 * 6);
        break;

      default:
        setDateRange(365);
        break;
    }
  };

  useEffect(() => {
    setData(history);
  }, [history]);

  useEffect(async () => {
    let interval;

    switch (dateRange) {
      case 1:
        interval = 'h1';
        break;

      case 7:
        interval = 'h6';
        break;

      default:
        interval = 'd1';
        break;
    }

    const end = TimeConverter.millisecondsToDays(Date.now());
    const start = end - dateRange;

    setHistory(
      await getCoinHistory({
        id,
        end: TimeConverter.daysToMilliseconds(end),
        start: TimeConverter.daysToMilliseconds(start),
        interval,
        change,
      })
    );
  }, [dateRange]);

  return (
    <CoinChartUI
      data={data}
      handleClick={handleChangeDateRange}
      change={change}
    />
  );
};

export { CoinChart };
