import { NavLink } from 'react-router-dom';
import styles from './ContinentsNav.module.css';

export const ContinentsNav = () => {
    return (
        <section className={styles.continents}>
            <NavLink to="#">All</NavLink>
            <NavLink to="#">Europe</NavLink>
            <NavLink to="#">Asia</NavLink>
            <NavLink to="#">America</NavLink>
            <NavLink to="#">Oceania</NavLink>
            <NavLink to="#">Africa</NavLink>
        </section>
    );
};
