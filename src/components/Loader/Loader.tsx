import './Loader.css';

import logo from '@assets/img/logo.jpg';

const Loader = () => {
    return (
        <div className="loader">
            <img src={logo} alt="Loading..." className="loader-logo" />
        </div>
    );
};

export default Loader;
