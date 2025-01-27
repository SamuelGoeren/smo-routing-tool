import { Box, Button, Typography } from "@mui/material";
import Moon from "./Moon";
import React from "react";

interface KingdomProps {
    name: string;
    moonNames: string[];
    moonsToLeave: number;
    moonRequirements: number[];
    multiMoons: number[];
    moonColor: string;
}



export const Kingdom: React.FC<KingdomProps> = (props) => {
    const {name, moonsToLeave, moonNames, moonRequirements, multiMoons, moonColor} = props;
    const moonImage = `/${moonColor}moon.png`;

    function setupAvailableMoons() : number[]{
        let result = [];

        for(let i = 0; i < moonRequirements.length; i++){
            if(moonRequirements[i] === -1) result.push(i);
        }

        return result;
    }

    function collectMoon(moon: number) : void{
        let moonCount = 1;
        if(multiMoons.includes(moon)){
            moonCount = 3;
        }
        setCollectedMoonCount(collectedMoonCount + moonCount);

        let newAvailable = availableMoons.filter(m => m !== moon);
        for(let i = 0; i < moonRequirements.length; i++){
            if(moonRequirements[i] === moon) newAvailable.push(i);
        }
        newAvailable.sort((a,b) => a-b);
        setAvailableMoons(newAvailable);
        setFinishedMoons([...finishedMoons, moon])
    }

    const [finishedMoons, setFinishedMoons] = React.useState<number[]>([]);
    const [availableMoons, setAvailableMoons] = React.useState<number[]>(setupAvailableMoons());
    const [collectedMoonCount, setCollectedMoonCount] = React.useState<number>(0);

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


    return(
        <>
        <Box sx={styles.container}>
            <Typography>Collected moons: ({collectedMoonCount})</Typography>
            {finishedMoons.map((moon) => (
                <Typography>
                    {moonNames[moon]}
                </Typography>
            ))}
        </Box>

        <Box sx={styles.moonContainer}>
        {availableMoons.map((moon) => (
          <Moon
            key={moon}
            onClick={collectMoon}
            number={moon}
            image={moonImage}
            name={moonNames[moon]}
          />
        ))}
      </Box>
        {(collectedMoonCount >= moonsToLeave) ? (
            <Box sx={styles.buttonContainer}>
            <Button>
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