import { Link } from 'react-router-dom';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';
import styles from './CitiesSlider.module.css';

export const SliderCard = ({ destination }) => {
    return (
        <Link to={`/destinations/${destination._id}`}>
            <img src={destination.imageUrls} alt="city" className={styles.image} />
            <div className={styles.content}>
                <h3>{capitalizeEachWord(destination.city)}</h3>
                <p>{capitalizeEachWord(destination.country.name)}</p>
            </div>
        </Link>
    );
};
