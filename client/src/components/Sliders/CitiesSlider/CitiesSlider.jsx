import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';

import styles from './CitiesSlider.module.css';

export const CitiesSlider = ({ destinations }) => {
    console.log(destinations);
    return (
        <section>
            <div className="container">
                <SliderWrapper>
                    {destinations.map((x) => (
                        <SwiperSlide className={styles.sliderItem} key={x._id}>
                            <SliderCard destination={x} />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </div>
        </section>
    );
};
