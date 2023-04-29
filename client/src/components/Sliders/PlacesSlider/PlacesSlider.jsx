import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { SliderWrapper } from './SwiperSettings';

import styles from './PlacesSlider.module.css';
import { Container } from '../../Containers/Container/Container';

export const PlacesSlider = ({ places }) => {
    return (
        <section>
            <Container>
                <SliderWrapper>
                    {places.map((place) => (
                        <SwiperSlide className={styles.sliderItem} key={place._id}>
                            <Link to={`/places/${place._id}`}>
                                <img
                                    src={place.imageUrl}
                                    alt={place.place}
                                    className={styles.image}
                                />
                                <div className={styles.content}>
                                    <h3>{place.place}</h3>
                                    <p>{place.city}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Container>
        </section>
    );
};
