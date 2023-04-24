import { Link } from 'react-router-dom';
import styles from './Destination.module.css';
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';

export const Destination = ({ destination, onClickHandler, onDeleteClickHandler }) => {
    const { _id, city, country, imageUrls } = destination;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link to={`/destinations/${_id}`}>
                    <img src={imageUrls} alt={city} className={styles.image} />
                </Link>
            </div>
            <section className={styles.content}>
                <div className={styles.flex}>
                    <h3>{city}</h3>
                </div>

                <div className={`${styles.flex}`}>
                    <p className={styles.destination}>{country}</p>
                </div>
                <div>
                    <SuccessButton onClickHandler={() => onClickHandler(_id)}>
                        Edit
                    </SuccessButton>
                    <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                        Delete
                    </WarningButton>
                </div>
            </section>
        </div>
    );
};
