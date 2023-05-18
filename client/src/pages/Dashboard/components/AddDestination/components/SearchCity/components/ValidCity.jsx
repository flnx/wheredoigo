import { ArrowCircleRight } from '@phosphor-icons/react';
import styles from '../../../AddDestination.module.css';

export const ValidCity = ({ city, country, onDropdownCityClickHandler }) => {
    return (
        <div className={styles.searchQuery} onMouseDown={onDropdownCityClickHandler}>
            <ArrowCircleRight size={28} />
            <p>
                Add {city}, {country}
            </p>
        </div>
    );
};