import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import React, { useRef, useState } from 'react';
import logo from '../../assets/img/svg.svg';
import modsen from '../../assets/img/modsen.svg';
import bookmark from '../../assets/img/bookmark.png';
import home from '../../assets/img/home.svg';
import { useOutsideClick } from '../../utils/Hooks/useOutsideClick';

export const Navbar = () => {
    const location = useLocation();
    const isHomePage =
        location.pathname === '/trainTask' || location.pathname === '/trainTask/';
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleBurgerMenu = () => {
        setIsBurgerOpen(prev => !prev);
    };

    // Закрытие меню при клике вне его
    useOutsideClick(menuRef, () => setIsBurgerOpen(false));

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-text">
                    Museum of <span className="highlight">Art</span>
                </div>
            </div>

            <button className="burger-button" onClick={toggleBurgerMenu}>
                ☰
            </button>

            <nav
                ref={menuRef}
                className={`navbar-right ${isBurgerOpen ? 'open' : ''}`}
            >
                <ul>
                    {!isHomePage && (
                        <li>
                            <NavLink
                                to="/trainTask"
                                end
                                className={({ isActive, isPending }) =>
                                    isActive ? 'active' : isPending ? 'pending' : ''
                                }
                            >
                                <span>
                                    <img src={home} alt="home" />
                                </span>
                                Home
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/trainTask/favorites"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }
                        >
                            <span>
                                <img src={bookmark} alt="bookmark" />
                            </span>
                            Your favorites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

function Footer() {
    return (
        <div className="footer">
            <div className="footer-left">
                <div className="footer-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="footer-text">
                    Museum of <span className="highlight">Art</span>
                </div>
            </div>
            <div></div>
            <nav className="footer-right">
                <img src={modsen} alt="modsen" />
            </nav>
        </div>
    );
}

export default function Root() {
    return (
        <>
            <Navbar />
            <div id="detail">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
