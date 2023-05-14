import PropTypes from 'prop-types';
import { LoadingWrapper } from '../LoadingWrapper/LoadingWrapper';

const propTypes = {
    onClickHandler: PropTypes.func.isRequired,
    mainImage: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    alt: PropTypes.string,
};

export const MainImage = ({ onClickHandler, mainImage, isLoading, alt }) => {
    const imageStyles = {
        height: '100%',
        width: '100%',
    };
    return (
        <div>
            {isLoading ? (
                <LoadingWrapper />
            ) : (
                <img
                    src={mainImage.imageUrl}
                    alt={alt}
                    onClick={() => onClickHandler(mainImage)}
                    style={imageStyles}
                />
            )}
        </div>
    );
};

MainImage.propTypes = propTypes;
