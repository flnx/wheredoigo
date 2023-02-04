import { Swiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/css/bundle';
import './Swiper.css';

export const SwiperX = ({ children }) => {
    return (
        <Swiper
            slidesPerView={2.2}
            spaceBetween={20}
            slidesPerGroup={1}
            loop={false}
            loopFillGroupWithBlank={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
                500: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            }}
            className="mySwiper"
        >
            {children}
        </Swiper>
    );
};
