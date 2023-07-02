import PropTypes from 'prop-types';

// Components
import { Container } from '../../../components/Containers/Container/Container';
import { Places } from '../../../components/Places/Places';
import { checkArrayAndPreloadElements, extractServerErrorMessage } from '../../../utils/utils';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

import styles from '../Home.module.css';

const propTypes = {
    places: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const TopPlaces = ({ places, isLoading }) => {
    const { data, error } = places;

    // 1. If places data is loading - it returns a new array with "X" elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is being fetched in order the >Loading skeleton< to visualize inside those div boxes
    const placesPrefilledArr = isLoading ? checkArrayAndPreloadElements(data, 9) : data;
    console.log(placesPrefilledArr)

    return (
        <section>
            <Container>
                <h2 className={styles.title}>
                    {isLoading ? <LoadingSkeleton /> : 'Europe awaits you!'}
                </h2>
                {error ? (
                    <p>{extractServerErrorMessage(places.error)}</p>
                ) : (
                    <Places places={placesPrefilledArr} isLoading={isLoading} />
                )}
            </Container>
        </section>
    );
};

TopPlaces.propTypes = propTypes;
