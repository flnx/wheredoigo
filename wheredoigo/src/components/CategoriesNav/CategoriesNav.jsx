import { icons } from '../../utils/icons';
import styles from './CategoriesNav.module.css';

export const CategoriesNav = () => {
    return (
        <div>
            <h2 className={styles.title}>Popular Categories</h2>
            <div className={styles.categories}>
                <img src={icons.BEACH} alt="beach icon" />
                <img src={icons.CAMP} alt="camp icon" />
                <img src={icons.MOUNTAINS} alt="mountain icon" />
                <img src={icons.FOREST} alt="forest icon" />
            </div>
        </div>
    );
};
