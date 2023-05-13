import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';
import { Container } from '../../Containers/Container/Container';

import styles from './CitiesSlider.module.css';

export const CitiesSlider = ({ destinations = [], isLoading }) => {
    const validatedData = validateDestinations(destinations);

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
};

const validateDestinations = (destinations) => {
    const hasDestinations = Array.isArray(destinations);
    const hasData = hasDestinations && destinations.length > 0;
    const DEFAULT_ARR = [0, 1, 2, 3];

    const validatedData = hasDestinations && hasData ? destinations : DEFAULT_ARR;

    return validatedData;
};
