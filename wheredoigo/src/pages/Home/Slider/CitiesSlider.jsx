import { SwiperSlide } from 'swiper/react';
import { SwiperX } from './Swiper';
import images from '../../../utils/images';
import styles from './CitiesSlider.module.css';

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
            <img src={imageUrl} alt="city" className={styles.image}/>
            <div className={styles.content}>
                <h3>Place</h3>
                <p>City, Country</p>
            </div>
        </>
    );
};
