import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';

import styles from './CitiesSlider.module.css';
import { Container } from '../../Containers/Container/Container';

export const CitiesSlider = ({ destinations = [] }) => {
    return (
        <section>
            <Container>
                <SliderWrapper>
                    {destinations.map((x) => (
                        <SwiperSlide className={styles.sliderItem} key={x._id}>
                            <SliderCard destination={x} />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Container>
        </section>
    );
};
