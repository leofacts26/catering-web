"use client"
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import explorecuisines from '../../data/explorecuisines.json'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCuisines } from '@/app/features/user/homeSlice';
import { useEffect } from 'react';
import Heading from '../Heading';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { fetchCateringCuisines, fetchCateringSearchCards, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';

const ExpoloreCuisinesCard = () => {

    const router = useRouter()
    const { getCateringCuisines } = useSelector((state) => state.cateringFilter)
    const { getAllcuisines, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()

    console.log(getAllcuisines, "getAllcuisines")

    useEffect(() => {
        dispatch(fetchCuisines())
    }, [])

    useEffect(() => {
        if (!getCateringCuisines.length) {
            dispatch(fetchCateringCuisines());
        }
    }, [dispatch, getCateringCuisines.length]);


    // Handles parent cuisine click: select parent and all children
    const onHandleCuisineFilter = (explorecuisine) => {
        const cuisineId = explorecuisine.id;
        // Add a param to indicate all children should be selected (handled in search page)
        const url = `/catering-search?cuisineId=${cuisineId}&selectAllChildren=1`;
        router.push(url);
    }

    // console.log(getAllcuisines, "getAllcuisines");

    return (
        <>
            {getAllcuisines?.length > 0 && (
                <div id="cuisine">
                    <Heading subHeading title="Explore Cuisines" />
                </div>
            )}
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Swiper
                        navigation={true}
                        slidesPerView={6}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}

                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        style={{ padding: '0px 5px' }}
                        className="mySwiper cuisine-slider"
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            600: {
                                slidesPerView: 4,
                            },
                            960: {
                                slidesPerView: 6,
                            },
                            1280: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        {
                            getAllcuisines?.length > 0 && getAllcuisines?.map((explorecuisine, index) => (
                                <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={`p-0 w-100 first-card`} key={index}>
                                    <SwiperSlide>
                                        <CardContent key={explorecuisine.id} className='w-100' style={{ padding: '5px 10px' }}>
                                            <Stack direction="row" justifyContent="center" className='explore-cuisine-card border-radius-two w-100 cursor-pointer'
                                                onClick={() => onHandleCuisineFilter(explorecuisine, false)}>
                                                <div className="explore-cator-box" key={explorecuisine?.occasion_id}>
                                                    <img
                                                        src={explorecuisine?.file_name?.medium ? explorecuisine?.file_name?.medium : '/img/no-image.jpg'} className="img-fluid cuisines-img cursor-pointer" />
                                                    <h4 className='text-center cuisines-title'>{explorecuisine?.name}</h4>
                                                </div>
                                            </Stack>
                                            {/* No children rendering. Parent click will select all children in search page. */}
                                        </CardContent>
                                    </SwiperSlide>
                                </Grid>
                            ))
                        }

                    </Swiper>

                </Grid>
                {/* <Stack direction="row" justifyContent="center">
                    <ExpandMoreIcon style={{ fontSize: '55px', color: 'rgb(90 88 88)' }} />
                </Stack> */}
            </Container >
        </>

    )
}

export default ExpoloreCuisinesCard