"use client"
import React, { useEffect } from 'react'
import popularcaters from '../../data/popularcaters.json'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularCaterers, fetchPopularTiffins } from '@/app/features/user/homeSlice';
import PopularCaterersShimmer from '../shimmer/PopularCaterersShimmer';
import Heading from '../Heading';
import { useRouter } from 'next/navigation';
import { fetchGetAllTiffinSubscriptionTypes, fetchtiffinSearchCards, setTiffinSubscriptionFilter } from '@/app/features/tiffin/tiffinFilterSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

const PopularTiffins = () => {
    const router = useRouter()
    const { userDetails } = useSelector((state) => state.user)
    const { popularTiffins, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()
    const { tiffinSubscriptionTypes } = useSelector((state) => state.tiffinFilter);


    const data = {
        latitude: userDetails?.latitude,
        longitude: userDetails?.longitude
    }

     useEffect(() => {
        if (!tiffinSubscriptionTypes?.length) {
          dispatch(fetchGetAllTiffinSubscriptionTypes());
        }
      }, [dispatch, tiffinSubscriptionTypes?.length]);

    useEffect(() => {
        dispatch(fetchPopularTiffins(data))
    }, [])

    const onHandlePopularTiffenFilter = async (cater) => {
    //    await dispatch(setTiffinSubscriptionFilter({ id, tiffinSubscriptionTypes }))
        // dispatch(fetchtiffinSearchCards())
        // const url = `/tiffin-search`;
        const url = `/tiffin-search/${cater?.vendor_id}/${cater?.id}`
        router.push(url);
    };

    return (
        <>
            <Container maxWidth="lg" className="popular-cater-slider" style={{ marginTop: '25px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} 
                    // onClick={() => onHandlePopularTiffenFilter("5")}
                    >
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
                                {popularTiffins?.length > 0 && popularTiffins?.map((cater, index) => (
                                    <SwiperSlide onClick={() => onHandlePopularTiffenFilter(cater)} key={popularTiffins?.id} >
                                        <Box  style={{ padding: '10px 0px 10px 15px' }}>
                                            <img src={cater.gallery_images["vendor-brand-logo"][0].image_name[0]?.medium} alt={cater?.catering_service_name} className="img-fluid popular-caterers-img image-shadow cursor-pointer" />
                                            <h4 className='popular-caterers-heading overflow-ellipsis'>{cater?.catering_service_name}</h4>
                                            <p className='popular-caterers-des overflow-ellipsis'> {cater?.area} {cater?.street_name}  </p>
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

export default PopularTiffins