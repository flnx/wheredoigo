import styles from './CategoriesNav.module.css';
import {
    BEACH__ICON,
    CAMP__ICON,
    MOUNTAINS__ICON,
    FOREST__ICON,
} from '../../utils/icons';

console.log(BEACH__ICON, CAMP__ICON, MOUNTAINS__ICON, FOREST__ICON);

export const CategoriesNav = () => {
    return (
        <div className={styles.categories}>
            <img src={BEACH__ICON} alt="beach icon" />
            <img src={CAMP__ICON} alt="camp icon" />
            <img src={MOUNTAINS__ICON} alt="mountain icon" />
            <img src={FOREST__ICON} alt="forest icon" />
        </div>
    );
};
