import { GameContextProps } from "interface/interface";
import React, { createContext, useContext, useState } from "react";

const defaultGameContext: GameContextProps = {
    totalMoons: 0,
    setTotalMoons: () => {},
    currentKingdom: 0,
    leaveKingdom: () => {},
  };

const GameContext = createContext<GameContextProps>(defaultGameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalMoons, setTotalMoons] = useState<number>(0);
  const [currentKingdom, setCurrentKingdom] = useState<number>(0);

  function leaveKingdom(){
    setCurrentKingdom(currentKingdom + 1);
  }

  return (
    <GameContext.Provider value={{ totalMoons, setTotalMoons, currentKingdom, leaveKingdom}}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
