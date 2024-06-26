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
import { fetchCateringSearchCards, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';

const ExpoloreCuisinesCard = () => {

    const router = useRouter()

    const { getAllcuisines, isLoading } = useSelector((state) => state.homepage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCuisines())
    }, [])

    // console.log(getAllcuisines, "getAllcuisines");
    const onHandleCuisineFilter = (explorecuisine) => {
        // console.log(explorecuisine, "explorecuisine");
        const cuisineId = explorecuisine.id;
        dispatch(setCuisineTypeFilter({ cuisineId }));
        dispatch(fetchCateringSearchCards());
        const url = `/catering-search`;
        router.push(url);
    }

    return (
        <>
            {getAllcuisines?.length > 0 && <Heading title="Explore Cuisines" />}
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
                            delay: 26666500,
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
                                                onClick={() => onHandleCuisineFilter(explorecuisine)}>
                                                <img src={explorecuisine?.file_name?.original ? explorecuisine?.file_name?.original : '/img/no-image.jpg'} alt="" className="img-fluid explore-cuisine-img image-shadow" />
                                            </Stack>
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