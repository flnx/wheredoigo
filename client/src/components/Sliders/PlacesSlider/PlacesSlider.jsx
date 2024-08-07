import PropTypes from 'prop-types';

// Utils
import { checkArrayAndPreloadElements } from 'src/utils/utils';

// Components
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { SliderWrapper } from './SwiperSettings';
import { Container } from 'src/components/Containers/Container/Container';
import { LoadingSkeleton } from 'src/components/LoadingSkeletons/LoadingSkeleton';

import routeConstants from 'src/constants/routeConstants';
import styles from './PlacesSlider.module.css';

const propTypes = {
    places: PropTypes.arrayOf(
        PropTypes.shape({
            place: PropTypes.string,
            city: PropTypes.string,
            _id: PropTypes.string,
            imageUrl: PropTypes.string,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const PlacesSlider = ({ places, isLoading }) => {
    const { routePath } = routeConstants.PLACES.BY_ID;

    const placesData = checkArrayAndPreloadElements(places, 4);
    const loadingClass = `${isLoading ? styles.loading : null}`;

    return (
        <section>
            <Container>
                <SliderWrapper>
                    {placesData.map((place) => (
                        <SwiperSlide className={styles.sliderItem} key={place._id}>
                            <Link to={routePath(place._id)} className={loadingClass}>
                                <div className={`${styles.imageCon} ${loadingClass}`}>
                                    {isLoading ? (
                                        <LoadingSkeleton />
                                    ) : (
                                        <img
                                            src={place.imageUrl}
                                            alt={place.place}
                                            className={styles.image}
                                        />
                                    )}
                                </div>

                                <div className={styles.content}>
                                    <h4 className={styles.placeName}>
                                        {isLoading ? <LoadingSkeleton /> : place.name}
                                    </h4>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
            </Container>
        </section>
    );
};

PlacesSlider.propTypes = propTypes;
