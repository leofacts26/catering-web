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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTiffinSimilarCaterer } from '@/app/features/tiffin/tiffinFilterSlice';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { addchWishlist } from '@/app/features/user/settingSlice';


const SimilarCaterersTiffin = ({ tiffin }) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const router = useRouter()

    const { getTiffinSimilarTypes } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTiffinSimilarCaterer())
    }, [])


    const [wishlist, setWishlist] = useState({});

    const onHandleAddFavourite = (branchId) => {
        const currentStatus = wishlist[branchId] || false;
        const vendor_type = "Tiffin"
        let data = {
            branchId,
            whishlistStatus: !currentStatus ? 1 : 0,
            vendor_type
        }
        dispatch(addchWishlist(data))
        setWishlist((prevState) => ({ ...prevState, [branchId]: !currentStatus }));
    }

    useEffect(() => {
        const initialWishlist = {};
        getTiffinSimilarTypes.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [getTiffinSimilarTypes])

    console.log(getTiffinSimilarTypes, "getTiffinSimilarTypes");

    // onNavigateDetailPage 
    const onNavigateDetailPage = (vendor_id, id) => {
        router.push(`/tiffin-search/${vendor_id}/${id}`)
    }



    return (
        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
            {getTiffinSimilarTypes?.length > 0 && <Stack sx={{ marginBottom: '10px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <h2 className='font-24 similar-caterers'>Similar Tiffin / recommanded Tiffin in your area</h2>
                <Link href="/tiffin-search" className="vc-see-all" style={{ color: tiffin ? '#D9822B' : '#C33332' }}>See all</Link>
            </Stack>}

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
                {getTiffinSimilarTypes?.map((getSearchCard) => {
                    const brandLogo = getSearchCard?.brand_logo?.[0]?.original;
                    const bannerImage = getSearchCard?.banner_images?.[0]?.original;
                    const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
                    return (
                        <SwiperSlide>
                            <div className='text-decoration-none cursor-pointer'>
                                <div className="vc-similar-card" onClick={(e) => {
                                    onNavigateDetailPage(getSearchCard?.vendor_id, getSearchCard?.id)
                                    e.stopPropagation()
                                }}>
                                    <div className="grid-img-box">
                                        <div className="view-all-dark-overlay"></div>
                                        <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                        <div className="grid-icons">
                                            <ShareIcon className='grid-lse-icons' style={{ marginRight: '10px', cursor: 'pointer' }} />
                                            {accessToken ? <>
                                                {wishlist[getSearchCard?.id] ? <FavoriteIcon className='grid-lse-icons cursor-pointer fill-heart-tiffin' onClick={(e) => {
                                                    onHandleAddFavourite(getSearchCard?.id)
                                                    e.stopPropagation()
                                                }} /> : <FavoriteBorderIcon className='grid-lse-icons cursor-pointer'
                                                    onClick={(e) => {
                                                        onHandleAddFavourite(getSearchCard?.id)
                                                        e.stopPropagation()
                                                    }} />}
                                            </> : <FavoriteBorderIcon className='grid-lse-icons cursor-pointer' onClick={() => toast.error("Login before Adding to Wishlist")} />}
                                        </div>
                                    </div>
                                    <div className="vc-similar-card-description">
                                        <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                            <div className="text-start">
                                                <h3 className='grid-view-title overflow-ellipsis'>{getSearchCard?.catering_service_name || ""}</h3>
                                                <p className='vc-similar-card-small text-left overflow-ellipsis'>
                                                    {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                                    {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                                    {getSearchCard?.city ? getSearchCard.city : ''}
                                                </p>
                                            </div>
                                        </Stack>

                                        <div>
                                            {getSearchCard?.food_types.length > 0 && <Stack direction="row" spacing={1} style={{marginBottom: '8px'}}>
                                                {
                                                    getSearchCard?.food_types?.map((food_type, index) => {
                                                        let iconSrc = '';
                                                        if (food_type === 'Veg') {
                                                            iconSrc = '/img/icons/list-card-veg.png';
                                                        } else if (food_type === 'Non Veg') {
                                                            iconSrc = '/img/icons/list-card-non-veg.png';
                                                        } else {
                                                            iconSrc = '/img/icons/list-card-veg.png';
                                                        }
                                                        return (
                                                            <Stack direction="row" alignItems="center" spacing={0} key={index}>
                                                                <img src={iconSrc} className='list-card-veg' alt="" />
                                                                <p className='list-card-veg-font'> {food_type} </p>
                                                            </Stack>
                                                        )
                                                    })
                                                }
                                            </Stack>}

                                            {getSearchCard?.cuisines.length > 0 && <h2 className="vc-similar-blue overflow-ellipsis">
                                                <span className='me-2 overflow-ellipsis'>
                                                    {getSearchCard?.cuisines?.slice(0, 8)?.map((cuisine) => cuisine).join(" | ")}
                                                </span>
                                            </h2>}
                                        </div>

                                        <div className='w-100'>
                                            {
                                                getSearchCard?.start_price !== null && <Stack direction="row" alignItems="center" justifyContent="end" className="mb-1 mt-1 w-100">
                                                    <Stack direction="row" alignSelf="end" justifyContent="end" spacing={0} className='w-100'>
                                                        <CurrencyRupeeIcon style={{ fontSize: '18px' }} className="vc-price-one-similar-catering" />
                                                        <span className="vc-price-one-similar-catering"> {getSearchCard?.start_price} / Plate </span>
                                                    </Stack>
                                                </Stack>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

            </Swiper>




        </Container>
    )
}

export default SimilarCaterersTiffin