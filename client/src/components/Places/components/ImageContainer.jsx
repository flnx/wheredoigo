import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';

import styles from './ImageContainer.module.css';

export const ImageContainer = ({ isLoading, link, imageUrl, alt }) => {
    return (
        <div className={styles.imageContainer}>
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <Link to={link}>
                    <img src={imageUrl} alt={alt} />
                </Link>
            )}
        </div>
    );
};
