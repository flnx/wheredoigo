import { icons } from '../../utils/icons';
import styles from './CategoriesNav.module.css';

export const CategoriesNav = () => {
    return (
        <div className={styles.categories}>
            <img src={icons.BEACH} alt="beach icon" />
            <img src={icons.CAMP} alt="camp icon" />
            <img src={icons.MOUNTAINS} alt="mountain icon" />
            <img src={icons.FOREST} alt="forest icon" />
        </div>
    );
};
