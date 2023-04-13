import { Link } from 'react-router-dom';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';
import styles from './CitiesSlider.module.css';

export const SliderCard = ({ destination }) => {
    const { imageUrls, city, country, _id } = destination;

    return (
        <Link to={`/destinations/${_id}`}>
            <img src={imageUrls.imageUrl} alt="city" className={styles.image} />
            <div className={styles.content}>
                <h3>{capitalizeEachWord(city)}</h3>
                <p>{capitalizeEachWord(country.name)}</p>
            </div>
        </Link>
    );
};
