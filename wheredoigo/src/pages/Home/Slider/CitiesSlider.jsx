import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { SwiperX } from './Swiper';
import styles from './CitiesSlider.module.css';

export const CitiesSlider = ({ destinations }) => {
    return (
        <section>
            <div className="container">
                <SwiperX>
                    {destinations.map((x) => (
                        <SwiperSlide className={styles.sliderItem} key={x.objectId}>
                            <Card destination={x} />
                        </SwiperSlide>
                    ))}
                </SwiperX>
            </div>
        </section>
    );
};


const Card = ({ destination }) => {
    return (
        <Link to={`/destinations/${destination.objectId}`}>
            <img src={destination.imageUrl.url} alt="city" className={styles.image} />
            <div className={styles.content}>
                <h3>{destination.city}</h3>
                <p>{destination.country}</p>
            </div>
        </Link>
    );
};
