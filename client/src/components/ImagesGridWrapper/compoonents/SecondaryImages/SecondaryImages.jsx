import { LoadingWrapper } from '../LoadingWrapper/LoadingWrapper';

import styles from './SecondaryImages.module.css';

export const SecondaryImages = ({ secondaryImages, alt, onClickHandler, isLoading }) => {
    return (
        <div className={styles.secondaryImages}>
            {secondaryImages.map((x) =>
                isLoading ? (
                    <LoadingWrapper key={x._id} />
                ) : (
                    <img
                        src={x.imageUrl}
                        alt={alt}
                        onClick={() => onClickHandler(x)}
                        key={x._id}
                    />
                )
            )}
        </div>
    );
};
