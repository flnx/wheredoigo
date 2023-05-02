import { Link } from 'react-router-dom';
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';

import styles from './Destination.module.css';

export const Destination = ({ destination, onDeleteClickHandler }) => {
    const { _id, city, country, imageUrls } = destination;

    const link = `/destinations/${_id}`;

    return (
        <div className={styles['card']}>
            <div className={styles.imageContainer}>
                <Link to={link}>
                    <img src={imageUrls} alt={city} />
                </Link>
            </div>
            <section className={styles.content}>
                <h3>{city}</h3>
                <p>{country}</p>
                <div className={styles.buttons}>
                    <LinkButtonSuccess to={`${link}/edit`}>Edit</LinkButtonSuccess>
                    <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                        Delete
                    </WarningButton>
                </div>
            </section>
        </div>
    );
};
