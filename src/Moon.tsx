import { Tooltip } from '@mui/material';
import { BLACK, GOLD, GRAY, WHITE } from './config/colors';
import React, { useState } from 'react';

interface MoonProps {
    number: number;
    name: string;
    image: string;
    available: boolean;
    finished: boolean;
    deselectable: boolean;
    toDeselect: string[];
    onClick: (moon: number) => void;
}

export const Moon: React.FC<MoonProps> = (props) => {
    const {
        number,
        name,
        image,
        onClick,
        available,
        finished,
        deselectable,
        toDeselect,
    } = props;
    const [isHovered, setIsHovered] = useState<boolean>(false);

    function getBorderColor() {
        if (isHovered && available) return BLACK;
        if (isHovered && deselectable) return GRAY;
        if (finished) return GOLD;

        return WHITE;
    }

    // Reusable Moon component without the Tooltip
    const MoonContent = (
        <div
            onClick={() => onClick(number)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                border: `4px solid ${getBorderColor()}`,
                padding: '20px',
                width: '10vw', // Ensures it takes up at most 10% of the viewport width
                maxWidth: '200px', // Adds a fallback max width
                textAlign: 'center',
                cursor: available || deselectable ? 'pointer' : 'not-allowed',
            }}
        >
            <img
                src={image}
                alt="moon"
                style={{
                    width: '30%',
                    height: 'auto',
                    marginBottom: '10px',
                    filter: !available && !finished ? 'grayscale(100%)' : '',
                }}
            />
            <p style={{ margin: 0 }}>
                {number + 1}. {name}
            </p>
        </div>
    );

    const tip = toDeselect.join('\n');

    // Conditionally wrap the MoonContent with Tooltip if not selectable
    return finished && !deselectable ? (
        <Tooltip
            title={
                <div style={{ whiteSpace: 'pre-line' }}>
                    {
                        'This moon unlocks requirements that you already finished. Please deselect the following:\n'
                    }
                    {tip}
                </div>
            }
        >
            {MoonContent}
        </Tooltip>
    ) : (
        MoonContent
    );
};

export default Moon;
