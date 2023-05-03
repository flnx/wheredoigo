import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import styles from './ShowMoreButton.module.css';

export const ShowMoreButton = ({ path, onClick }) => {
    return (
        <div>
            <Link to={path} className={styles.btn} onClick={onClick}>
                <span className={styles.text}>Show more</span>

                <span className={styles.icon}>
                    <CaretRight size={15} weight="bold" />
                </span>
            </Link>
        </div>
    );
};
