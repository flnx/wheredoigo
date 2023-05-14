import PropTypes from 'prop-types';
import { LoadingWrapper } from '../LoadingWrapper/LoadingWrapper';

import styles from './SecondaryImages.module.css';

const propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    secondaryImages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    alt: PropTypes.string,
};

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

SecondaryImages.propTypes = propTypes;
