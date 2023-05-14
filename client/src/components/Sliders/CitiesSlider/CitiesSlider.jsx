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
                        <SwiperSlide className={styles.sliderItem} key={x._id}>
                            <SliderCard destination={x} isLoading={isLoading} />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Container>
        </section>
    );
}

// Validates the input
// 1. If destinations data is invalid (not an array) or its length is 0, it returns a new array with 4 elements
// 1.1 This behavior ensures that Slider will render 4 div boxes when there is invalid input or arr length of 0 
// 1.2 I did it in order the loading skeleton to be rendered properly with 4 elements if isLoading (from RTK) = true and the data is being fetched. 

function validateDestinationsData(destinations) {
    if (Array.isArray(destinations) && destinations.length > 0) {
        return destinations;
    }

    // returns an array of 4 objects with ids from 0 to 3
    return new Array(4).fill(null).map((_, i) => ({ _id: i }));
}
