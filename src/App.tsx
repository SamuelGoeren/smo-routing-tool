import { useState } from 'react';
import Kingdom from './Kingdom';
import { kingdomData } from './config/kingdomdata';
import { GameProvider, useGame } from './contexts/game';
import { GameContextProps } from 'interface/interface';
import { Typography } from '@mui/material';

function App() {
  const { currentKingdom } = useGame();

  return (
    <>
      {currentKingdom < kingdomData.length ? (
        <Kingdom {...kingdomData[currentKingdom]}></Kingdom>
      ) : (
        <Typography>You beat any%</Typography>
      )}
    </>
  );
}

export default App;
