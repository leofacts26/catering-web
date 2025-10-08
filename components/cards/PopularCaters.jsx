"use client"
import React, { useEffect } from 'react'
import popularcaters from '../../data/popularcaters.json'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularCaterers } from '@/app/features/user/homeSlice';
import PopularCaterersShimmer from '../shimmer/PopularCaterersShimmer';
import Heading from '../Heading';
import { fetchGetAllSubscriptionTypes, setSubscriptionFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';



const PopularCaters = ({ title }) => {
    const router = useRouter()
    const { subscriptionTypes } = useSelector((state) => state.cateringFilter);
    const { popularCaterer, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()
    const { userDetails } = useSelector((state) => state.user)
    const { locationValuesGlobal } = useSelector((state) => state.globalnavbar)

    // console.log(popularCaterer, "popularCaterer"); 
    const data = {
        latitude: locationValuesGlobal?.latitude,
        longitude: locationValuesGlobal?.longitude,
        is_city_search: locationValuesGlobal.latitude ? 1 : 0
    }

    useEffect(() => {
        if (!subscriptionTypes.length) {
            dispatch(fetchGetAllSubscriptionTypes());
        }
    }, [dispatch, subscriptionTypes.length]);

    useEffect(() => {
        dispatch(fetchPopularCaterers(data))
    }, [])


    const handleImageClick = (item) => {
        // console.log(item, "item");
        
        // const id = "2";
        // dispatch(setSubscriptionFilter({ id, subscriptionTypes }))
        // const url = `/catering-search`;
        // const url = `/catering-search/${item?.vendor_id}/${item?.id}`
        const url = `/catering-search/${item?.slug}?branch_slug=${item.branch_slug}`
        router.push(url);
    };

    return (
        <>
            {popularCaterer?.length > 0 && <Heading title={title} center subHeading />}

            <Container maxWidth="lg" className="popular-cater-slider" style={{ marginTop: '25px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            freeMode={true}
                            modules={[Autoplay, FreeMode, Navigation]}
                            className="mySwiper"
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
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            <>
                                {popularCaterer?.length > 0 && popularCaterer?.slice(0, 6).map((cater, index) => (
                                    <SwiperSlide key={popularCaterer?.id}>
                                        <Box onClick={() => handleImageClick(cater)} style={{ padding: '10px 0px 10px 15px' }}>
                                            <img
                                                src={
                                                    cater?.gallery_images?.["vendor-brand-logo"]?.[0]?.image_name?.[0]?.medium || "/img/no-image.jpg"
                                                }
                                                alt={cater?.catering_service_name || "Default Catering Service"}
                                                className="img-fluid popular-caterers-img image-shadow cursor-pointer"
                                            />

                                            <h4 className='popular-caterers-heading overflow-ellipsis'>{cater?.catering_service_name}</h4>
                                            <p className='popular-caterers-des overflow-ellipsis'>{cater?.area} {cater?.street_name}  </p>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </>
                        </Swiper>
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="lg" className="popular-cater-slider" style={{ marginTop: '25px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            freeMode={true}
                            modules={[Autoplay, FreeMode, Navigation]}
                            className="mySwiper"
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
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            <>
                                {popularCaterer?.length > 0 && popularCaterer?.slice(6, 13).map((cater, index) => (
                                    <SwiperSlide key={popularCaterer?.id}>
                                        <Box onClick={() => handleImageClick()} style={{ padding: '10px 0px 10px 15px' }}>
                                            <img
                                                src={
                                                    cater?.gallery_images?.["vendor-brand-logo"]?.[0]?.image_name?.[0]?.medium || "/img/no-image.jpg"
                                                }
                                                alt={cater?.catering_service_name || "Default Name"}
                                                className="img-fluid popular-caterers-img image-shadow cursor-pointer"
                                            />
                                            <h4 className='popular-caterers-heading overflow-ellipsis'>{cater?.catering_service_name}</h4>
                                            <p className='popular-caterers-des overflow-ellipsis'> {cater?.street_name} {cater?.area} </p>
                                        </Box>
                                    </SwiperSlide>
                                ))}
                            </>
                        </Swiper>
                    </Grid>
                </Box>
            </Container>


        </>
    )
}

export default PopularCaters