import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import { TextWrap } from '../../TextWrap/TextWrap';

import styles from './ShowMoreButton.module.css';

export const ShowMoreButton = ({ path, onClick, isLoading }) => {
    const loadingClass = `${isLoading ? styles.loading : null}`;

    return (
        <div className={styles.button}>
            <Link 
                to={path} 
                className={`${styles.btn} ${loadingClass}`} 
                onClick={onClick}
            >
                <span className={`${styles.text} ${loadingClass}`}>
                    <TextWrap isLoading={isLoading} content={'Show more'} />
                </span>

                {!isLoading && (
                    <span className={styles.icon}>
                        <CaretRight size={15} weight="bold" />
                    </span>
                )}
            </Link>
        </div>
    );
};
