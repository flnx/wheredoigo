import styles from './Place.module.css';

import { Link } from 'react-router-dom';

// Components
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';

export const Place = ({ place, onClickHandler, onDeleteClickHandler }) => {
    const { _id, name, country, imageUrl } = place;

    return (
        <div className={styles['card']}>
            <div className={styles.imageContainer}>
                <Link to={`/places/${_id}`}>
                    <img src={imageUrl} alt={name} />
                </Link>
            </div>
            <section className={styles.content}>
                <h3>{name}</h3>
                <p>{country}</p>
                <div className={styles.buttons}>
                    <SuccessButton onClickHandler={() => onClickHandler(_id, city)}>
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
