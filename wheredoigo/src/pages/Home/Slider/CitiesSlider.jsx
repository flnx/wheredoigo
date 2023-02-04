import { SwiperSlide } from 'swiper/react';
import { SwiperX } from './Swiper';

import images from '../../../utils/images';

import styles from './CitiesSlider.module.css';
import './Swiper.css';

export const CitiesSlider = () => {
    return (
        <section>
            <div className="container">
                <SwiperX>
                    {images.map((img, i) => (
                        <SwiperSlide className={styles.sliderItem} key={i}>
                            <Card imageUrl={img} />
                        </SwiperSlide>
                    ))}
                </SwiperX>
            </div>
        </section>
    );
};

const Card = ({ imageUrl }) => {
    return (
        <>
            <img src={imageUrl} alt="city" />
            <div className={styles.content}>
                <h2>Place</h2>
                <p>City, Country</p>
            </div>
        </>
    );
};
