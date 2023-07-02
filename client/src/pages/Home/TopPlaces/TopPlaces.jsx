import PropTypes from 'prop-types';

// Components
import { Container } from '../../../components/Containers/Container/Container';
import { Places } from '../../../components/Places/Places';
import { checkArrayAndPreloadElements, extractServerErrorMessage } from '../../../utils/utils';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

import styles from '../Home.module.css';
import { TextWrap } from '../../../components/TextWrap/TextWrap';

const propTypes = {
    places: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const TopPlaces = ({ places, isLoading }) => {
    const { data, error } = places;

    // 1. If places data is loading - it returns a new array with "X" elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is being fetched in order the >Loading skeleton< to visualize inside those div boxes
    const placesPrefilledArr = isLoading ? checkArrayAndPreloadElements(data, 9) : data;

    const introMessage = placesPrefilledArr.length != 0 ? 'Europe awaits you!' : '';

    return (
        <section>
            <Container>
                {error ? (
                    <p>{extractServerErrorMessage(places.error)}</p>
                ) : (
                    <>
                        <h2 className={styles.title}>
                            <TextWrap
                                isLoading={isLoading}
                                content={introMessage}
                            ></TextWrap>
                        </h2>
                        <Places places={placesPrefilledArr} isLoading={isLoading} />
                    </>
                )}
            </Container>
        </section>
    );
};

TopPlaces.propTypes = propTypes;
