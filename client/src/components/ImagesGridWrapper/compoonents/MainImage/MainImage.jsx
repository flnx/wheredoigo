import { LoadingWrapper } from '../LoadingWrapper/LoadingWrapper';

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
