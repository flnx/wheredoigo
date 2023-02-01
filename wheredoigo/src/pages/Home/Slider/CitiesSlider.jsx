import { Link } from 'react-router-dom';
import images from '../../../utils/images';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import './CitiesSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/bundle';

export const CitiesSlider = () => {
    return (
        <section>
            <div className="container">
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
                    {images.map((img, i) => (
                        <SwiperSlide className="item" key={i}>
                            <Card imageUrl={img} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

const Card = ({ imageUrl }) => {
    return (
        <>
            <img src={imageUrl} alt="city" />
            <div className="content">
                <h2>Place</h2>
                <p>City, Country</p>
            </div>
        </>
    );
};
