import { Swiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import 'swiper/css/bundle';
import '../Swiper.css';

export const SliderWrapper = ({ children }) => {
    return (
        <Swiper
            slidesPerView={1.1}
            slidesPerGroup={1}
            spaceBetween={12}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
                500: {
                    slidesPerView: 1.4,
                    slidesPerGroup: 2,
                },
                768: {
                    slidesPerView: 2.7,
                    slidesPerGroup: 3,
                },
                1024: {
                    slidesPerView: 3.1,
                    slidesPerGroup: 3,
                },
                1300: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
            }}
            className="mySwiper"
        >
            {children}
        </Swiper>
    );
};
