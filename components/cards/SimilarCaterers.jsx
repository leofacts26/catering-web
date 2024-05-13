"use client"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
// import Button from '@mui/material/Button';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const SimilarCaterers = ({ tiffin }) => {
    return (
        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <Stack sx={{ marginBottom: '10px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
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
                    delay: 26666500,
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
                    <SwiperSlide>
                        <div className="vc-similar-card" key={item}>
                            <img src="/img/occasions/03.jpg" alt="" className="img-fluid vc-similar-card-img" />
                            <div className="vc-similar-card-description">
                                <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                    <div className="text-start">
                                        <h3 className='sc-title'>Balaji Catering Service</h3>
                                        <p className='vc-similar-card-small text-left'>Adyar, Chennai</p>
                                    </div>
                                    {/* <span className='vc-similar-card-cost' style={{ color: tiffin ? '#D9822B' : '#C33332' }}>270 / Plate</span> */}
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <img src="/img/icons/list-card-veg.png" className='list-similar-veg' alt="" />
                                    <span className="veg-green-similar" style={{ marginRight: '6px' }}>
                                        Veg</span> &   <img src="/img/icons/list-card-non-veg.png" className='list-similar-veg' alt="" />
                                    <span className="food-type-non-veg-similar font-16">Non-Veg</span> </Stack>

                                <h2 className="vc-similar-blue">South Indian | North Indian | Mughlai | Kerala</h2>

                                <Stack direction="row" alignItems="center" justifyContent="end" className="mb-4">
                                    <Stack direction="row" alignItems="center" justifyContent="end" spacing={0}>
                                        <CurrencyRupeeIcon className={tiffin ? 'vc-price-one-similar-tiffin' : 'vc-price-one-similar-catering'} />
                                        <span className={tiffin ? 'vc-price-one-similar-tiffin' : 'vc-price-one-similar-catering'}> 250 / Plate </span>
                                    </Stack>
                                </Stack>


                                {/* <div className="text-start" style={{ marginBottom: '5px' }}>
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
                                </Stack> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>




        </Container>
    )
}

export default SimilarCaterers