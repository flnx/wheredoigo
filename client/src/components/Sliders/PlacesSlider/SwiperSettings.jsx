import { Swiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/css/bundle';
import '../Swiper.css';

export const SliderWrapper = ({ children }) => {
    return (
        <Swiper
            slidesPerView={1.2}
            spaceBetween={10}
            slidesPerGroup={1}
            loop={false}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
                500: {
                    slidesPerView: 2.2,
                    slidesPerGroup: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 25,
                },
            }}
            className="mySwiper"
        >
            {children}
        </Swiper>
    );
};
