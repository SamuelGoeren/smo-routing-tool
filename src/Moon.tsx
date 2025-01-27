import React from "react";

interface MoonProps {
    number: number;
    name: string;
    image: string;
    onClick: (moon: number) => void;
}

export const Moon: React.FC<MoonProps> = (props) => {
    const {number, name, image, onClick} = props;


    return(
        <>
        <div onClick={() => onClick(number)} style={{ border: '2px solid #000', padding: '20px', width: '200px', textAlign: 'center' }}>
        <img 
            src={image} 
            alt="moon" 
            style={{ width: '100%', height: 'auto', marginBottom: '10px' }} 
        />
        <p style={{ margin: 0 }}>{number+1}. {name}</p>
        </div>
        </>
    )
}

export default Moon;