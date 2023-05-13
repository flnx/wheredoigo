import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';
import { Container } from '../../Containers/Container/Container';

import styles from './CitiesSlider.module.css';

CitiesSlider.propTypes = {
    destinations: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export function CitiesSlider({ destinations = [], isLoading = true }) {
    const validatedData = validateDestinationsData(destinations);

    console.log(destinations);

    return (
        <section>
            <Container>
                <SliderWrapper>
                    {validatedData.map((x) => (
                        <SwiperSlide className={styles.sliderItem} key={x._id || x}>
                            <SliderCard destination={x} isLoading={isLoading} />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Container>
        </section>
    );
}

// Ensure that there is an array with 4 elements when is fetching or loading in order to render the Loading skeleton.
function validateDestinationsData(destinations) {
    const hasDestinations = Array.isArray(destinations);
    const hasData = hasDestinations && destinations.length > 0;
    const DEFAULT_ARR = [0, 1, 2, 3];
    const validatedData = hasDestinations && hasData ? destinations : DEFAULT_ARR;

    return validatedData;
}
