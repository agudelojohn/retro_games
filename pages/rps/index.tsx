import { Grid, Button, Paper, Typography, Tooltip } from '@mui/material';
import FortIcon from '@mui/icons-material/Fort';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Head from 'next/head';
import { useRef } from 'react';

const Rps = () => {
  const possibleValues = { rock: { value: 'Rock', icon: <FortIcon /> }, paper: { value: 'Paper', icon: <ReceiptIcon /> }, scissors: { value: 'Scissors', icon: <ContentCutIcon /> } };

  const computerChoiceRef = useRef<HTMLInputElement>(null!);
  const userChoiceRef = useRef<HTMLInputElement>(null!);
  const resultRef = useRef<HTMLInputElement>(null!);

  function computerWins(): void {
    resultRef.current.innerText = 'Computer wins';
  }

  function userWins(): void {
    resultRef.current.innerText = 'User wins';
  }

  function tie(): void {
    resultRef.current.innerText = 'Is a tie, go again!';
  }

  function result(computerChoice: string, userChoice: string): void {
    computerChoiceRef.current.innerText = computerChoice;
    switch (userChoice) {
      case possibleValues.rock.value:
        switch (computerChoice) {
          case possibleValues.paper.value:
            computerWins();
            break;
          case possibleValues.scissors.value:
            userWins();
            break;
          default:
            tie();
        }
      case possibleValues.paper.value:
        if (computerChoice === possibleValues.scissors.value) {
          computerWins();
        } else if (computerChoice === possibleValues.rock.value) {
          userWins();
        } else {
          tie();
        }
        break;
      case possibleValues.scissors.value:
        if (computerChoice === possibleValues.rock.value) {
          computerWins();
        } else if (computerChoice === possibleValues.paper.value) {
          userWins();
        } else {
          tie();
        }
        break;
    }
  }

  function generateComputerChoice(): string {
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = Object.values(possibleValues).map((item) => item.value)[randomIndex];
    return computerChoice;
  }

  function play(userChoice: string): void {
    userChoiceRef.current.innerText = userChoice;
    computerChoiceRef.current.innerText = '... Working ...';
    resultRef.current.innerText = '... Working ...';
    const computerChoice = generateComputerChoice();
    setTimeout(() => result(computerChoice, userChoice), 500);
  }

  return (
    <>
      <Head>
        <title>Rock Paper Scissors</title>
      </Head>
      <Paper>
        <Typography variant="h2" gutterBottom>
          Computer choice: <span ref={computerChoiceRef} id="computer-choice"></span>
        </Typography>
        <Typography variant="h2" gutterBottom>
          Your choice: <span ref={userChoiceRef} id="user-choice"></span>
        </Typography>
        <Typography variant="h2" gutterBottom>
          Result: <span id="result" ref={resultRef}></span>
        </Typography>
        <Grid sx={{ paddingBottom: '3rem' }} container columns={3} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={1} display="flex" justifyContent="center" alignItems="center">
            <Tooltip title={possibleValues.rock.value}>
              <Button variant="contained" id="rock" onClick={() => play(possibleValues.rock.value)}>
                {possibleValues.rock.icon}
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={1} display="flex" justifyContent="center" alignItems="center">
            <Tooltip title={possibleValues.paper.value}>
              <Button variant="contained" id="rock" onClick={() => play(possibleValues.paper.value)}>
                {possibleValues.paper.icon}
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={1} display="flex" justifyContent="center" alignItems="center">
            <Tooltip title={possibleValues.scissors.value}>
              <Button variant="contained" id="rock" onClick={() => play(possibleValues.scissors.value)}>
                {possibleValues.scissors.icon}
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Rps;
