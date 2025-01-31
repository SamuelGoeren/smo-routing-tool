import { Box, Button, Grid2, Typography } from "@mui/material";
import Moon from "./Moon";
import React, { useEffect } from "react";
import { KingdomProps } from "interface/interface";
import { checkMultipleMoonRequirements } from "./util/utils";
import { useGame } from "./contexts/game";


export const Kingdom: React.FC<KingdomProps> = ({
  name,
  moonsToLeave,
  moonNames,
  moonRequirements,
  multiMoons,
  moonColor,
}) => {

  const {leaveKingdom, totalMoons, setTotalMoons, currentKingdom} = useGame();

  const [finishedMoons, setFinishedMoons] = React.useState<number[]>([]);
  const [availableMoons, setAvailableMoons] = React.useState<number[]>(setupAvailableMoons());
  const [collectedMoonCount, setCollectedMoonCount] = React.useState<number>(0);

  useEffect(() => {
    setFinishedMoons([]);
    setAvailableMoons(setupAvailableMoons());
    setCollectedMoonCount(0);
  }, [currentKingdom]);




    const moonImage = `/moonicons/${moonColor}moon.png`;
    const multiMoonImage = `/moonicons/${moonColor}multimoon.png`;

    function setupAvailableMoons() : number[]{
        let result = [];

        for(let i = 0; i < moonRequirements.length; i++){
            if(!Array.isArray(moonRequirements[i]) && moonRequirements[i] === -1) result.push(i);
        }

        return result;
    }

    function collectMoon(moon: number) : void{
        let moonCount = 1;
        if(multiMoons.includes(moon)){
            moonCount = 3;
        }
        setCollectedMoonCount(collectedMoonCount + moonCount);
        const newFinishedMoons = [...finishedMoons, moon];

        let newAvailable = availableMoons.filter(m => m !== moon);
        for(let i = 0; i < moonRequirements.length; i++){
          if(newAvailable.includes(i)) continue;

          const requirements = moonRequirements[i];          
          if((requirements === moon) ||
                (Array.isArray(requirements) 
                && (requirements.includes(moon)) 
                && checkMultipleMoonRequirements(requirements, newFinishedMoons))){
            newAvailable.push(i);
          }
        }
        newAvailable.sort((a,b) => a-b);
        setAvailableMoons(newAvailable);
        setFinishedMoons(newFinishedMoons)
    }



// Define styles using sx prop
const styles = {
    moonContainer: {
      display: 'flex',       // Align items in a row
      flexWrap: 'wrap',      // Allow wrapping to a new line if no space
      gap: 2,                // Space between items (spacing unit used by MUI)
    },
    container: {
        position: 'absolute',   // Use absolute positioning
        top: 10,                // Distance from the top of the screen
        right: 10,              // Distance from the right of the screen
        zIndex: 1000,           // To make sure it's on top of other content
      },
      list: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
      item: {
        background: '#f0f0f0',
        padding: '8px 16px',
        margin: '5px 0',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      buttonContainer: {
        position: 'fixed',
        bottom: '20px', // Adjust as needed for margin
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000, // Make sure it's above other elements
      },
  };

  function handleLeaveKingdom(){
      setTotalMoons(totalMoons + collectedMoonCount);
      leaveKingdom();
  }

    return(
        <>
        <Box sx={styles.container}>
            <Typography>Collected moons this kingdom: ({collectedMoonCount})</Typography>
            {finishedMoons.map((moon) => (
                <Typography>
                    {moonNames[moon]}
                </Typography>
            ))}
            <Typography> Total moons in the odyssey: {totalMoons}</Typography>
        </Box>
        <Box sx={styles.moonContainer}>
        {availableMoons.map((moon) => (
          <Moon
            key={moon}
            onClick={collectMoon}
            number={moon}
            image={multiMoons.includes(moon) ? multiMoonImage : moonImage}
            name={moonNames[moon]}
          />
        ))}
      </Box>
        {(collectedMoonCount >= moonsToLeave) ? (
            <Box sx={styles.buttonContainer}>
            <Button variant="contained" color="success" onClick={handleLeaveKingdom}>
                <Typography>
                    Leave {name} Kingdom!
                </Typography>
            </Button>
            </Box>
        ) : (
            <></>
        )}
      </>
    )


  
}

export default Kingdom;