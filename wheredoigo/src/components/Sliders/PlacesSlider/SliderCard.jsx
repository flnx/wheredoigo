import { Link } from 'react-router-dom';
import styles from './PlacesSlider.module.css';

export const SliderCard = ({ place }) => {
    return (
        <Link to={`/place/3123`}>
            <img
                src='https://parsefiles.back4app.com/0vFwOMDrlF6WIAFxLOFQL4DrU8phO0dSpWtrfV1Y/69930de85a5640623c1c084f21c75fbf_3.jpg'
                alt="city"
                className={styles.image}
            />
            <div className={styles.content}>
                <h3>New York</h3>
                <p>USA</p>
            </div>
        </Link>
    );
};