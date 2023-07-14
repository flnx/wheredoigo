import { List, X } from '@phosphor-icons/react';
import styles from './HamburgerIcon.module.css';

export const HamburgerIcon = ({ onHamburgerClickHandler, isNavToggled, isMobile }) => {
    return isMobile ? (
        <button 
            className={styles.hamburger} 
            onClick={onHamburgerClickHandler}
        >
            {isNavToggled 
                ? <X size={36} /> 
                : <List size={36} />
            }
        </button>
    ) : null;
};
