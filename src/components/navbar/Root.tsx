import '@components/navbar/NavbarAndFooter.css';

import home from '@assets/img/home.svg';
import modsen from '@assets/img/modsen.svg';
import logo from '@assets/img/svg.svg';
import bookmark from '@assets/img/svgBookmarkNavbar.svg';
import { FAVORITES_PAGE_ROUTE, HOME_PAGE_ROUTE } from '@constants/routes';
import { useOutsideClick } from '@utils/hooks/useOutsideClick';
import { RefObject, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

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
                to={HOME_PAGE_ROUTE}
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
                                to={HOME_PAGE_ROUTE}
                                end
                                className={({ isActive, isPending }): string =>
                                    isActive ? 'active' : isPending ? 'pending' : ''
                                }
                            >
                                <img src={home} alt="home" />
                                Home
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to={FAVORITES_PAGE_ROUTE}
                            className={({ isActive, isPending }): string =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }
                        >
                            <img src={bookmark} alt="bookmark" />
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
            <header>
                <Navbar />
            </header>
            <div id="detail">
                <main>
                    <Outlet />
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Root;
