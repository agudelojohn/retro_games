import { Grid, Button, Paper, Typography, Tooltip } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import blank from '@imgs/blank.png';
import fries from '@imgs/fries.png';
import cheeseBurger from '@imgs/cheeseburger.png';
import hotDog from '@imgs/hotdog.png';
import iceCream from '@imgs/ice-cream.png';
import milkshake from '@imgs/milkshake.png';
import pizza from '@imgs/pizza.png';
import white from '@imgs/white.png';
import Layout from '@/components/Layout';

const MemoryGame = () => {
  const cardArrayData = [
    { name: 'fries', img: fries, clicked: false, id: 'fries1', match: false },
    { name: 'hotDog', img: hotDog, clicked: false, id: 'hotDog2', match: false },
    { name: 'iceCream', img: iceCream, clicked: false, id: 'iceCream3', match: false },
    { name: 'milkshake', img: milkshake, clicked: false, id: 'milkshake4', match: false },
    { name: 'pizza', img: pizza, clicked: false, id: 'pizza5', match: false },
    { name: 'cheeseburger', img: cheeseBurger, clicked: false, id: 'cheeseburge6', match: false },
    { name: 'fries', img: fries, clicked: false, id: 'frie7', match: false },
    { name: 'hotDog', img: hotDog, clicked: false, id: 'hotDog8', match: false },
    { name: 'iceCream', img: iceCream, clicked: false, id: 'iceCream9', match: false },
    { name: 'milkshake', img: milkshake, clicked: false, id: 'milkshake10', match: false },
    { name: 'pizza', img: pizza, clicked: false, id: 'pizza11', match: false },
    { name: 'cheeseburger', img: cheeseBurger, clicked: false, id: 'cheeseburger12', match: false },
  ];
  cardArrayData.sort(() => 0.5 - Math.random());

  const [cardArray, setCardArray] = useState(cardArrayData);
  const [clickOne, setClickOne] = useState('');
  const [clickTwo, setClickTwo] = useState('');
  const [score, setScore] = useState(0);

  function flipCard(id: string): void {
    const cardArrayDataLocal = [...cardArray];
    const itemFound = cardArrayDataLocal.find((card) => card.id === id) ?? cardArrayData[0];
    const toFlip = cardArrayDataLocal.indexOf(itemFound);
    cardArrayDataLocal[toFlip].clicked = true;
    setCardArray(cardArrayDataLocal);
    if (clickOne !== '' && clickTwo === '') setClickTwo(id);
    if (clickOne === '') setClickOne(id);
  }

  function resetGame(): void {
    const cardArrayDataLocal = [...cardArray];
    cardArrayDataLocal.sort(() => 0.4 - Math.random());
    cardArrayDataLocal.forEach((el) => {
      el.clicked = false;
      el.match = false;
    });
    setCardArray(cardArrayDataLocal);
    setClickOne('');
    setClickTwo('');
    setScore(0);
  }

  useEffect(() => {
    setTimeout(() => {
      const elemOne = cardArray.find((card) => card.id === clickOne) ?? cardArray[0];
      const elemTwo = cardArray.find((card) => card.id === clickTwo);
      const cardArrayDataLocal = [...cardArray];
      if (clickTwo !== '' && elemOne?.name !== elemTwo?.name) {
        cardArrayDataLocal.forEach((el) => (el.clicked = false));
        setClickOne('');
        setClickTwo('');
      } else if (elemOne?.name === elemTwo?.name) {
        const idCheckedOne = cardArrayDataLocal.indexOf(elemOne);
        const idCheckedTwo = cardArrayDataLocal.indexOf(elemTwo);
        cardArrayDataLocal[idCheckedOne].match = true;
        cardArrayDataLocal[idCheckedTwo].match = true;
        setClickOne('');
        setClickTwo('');
        setScore(score + 1);
      }
      setCardArray(cardArrayDataLocal);
    }, 200);
  }, [clickTwo, clickOne, cardArray, score]);

  return (
    <Layout title="Memory game">
      <h3>
        Score: <span id="result">{score}</span>
      </h3>
      <Grid container direction="row" justifyContent="space-around" alignItems="center" columns={4} sx={{ maxWidth: cardArray[0].img.width * 4 }}>
        {cardArray &&
          cardArray.map((card, index) => (
            <Grid display="flex" key={card.name + index} item xs={1}>
              <Image src={card.clicked === false && card.match === false ? blank : card.img} alt="Image game" onClick={() => flipCard(card.id)} />
            </Grid>
          ))}
      </Grid>
      <button onClick={() => resetGame()}>Reset</button>
    </Layout>
  );
};

export default MemoryGame;
