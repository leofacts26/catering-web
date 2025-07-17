"use client"
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import explorecuisines from '../../data/explorecuisines.json'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCuisines } from '@/app/features/user/homeSlice';
import { useEffect } from 'react';
import Heading from '../Heading';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
// import { fetchCateringCuisines, fetchCateringSearchCards, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useRouter } from 'next/navigation';
import { fetchTiffinKitchenTypes, fetchtiffinSearchCards, setKitchenTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';

const ExpoloreKitchenCardTiffin = () => {

    const router = useRouter()
    const { getTiffinKitchenTypes, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    console.log(getTiffinKitchenTypes, "getTiffinKitchenTypes");
    

    useEffect(() => {
        dispatch(fetchTiffinKitchenTypes())
    }, [])

    // useEffect(() => {
    //     if (!getTiffinKitchenTypes.length > 0) {
    //         dispatch(fetchTiffinKitchenTypes());
    //     }
    // }, [dispatch, getTiffinKitchenTypes.length]);

    // console.log(getAllcuisines, "getAllcuisines");
    const onHandleKitchenFilter = (kitchen) => {
        const kitchenId = kitchen.id;
        // Pass kitchenType as query param
        const url = `/tiffin-search?kitchenType=${kitchenId}`;
        router.push(url);
    }


    return (
        <>
            {getTiffinKitchenTypes?.length > 0 && <Heading subHeading title="Explore Kitchen Types" />}
            <Container maxWidth="lg" id="cuisine">
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
                            getTiffinKitchenTypes?.length > 0 && getTiffinKitchenTypes?.map((kitchen, index) => (
                                <Grid item xs={6} sm={3} md={3} lg={2} xl={2} className={`p-0 w-100 first-card`} key={index}>
                                    <SwiperSlide>
                                        <CardContent key={kitchen.id} className='w-100' style={{ padding: '5px 10px' }}>
                                            <Stack direction="row" justifyContent="center" className='explore-cuisine-card border-radius-two w-100 cursor-pointer'
                                                onClick={() => onHandleKitchenFilter(kitchen)}>
                                                {/* <img src={kitchen?.file_name?.original ? kitchen?.file_name?.original : '/img/no-image.jpg'} alt="" className="img-fluid explore-cuisine-img image-shadow" /> */}

                                                <div className="explore-cator-box" key={kitchen?.id}>
                                                    <img
                                                        // onClick={() => handleImageClick(kitchen?.occasion_id)}  
                                                        src={kitchen?.file_name?.medium ? kitchen?.file_name?.medium : '/img/no-image.jpg'} className="img-fluid cuisines-img cursor-pointer" />
                                                    <h4 className='text-center cuisines-title'>{kitchen?.name}</h4>
                                                </div>

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

export default ExpoloreKitchenCardTiffin