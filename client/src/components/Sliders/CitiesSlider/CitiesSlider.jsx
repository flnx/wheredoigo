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

// Validates the input
// 1. If there is no data or the data is invalid it returns an array with 4 elements
// 1.1 This behavior ensures that Slider will always render 4 elements (even if there is no data)
// 1.2 It also ensures that the loading skeleton will always be rendered with 4 elements if isLoading = true. 

function validateDestinationsData(destinations = [0, 1, 2, 3]) {
    if (Array.isArray(destinations) && destinations.length > 0) {
        return destinations;
    }
    return [0, 1, 2, 3];
}
