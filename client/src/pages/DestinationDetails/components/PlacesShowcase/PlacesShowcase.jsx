import PropTypes from 'prop-types';
import { checkArrayAndPreloadElements } from '../../../../utils/utils';

import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';
import { LoadingSkeleton } from '../../../../components/LoadingSkeletons/LoadingSkeleton';

const propTypes = {
    places: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const PlacesShowcase = ({ places, isLoading }) => {
    const explorePlaces = places.filter((x) => x?.type.toLowerCase() == 'explore');
    const partyPlaces = places.filter((x) => x?.type.toLowerCase() == 'party');
    const eatingPlaces = places.filter((x) => x?.type.toLowerCase() == 'eat');

    const prefilledArr = checkArrayAndPreloadElements(places, 3);

    return (
        <>
            {isLoading ? (
                prefilledArr.map((x) => (
                    <CategorySlider places={places} isLoading={isLoading} key={x._id} />
                ))
            ) : (
                <>
                    {explorePlaces.length > 0 && (
                        <CategorySlider places={explorePlaces} isLoading={isLoading} />
                    )}
                    {partyPlaces.length > 0 && (
                        <CategorySlider places={partyPlaces} isLoading={isLoading} />
                    )}
                    {eatingPlaces.length > 0 && (
                        <CategorySlider places={eatingPlaces} isLoading={isLoading} />
                    )}
                </>
            )}
        </>
    );
};

const CategorySlider = ({ places, isLoading }) => {
    const type = places[0]?.type;

    return (
        <section style={{ marginBottom: '4.75rem' }}>
            <h2 style={{ fontWeight: 800 }}>
                {isLoading ? <LoadingSkeleton /> : type}
            </h2>
            <PlacesSlider places={places} isLoading={isLoading} />
        </section>
    );
};

PlacesShowcase.propTypes = propTypes;
