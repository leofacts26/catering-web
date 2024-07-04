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



import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddReviewTiffin from '../AddReviewTiffin';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




const ReviewCardTiffin = ({ tiffin }) => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const { accessToken } = useSelector((state) => state.user)
    const { reviewsList } = useSelector((state) => state.vendorDetails);
    // console.log(reviewsList, "reviewsList reviewsList"); 

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (accessToken) {
            dispatch(fetchReviews(slug[0]))
        }
    }, [dispatch, accessToken, slug[0]])

    // console.log(parseInt('4.00'), "parseInt(item?.rating.slice(0,1))"); 

    return (
        <>
            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>

                {
                    reviewsList?.length > 0 && (
                        <>
                            <Stack sx={{ marginBottom: '0px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                <h2 className='review-cards'>Reviews: See What customers loved the most</h2>
                                <a href="javascript:void(0)" className="vc-see-all" style={{ color: tiffin ? '#D9822B' : '#C33332' }} onClick={handleClickOpen}>Read all Reviews</a>
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
                                                    <Avatar sx={{ bgcolor: '#D9822B' }}>{item?.username?.slice(0, 1).toUpperCase()}</Avatar>
                                                </div>
                                                <div className="">
                                                    <h3 className='vc-review-card-title'>{item?.username}</h3>
                                                    <p className='vc-review-card-months'>{moment(item?.review_date).fromNow()}</p>
                                                </div>
                                            </Stack>
                                            <div className="mt-2">
                                                {[...Array(parseInt(item.rating.slice(0, 1)))].map((star, index) => (
                                                    <StarIcon key={index} style={{ color: '#D9822B', fontSize: 20 }} />
                                                ))}
                                                <p className='vc-review-card-para text-ellipse-three text-start'>{item?.review_text}</p>
                                                <div className="text-start">
                                                    <Link href="javascript:void(0)" className='vc-review-card-link' style={{ color: tiffin ? '#D9822B' : '#C33332' }} onClick={handleClickOpen}>Read more</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )
                }
                {/* <Divider /> */}
                <AddReviewTiffin tiffin />
            </Container>

            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <h2 style={{ fontSize: '18px', marginTop: '20px' }}> Reviews: See What customers loved the most ..</h2>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        {reviewsList.length > 0 && reviewsList?.map((item) => (
                            <div style={{ marginRight: '0px' }}>
                                <div className="vc-review-card" key={item?.id}>
                                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                                        <Stack direction="row" spacing={1}>
                                            <div className="">
                                                <Avatar sx={{ bgcolor: '#d9822b' }}>{item?.username?.slice(0, 1).toUpperCase()}</Avatar>
                                            </div>
                                            <div className="">
                                                <h3 className='vc-review-card-title'>{item?.username}</h3>
                                                <p className='vc-review-card-months'>{moment(item?.review_date).fromNow()}</p>
                                            </div>
                                        </Stack>
                                        <div className="mt-2">
                                            {[...Array(parseInt(item.rating.slice(0, 1)))].map((star, index) => (
                                                <StarIcon key={index} style={{ color: '#d9822b', fontSize: 20 }} />
                                            ))}
                                        </div>
                                    </Stack>
                                    <p className='vc-review-card-para  text-start ms-5'>{item?.review_text}</p>
                                </div>
                            </div>
                        ))}
                    </DialogContent>
                </BootstrapDialog>
            </React.Fragment>

        </>
    )
}

export default ReviewCardTiffin