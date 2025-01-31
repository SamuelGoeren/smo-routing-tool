export interface KingdomProps {
  name: string;
  moonNames: string[];
  moonsToLeave: number;
  moonRequirements: (number | number[])[];
  multiMoons: number[];
  moonColor: string;
}

export interface GameContextProps {
  totalMoons: number;
  setTotalMoons: (moons: number) => void;
  currentKingdom: number;
  leaveKingdom: () => void;
}
