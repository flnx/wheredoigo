import PropTypes from 'prop-types';

import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';
import { Container } from '../../Containers/Container/Container';

import { checkArrayAndPreloadElements, extractServerErrorMessage } from '../../../utils/utils';

import styles from './CitiesSlider.module.css';

CitiesSlider.propTypes = {
    destinationsData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export function CitiesSlider({ destinationsData = {}, isLoading }) {
    const data = destinationsData?.data?.result || [];

    // 1. If destinations data is loading - it returns a new array with X elements
    // 1.1 This ensures that the Slider will render (X) amount of div boxes when the data is being fetched in order the loading skeleton to visualize inside them
    const destinations = checkArrayAndPreloadElements(data, 4);

    return (
        <section>
            <Container>
                {destinations.error ? (
                    <h2>{extractServerErrorMessage(destinations.error)}</h2>
                ) : (
                    <SliderWrapper>
                        {destinations.map((x) => (
                            <SwiperSlide className={styles.sliderItem} key={x._id}>
                                <SliderCard destination={x} isLoading={isLoading} />
                            </SwiperSlide>
                        ))}
                    </SliderWrapper>
                )}
            </Container>
        </section>
    );
}
