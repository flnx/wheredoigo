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
    const partyPlaces = places.filter((x) => x?.type.toLowerCase() == 'fun');
    const eatingPlaces = places.filter((x) => x?.type.toLowerCase() == 'eat');

    // If data is loading - it returns a new array with 3 elements (in order to render 3 sections)
    // This ensures that there will be 3 category sections for the loading skeleton during the fetching process
    const prefilledArr = checkArrayAndPreloadElements(places, 3);

    return (
        <>
            {isLoading ? (
                // Renders 3 Slider Sections to show when data is being fetched (Sections will show loading skeleton automatically)
                prefilledArr.map((x) => (
                    <CategorySlider places={places} isLoading={isLoading} key={x._id} />
                ))
            ) : (
                // When the data is fetched it renders the places by category
                // If there's a category that doesn't have a place match, it will not render it.
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
            <h2 style={{ fontWeight: 800 }}>{isLoading ? <LoadingSkeleton /> : type}</h2>
            <PlacesSlider places={places} isLoading={isLoading} />
        </section>
    );
};

PlacesShowcase.propTypes = propTypes;
