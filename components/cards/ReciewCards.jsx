"use client"
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import AddReview from '../AddReview';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { fetchReviews } from '@/app/features/user/vendorDetailSlice';
import { useParams } from 'next/navigation'
import RatingStars from 'react-rating-stars-component';
import StarIcon from '@mui/icons-material/Star';

const ReciewCards = ({ tiffin }) => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const { accessToken } = useSelector((state) => state.user)
    const { reviewsList } = useSelector((state) => state.vendorDetails);
    console.log(reviewsList, "reviewsList reviewsList");

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchReviews(slug))
        }
    }, [dispatch, accessToken, slug])

    console.log(parseInt('4.00'), "parseInt(item?.rating.slice(0,1))");

    return (

        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>

            {
                reviewsList?.length > 0 && (
                    <>
                        <Stack sx={{ marginBottom: '0px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <h2 className='review-cards'>Reviews: See What customers loved the most</h2>
                            <Link href="/" className="vc-see-all" style={{ color: tiffin ? '#D9822B' : '#C33332' }}>Read all Reviews</Link>
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
                            style={{ padding: '0px 5px' }}
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
                            {reviewsList.length > 0 && reviewsList?.map((item) => (
                                <SwiperSlide style={{ marginRight: '0px' }}>
                                    <div className="vc-review-card" key={item?.id}>
                                        <Stack direction="row" spacing={1}>
                                            <div className="">
                                                <Avatar sx={{ bgcolor: '#a81e1e' }}>{item?.username?.slice(0, 1).toUpperCase()}</Avatar>
                                            </div>
                                            <div className="">
                                                <h3 className='vc-review-card-title'>{item?.username}</h3>
                                                <p className='vc-review-card-months'>{moment(item?.review_date).fromNow()}</p>
                                            </div>
                                        </Stack>
                                        <div className="mt-2">
                                            {[...Array(parseInt(item.rating.slice(0, 1)))].map((star, index) => (
                                                <StarIcon key={index} style={{ color: '#C33332', fontSize: 20 }} />
                                            ))}
                                            <p className='vc-review-card-para text-ellipse-three text-start'>{item?.review_text}</p>
                                            <div className="text-start">
                                                <Link href="/" className='vc-review-card-link' style={{ color: tiffin ? '#D9822B' : '#C33332' }}>Read more</Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                )
            }


            <Divider />
            <AddReview />

        </Container>
    )
}

export default ReciewCards