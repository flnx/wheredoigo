import PropTypes from 'prop-types';

// Components
import { Container } from 'src/components/Containers/Container/Container';
import { Places } from 'src/components/Places/Places';
import { TextWrap } from 'src/components/TextWrap/TextWrap';


import { checkArrayAndPreloadElements, extractServerErrorMessage } from 'src/utils/utils';

import styles from '../Home.module.css';

const propTypes = {
    places: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const TopPlaces = ({ places, isLoading }) => {
    const { data, error } = places;

    // 1. If places data is loading - it returns a new array with "9" elements
    // 1.1 This ensures that the section will render (9) amount of div boxes (for Loading Skeletons)..
    // ..when the data is being fetched the >Loading skeletons< will be visualized inside those div boxes
    const explorePlaces = isLoading
        ? checkArrayAndPreloadElements(data?.explorePlaces, 9)
        : data.explorePlaces;

    const eatPlaces = isLoading
        ? checkArrayAndPreloadElements(data?.eatPlaces, 9)
        : data.eatPlaces;

    // Shows the text the when there is no errors and there is actual places to show
    const europeIntroText = !error && explorePlaces.length != 0 ? 'Europe awaits you!' : '';
    const eatIntroText = !error && eatPlaces.length != 0 ? 'Want to grab some food?' : '';

    return (
        <section>
            <Container>
                {error ? (
                    <p>{extractServerErrorMessage(places.error)}</p>
                ) : (
                    <div>
                        <section className="mb-5">
                            <h2 className={styles.title}>
                                <TextWrap isLoading={isLoading} content={europeIntroText} />
                            </h2>
                            <Places places={explorePlaces} isLoading={isLoading} />
                        </section>
                        <section>
                            <h2 className={styles.title}>
                                <TextWrap isLoading={isLoading} content={eatIntroText} />
                            </h2>
                            <Places places={eatPlaces} isLoading={isLoading} />
                        </section>
                    </div>
                )}
            </Container>
        </section>
    );
};

TopPlaces.propTypes = propTypes;
