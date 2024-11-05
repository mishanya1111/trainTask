import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import React from 'react';
import logo from '../../img/svg.svg';
import modsen from '../../img/modsen.svg';
import bookmark from '../../img/bookmark.png';
import home from '../../img/home.svg';
function Navbar() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
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
            <div></div>
            <nav className="navbar-right">
                <ul>
                    {!isHomePage && (
                        <li>
                            <NavLink
                                to="/"
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
                            to="/favorites"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }
                        >
                            <span>
                                <img src={bookmark} alt="bookmark" />
                            </span>{' '}
                            Your favorites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

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
