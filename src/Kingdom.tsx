import { Box, Button, Grid2, Typography } from '@mui/material';
import Moon from './Moon';
import React, { useEffect } from 'react';
import { KingdomProps } from 'interface/interface';
import { checkMultipleMoonRequirements } from './util/utils';
import { useGame } from './contexts/game';

export const Kingdom: React.FC<KingdomProps> = ({
    name,
    moonsToLeave,
    moonNames,
    moonRequirements,
    multiMoons,
    moonColor,
}) => {
    const { leaveKingdom, totalMoons, setTotalMoons, currentKingdom } =
        useGame();

    const [finishedMoons, setFinishedMoons] =
        React.useState<boolean[]>(initFinishedMoons());
    const [availableMoons, setAvailableMoons] = React.useState<boolean[]>(
        setupAvailableMoons(),
    );
    const [collectedMoonCount, setCollectedMoonCount] =
        React.useState<number>(0);

    useEffect(() => {
        setFinishedMoons(initFinishedMoons());
        setAvailableMoons(setupAvailableMoons());
        setCollectedMoonCount(0);
    }, [currentKingdom]);

    const moonImage = `/moonicons/${moonColor}moon.png`;
    const multiMoonImage = `/moonicons/${moonColor}multimoon.png`;

    function initFinishedMoons(): boolean[] {
        let result = [];
        for (let i = 0; i < moonRequirements.length; i++) {
            result[i] = false;
        }

        return result;
    }

    function setupAvailableMoons(): boolean[] {
        let result = [];

        for (let i = 0; i < moonRequirements.length; i++) {
            result[i] =
                !Array.isArray(moonRequirements[i]) &&
                moonRequirements[i] === -1;
        }

        return result;
    }

    function collectMoon(moon: number) {
        let moonCount = multiMoons.includes(moon) ? 3 : 1;
        setCollectedMoonCount((prev) => prev + moonCount);

        let newFinishedMoons = [...finishedMoons];
        let newAvailable = [...availableMoons];

        newFinishedMoons[moon] = true;
        newAvailable[moon] = false;

        for (let i = 0; i < moonRequirements.length; i++) {
            if (newAvailable[i]) continue;

            const requirement = moonRequirements[i];
            if (!Array.isArray(requirement) && requirement === moon) {
                newAvailable[i] = true;
            } else if (
                Array.isArray(requirement) &&
                checkMultipleMoonRequirements(requirement, newFinishedMoons)
            ) {
                newAvailable[i] = true;
            }
        }

        setFinishedMoons(newFinishedMoons);
        setAvailableMoons(newAvailable);
    }

    function checkForFinishedRequirementsBeforeDeselection(
        moon: number,
    ): number[] {
        let result = [];
        for (let i = 0; i < moonRequirements.length; i++) {
            if (finishedMoons[i]) {
                const requirement = moonRequirements[i];
                if (
                    (Array.isArray(requirement) &&
                        requirement.includes(moon)) ||
                    requirement === moon
                ) {
                    result.push(i);
                }
            }
        }
        return result;
    }

    function unCollectMoon(moon: number) {
        //check if there are any already collected moons that require this moon,
        //don't allow deselection if that is the case
        if (checkForFinishedRequirementsBeforeDeselection(moon).length > 0)
            return;

        //allow deselection
        let newFinishedMoons = [...finishedMoons];
        let newAvailableMoons = [...availableMoons];

        newFinishedMoons[moon] = false;
        newAvailableMoons[moon] = true;

        //check if the deselected moon unlocked anything and make those moons unavailable
        for (let i = 0; i < moonRequirements.length; i++) {
            const requirement = moonRequirements[i];
            if (
                (Array.isArray(requirement) && requirement.includes(moon)) ||
                requirement === moon
            ) {
                newAvailableMoons[i] = false;
            }
        }

        setFinishedMoons(newFinishedMoons);
        setAvailableMoons(newAvailableMoons);

        let moonCount = multiMoons.includes(moon) ? 3 : 1;
        setCollectedMoonCount((prev) => prev - moonCount);
    }

    function handleMoonClick(moon: number): void {
        if (finishedMoons[moon]) {
            unCollectMoon(moon);
            return;
        }

        //not available, do nothing
        if (!availableMoons[moon]) return;

        if (availableMoons[moon] && !finishedMoons[moon]) collectMoon(moon);
    }

    // Define styles using sx prop
    const styles = {
        moonContainer: {
            display: 'flex', // Align items in a row
            flexWrap: 'wrap', // Allow wrapping to a new line if no space
            gap: 2, // Space between items (spacing unit used by MUI)
        },
        container: {
            position: 'absolute', // Use absolute positioning
            top: 10, // Distance from the top of the screen
            right: 10, // Distance from the right of the screen
            zIndex: 1000, // To make sure it's on top of other content
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

    function handleLeaveKingdom() {
        setTotalMoons(totalMoons + collectedMoonCount);
        leaveKingdom();
    }

    return (
        <>
            <Box sx={styles.container}>
                <Typography>
                    Collected moons this kingdom: ({collectedMoonCount})
                </Typography>
                {finishedMoons.map(
                    (moon, index) =>
                        moon && (
                            <Typography key={index}>
                                {moonNames[index]}
                            </Typography>
                        ),
                )}
                <Typography>
                    {' '}
                    Total moons in the odyssey: {totalMoons}
                </Typography>
            </Box>

            <Box sx={styles.moonContainer}>
                {availableMoons.map((moon, index) => {
                    let toDeselectNames = [];
                    const requirementsToDeselect =
                        checkForFinishedRequirementsBeforeDeselection(index);
                    if (finishedMoons[index] && requirementsToDeselect.length > 0) {
                        for (let i = 0; i < requirementsToDeselect.length; i++) {
                            const moon = requirementsToDeselect[i];
                            toDeselectNames.push(
                                `${moon + 1}. ${moonNames[moon]}`,
                            );
                        }
                    }

                    return (
                        <Moon
                            key={index}
                            onClick={handleMoonClick}
                            number={index}
                            image={
                                multiMoons.includes(index)
                                    ? multiMoonImage
                                    : moonImage
                            }
                            available={moon}
                            deselectable={
                                finishedMoons[index] &&
                                requirementsToDeselect.length === 0
                            }
                            toDeselect={toDeselectNames}
                            name={moonNames[index]}
                            finished={finishedMoons[index]}
                        />
                    );
                })}
            </Box>
            {collectedMoonCount >= moonsToLeave ? (
                <Box sx={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleLeaveKingdom}
                    >
                        <Typography>Leave {name} Kingdom!</Typography>
                    </Button>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

export default Kingdom;
