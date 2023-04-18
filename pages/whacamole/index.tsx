import { Alert, AlertTitle, Grid, Typography, Button } from '@mui/material';
import Image from 'next/image';

import Layout from '@/components/Layout';
import mole from '@imgs/mole.jpg';
import { useEffect, useState } from 'react';
import Clock from '@/components/Clock';

const WhacAMole = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [score, setScore] = useState(0);
  const [timeStamp, setTimeStamp] = useState(new Date());
  const [gameRunnig, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [array, setArray] = useState([
    { isMole: false, id: '1' },
    { isMole: false, id: '2' },
    { isMole: false, id: '3' },
    { isMole: false, id: '4' },
    { isMole: false, id: '5' },
    { isMole: false, id: '6' },
    { isMole: false, id: '7' },
    { isMole: false, id: '8' },
    { isMole: false, id: '9' },
  ]);
  const tileStyle = {
    width: 200,
    height: 200,
    border: '1px solid black',
  };

  function startGame() {
    setScore(0);
    setGameOver(false);
    setTimeStamp(new Date());
    setGameRunning(true);
    const interval = setInterval(() => {
      const localArray = [...array];
      localArray.forEach((tile) => (tile.isMole = false));
      localArray[Math.floor(Math.random() * 9)].isMole = true;
      setArray(localArray);
    }, 500);
    setIntervalId(interval);
  }

  function resetGame() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameRunning(false);
    setGameOver(false);
  }

  function overGame() {
    resetGame();
    setGameOver(true);
  }

  function hit() {
    setScore(score + 1);
  }

  return (
    <Layout title="Whac a Mole">
      <Grid container direction="column" columns={3} justifyContent="space-around" alignItems="center">
        <Grid container direction="row" columns={3} sx={{ maxWidth: '600px' }}>
          {array.map((tile) => (
            <Grid display="flex" key={tile.id} item xs={1} sx={tileStyle}>
              {tile.isMole ? <Image src={mole} alt="Mole" width={195} height={195} onClick={hit} /> : null}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {!gameRunnig ? (
        <Button variant="contained" onClick={startGame}>
          Start
        </Button>
      ) : (
        <Button variant="outlined" onClick={resetGame}>
          Reset
        </Button>
      )}
      {gameRunnig && <Clock startTime={timeStamp} overGame={overGame} />}

      <Typography variant="h2">
        {gameOver ? null : (
          <span>
            Score: <span id="score">{score}</span>
          </span>
        )}
      </Typography>
      <br />
      {gameOver ? (
        <Alert severity="info">
          <AlertTitle>Game over</AlertTitle>
          Total score: <strong>{score}</strong>
        </Alert>
      ) : null}
    </Layout>
  );
};

export default WhacAMole;
