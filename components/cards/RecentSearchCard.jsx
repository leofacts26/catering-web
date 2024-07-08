"use client"
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import recentSearches from '../../data/recentSearches.json'
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRecentSearches } from '@/app/features/user/homeSlice';
import { format } from 'date-fns';
import Heading from '../Heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { fetchCateringSearchCards, setCuisineTypeFilter } from '@/app/features/user/cateringFilterSlice';

const RecentSearchCard = () => {

    const dispatch = useDispatch()
    const { recentSearches } = useSelector((state) => state.homepage)
    const { accessToken } = useSelector((state) => state.user)

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchRecentSearches())
        }
    }, [])

    // console.log(recentSearches, "recentSearches"); 
    // Feb 13 - Feb 15 , 600 people

    const formatDateRange = (startDate, endDate, peopleCount) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const formattedStart = format(start, 'MMM dd');
        const formattedEnd = format(end, 'MMM dd');
        return `${formattedStart} - ${formattedEnd}, ${peopleCount} people`;
    };



    return (
        <>
            {recentSearches.length > 0 && <Heading title="Your Recent Searches" />}
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'center', lg: 'start' }} spacing={0}>
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
                        style={{ padding: '0px 1px' }}
                        className="mySwiper cuisine-slider w-100"
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
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
                        {
                            recentSearches.length > 0 && recentSearches?.slice(0, 4)?.map((recentSearch) => (
                                <SwiperSlide>
                                    <CardContent className='w-100' key={recentSearch.id} style={{ padding: '0px', margin: '10px 10px 10px 0px' }}>
                                        <Stack direction="row" alignItems="center" spacing={1} className='recent-search-card w-100'>
                                            <Box>
                                                <img src="/img/no-image.jpg" alt="" className="img-fluid recent-search-img" />
                                            </Box>
                                            <Box>
                                                <h3 className='recent-search-title'>{recentSearch?.city_name}</h3>
                                                <p className='recent-search-desc'>
                                                    {formatDateRange(recentSearch.start_date, recentSearch.end_date, recentSearch.people_count)}
                                                </p>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Stack>
            </Container >
        </>
    )
}

export default RecentSearchCard