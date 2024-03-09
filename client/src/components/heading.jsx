import React from 'react';
import '../component-styling/heading.css';

const Heading = ({ text }) => {
    return <h2 className="heading">{text}</h2>;
};

export default Heading;