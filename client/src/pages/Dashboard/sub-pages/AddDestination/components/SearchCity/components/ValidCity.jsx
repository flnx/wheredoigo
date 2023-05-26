import { ArrowCircleRight } from '@phosphor-icons/react';
import styles from '../SearchCity.module.css';

export const ValidCity = ({ city, country, onDropdownCityClickHandler }) => {
    return (
        <div className={styles.searchResult} onMouseDown={onDropdownCityClickHandler}>
            <ArrowCircleRight size={28} />
            <p>
                Add {city}, {country}
            </p>
        </div>
    );
};