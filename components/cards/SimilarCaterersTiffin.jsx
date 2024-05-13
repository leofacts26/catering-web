"use client"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Button from '@mui/material/Button';

const SimilarCaterersTiffin = ({ tiffin }) => {
    return (
        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <Stack sx={{ marginBottom: '30px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <h2 className='font-24 similar-caterers'>Similar Caterers / Popular Caterers in your area</h2>
                <Link href="/" className="vc-see-all" style={{ color: tiffin ? '#D9822B' : '#C33332' }}>See all</Link>
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
                className="mySwiper swiper-custom-tiffin"
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
                    <SwiperSlide>
                        <div className="vc-similar-card" key={item}>
                            <img src="/img/occasions/03.jpg" alt="" className="img-fluid vc-similar-card-img" />
                            <div className="vc-similar-card-description">
                                <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                    <div className="text-start">
                                        <h3 className='font-18 sc-title'>Balaji Catering Service</h3>
                                        <p className='vc-similar-card-small text-left'>Adyar, Chennai</p>
                                    </div>
                                    <span className='vc-similar-card-cost' style={{ color: tiffin ? '#D9822B' : '#C33332' }}>270 / Plate</span>
                                </Stack>
                                <div className="text-start" style={{ marginBottom: '5px' }}>
                                    <p className='vc-similar-card-small'>Food Type: Veg  | NonVeg</p>
                                </div>
                                <div className="text-start">
                                    <p className='vc-similar-card-small vc-card-dishes'>Cuisines - South Indian, North Indian, Hyderabad Mumbai</p>
                                </div>
                                <Stack direction="row" justifyContent="end">
                                    {tiffin && <Button sx={{
                                        '&:hover': {
                                            backgroundColor: '#D9822B',
                                        },
                                    }} variant="contained" className="viewSimilarCaters">View</Button>}
                                </Stack>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}

export default SimilarCaterersTiffin