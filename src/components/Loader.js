import React from 'react';
import './Loader.css';
import logo from '../img/logo.jpg';

const Loader = () => {
    return (
        <div className="loader">
            <img src={logo} alt="Loading..." className="loader-logo" />
        </div>
    );
};

export default Loader;
