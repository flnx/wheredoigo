import { List, X } from 'phosphor-react';
import styles from './HamburgerIcon.module.css'

export const HamburgerIconMenu = ({ hamburgerClickHandler, isNavToggled }) => {
    return (
        <button
            className={styles.hamburger}
            onClick={hamburgerClickHandler}
        >
            {isNavToggled ? <X size={36} /> : <List size={36} />}
        </button>
    );
};
