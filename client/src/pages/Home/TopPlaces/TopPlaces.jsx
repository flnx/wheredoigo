import PropTypes from 'prop-types';

// Components
import { Container } from '../../../components/Containers/Container/Container';
import { Places } from '../../../components/Places/Places';
import { checkArrayAndPreloadElements, extractServerErrorMessage } from '../../../utils/utils';

import styles from '../Home.module.css';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

const propTypes = {
    placesData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export const TopPlaces = ({ placesData, isLoading }) => {
    const data = placesData?.data || [];

    // 1. If places data is loading - it returns a new array with X elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is being fetched in order the loading skeleton to visualize inside them
    const places = checkArrayAndPreloadElements(data, 9);
    
    return (
        <section>
            <Container>
                <h2 className={styles.title}>
                    {isLoading ? <LoadingSkeleton /> : "Europe awaits you!"}
                </h2>
                {placesData.error 
                    ? <p>{extractServerErrorMessage(places.error)}</p>
                    : <Places places={places} isLoading={isLoading}/>
                }
            </Container>
        </section>
    );
};

TopPlaces.propTypes = propTypes;