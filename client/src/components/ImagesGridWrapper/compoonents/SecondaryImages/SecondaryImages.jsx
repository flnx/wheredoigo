import PropTypes from 'prop-types';
import { applyCloudinaryTransformation } from 'src/utils/utils';
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
            {secondaryImages.map((x, i) =>
                isLoading ? (
                    <LoadingWrapper key={x._id} />
                ) : (
                    <img
                        src={applyCloudinaryTransformation(x.imageUrl)}
                        alt={`${alt || 'image'} ${i + 1}`} // Include the index to differentiate alt text
                        onClick={() => onClickHandler(x)}
                        key={x._id}
                    />
                )
            )}
        </div>
    );
};

SecondaryImages.propTypes = propTypes;
