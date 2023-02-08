import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from './SwiperSettings';
import { SliderCard } from './SliderCard';

import styles from './PlacesSlider.module.css';

export const PlacesSlider = ({ destinations }) => {
    return (
        <section>
            <div className="container">
                <SliderWrapper>
                    <SwiperSlide className={styles.sliderItem}>
                        <SliderCard />
                    </SwiperSlide>
                    <SwiperSlide className={styles.sliderItem}>
                        <SliderCard />
                    </SwiperSlide>
                    <SwiperSlide className={styles.sliderItem}>
                        <SliderCard />
                    </SwiperSlide>
                    <SwiperSlide className={styles.sliderItem}>
                        <SliderCard />
                    </SwiperSlide>
                </SliderWrapper>
            </div>
        </section>
    );
};

// export const CitiesSlider = ({ destinations }) => {
//     return (
//         <section>
//             <div className="container">
//                 <SliderWrapper>
//                     {destinations.map((x) => (
//                         <SwiperSlide
//                             className={styles.sliderItem}
//                             key={x.objectId}
//                         >
//                             <SliderCard destination={x} />
//                         </SwiperSlide>
//                     ))}
//                 </SliderWrapper>
//             </div>
//         </section>
//     );
// };
