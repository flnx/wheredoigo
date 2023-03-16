import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';

import styles from './CitiesSlider.module.css';

export const CitiesSlider = ({ destinations }) => {
    return (
        <section>
            <div className="container">
                <SliderWrapper>
                    {destinations.map((x) => (
                        <SwiperSlide
                            className={styles.sliderItem}
                            key={x.objectId}
                        >
                            <SliderCard destination={x} />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </div>
        </section>
    );
};
