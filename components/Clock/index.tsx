import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
interface IClock {
  startTime: Date;
  overGame: Function;
}
const Clock: React.FC<IClock> = ({ startTime, overGame }) => {
  const [timeLeft, setTimeLeft] = useState(new Date());
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const currentTime = new Date();
      const diff = new Date(120000 - (currentTime.getTime() - startTime.getTime()));
      setTimeLeft(diff);
      if (diff.getMinutes() === 0 && diff.getSeconds() === 0) overGame();
    }, 100);
    return () => clearInterval(clockInterval);
  }, [overGame, startTime, timeLeft]);
  return (
    <>
      <Typography variant="h3">Time limit: 2 minutes</Typography>
      <Typography variant="h3">
        <span>
          Time left: {timeLeft.getMinutes()}:{timeLeft.getSeconds()}
        </span>
      </Typography>
    </>
  );
};

export default Clock;
