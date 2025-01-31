import React, { useState } from 'react';

interface MoonProps {
  number: number;
  name: string;
  image: string;
  disabled: boolean;
  finished: boolean;
  onClick: (moon: number) => void;
}

export const Moon: React.FC<MoonProps> = (props) => {
  const { number, name, image, onClick, disabled, finished } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  function getBorderColor() {
    if (isHovered && !disabled) return '#fff';
    if (finished) return '#ffd700';

    return '#000';
  }

  return (
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
        cursor: !disabled ? 'pointer' : '',
      }}
    >
      <img
        src={image}
        alt="moon"
        style={{
          width: '30%',
          height: 'auto',
          marginBottom: '10px',
          filter: disabled ? 'grayscale(100%)' : '',
        }}
      />
      <p style={{ margin: 0 }}>
        {number + 1}. {name}
      </p>
    </div>
  );
};

export default Moon;
