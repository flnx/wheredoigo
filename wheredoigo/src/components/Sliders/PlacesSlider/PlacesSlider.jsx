import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { SliderWrapper } from './SwiperSettings';

import styles from './PlacesSlider.module.css';

export const PlacesSlider = ({ places }) => {
    return (
        <section>
            <div className="container">
                <SliderWrapper>
                    {places.map((x) => (
                        <SwiperSlide
                            className={styles.sliderItem}
                            key={x.objectId}
                        >
                            <Link to={`/place/${x.objectId}`}>
                                <img
                                    src={x.image.url}
                                    alt={x.place}
                                    className={styles.image}
                                />
                                <div className={styles.content}>
                                    <h3>{x.place}</h3>
                                    <p>{x.country}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </div>
        </section>
    );
};