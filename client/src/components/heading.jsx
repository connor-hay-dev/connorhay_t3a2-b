import React from 'react';
import '../component-styling/heading.css'; // Assuming you create a separate CSS file for this component

const Heading = ({ text }) => {
    return <h2 className="heading">{text}</h2>;
};

export default Heading;