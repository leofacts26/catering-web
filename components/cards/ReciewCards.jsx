"use client"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


const ReciewCards = ({tiffin}) => {
    return (
        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <Stack sx={{ marginBottom: '0px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <h2 className='review-cards'>Reviews: See What customers loved the most</h2>
                <Link href="/" className="vc-see-all" style={{color : tiffin ? '#D9822B' : '#C33332'}}>Read all Reviews</Link>
            </Stack>

            <Swiper
                navigation={true}
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                style={{padding: '0px 5px'}}
                className="mySwiper branded-cater-slider"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    960: {
                        slidesPerView: 4,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <SwiperSlide style={{marginRight: '0px'}}>
                    <div className="vc-review-card" key={item}>
                        <Stack direction="row" spacing={1}>
                            <div className="">
                                <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg" alt="" className="img-fluid vc-review-card-img" />
                            </div>
                            <div className="">
                                <h3 className='vc-review-card-title'>Balaji</h3>
                                <p className='vc-review-card-months'>2 months ago</p>
                            </div>
                        </Stack>
                        <div className="">
                            <p className='vc-review-card-para text-ellipse-three text-start'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed amet, eos architecto laudantium illum adipisci asperiores ipsam libero nobis velit porro rerum. Laborum, magni assumenda.</p>
                            <div className="text-start">
                            <Link href="/" className='vc-review-card-link' style={{color : tiffin ? '#D9822B' : '#C33332'}}>Read more</Link>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}

export default ReciewCards