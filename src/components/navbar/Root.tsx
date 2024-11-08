import { Outlet, NavLink, useLocation } from 'react-router-dom';
import '@components/navbar/NavbarAndFooter.css';
import React, { useRef, useState, RefObject } from 'react';
import logo from '@assets/img/svg.svg';
import modsen from '@assets/img/modsen.svg';
import bookmark from '@assets/img/bookmark.png';
import home from '@assets/img/home.svg';
import { useOutsideClick } from '@utils/Hooks/useOutsideClick';
import { HOME_PAGE_ROUTE } from '@constants/routes';
export const Navbar: React.FC = () => {
    const location = useLocation();
    const isHomePage: boolean =
        location.pathname === HOME_PAGE_ROUTE ||
        location.pathname === HOME_PAGE_ROUTE + '/'; //проверка на Home
    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null); // Реф для кнопки бургер-меню

    const toggleBurgerMenu = (): void => {
        setIsBurgerOpen(prev => !prev);
    };

    // Закрытие меню при клике вне его  с проверкой на нажатие на самоу кнопку бургер меню
    useOutsideClick(menuRef, (event: MouseEvent) => {
        if (!buttonRef.current?.contains(event.target as Node)) {
            setIsBurgerOpen(false);
        }
    });
    //наверное можно было убрать у NavLInk classNAme
    return (
        <div className="navbar">
            <NavLink
                to="/trainTask"
                end
                className={({ isActive, isPending }): string =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                }
            >
                <div className="navbar-left">
                    <div className="navbar-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="navbar-text">
                        Museum of <span className="highlight">Art</span>
                    </div>
                </div>
            </NavLink>
            <button
                ref={buttonRef}
                className="burger-button"
                onClick={toggleBurgerMenu}
            >
                ☰
            </button>

            <nav
                ref={menuRef as RefObject<HTMLDivElement>}
                className={`navbar-right ${isBurgerOpen ? 'open' : ''}`}
            >
                <ul>
                    {!isHomePage && (
                        <li>
                            <NavLink
                                to="/trainTask"
                                end
                                className={({ isActive, isPending }): string =>
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
                            className={({ isActive, isPending }): string =>
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

const Footer: React.FC = () => {
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
};

const Root: React.FC = () => {
    return (
        <>
            <Navbar />
            <div id="detail">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Root;
