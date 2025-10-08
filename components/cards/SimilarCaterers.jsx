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
import { fetchCatererSimilarCaterer } from '@/app/features/user/cateringFilterSlice';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { addchWishlist } from '@/app/features/user/settingSlice';
import useRegistration from '@/hooks/useRegistration';

const SimilarCaterers = ({ tiffin, data, branchSlug, slug }) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const { getCateringSimilarTypes } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleClickOpen } = useRegistration();
    // console.log(vendorId, "vendorId han");


    useEffect(() => {
        if (data) {
            dispatch(fetchCatererSimilarCaterer(data))
        }
    }, [data])

    // console.log(getCateringSimilarTypes, "getCateringSimilarTypes 666666");

    const [wishlist, setWishlist] = useState({});

    const onHandleAddFavourite = (branchId) => {
        const currentStatus = wishlist[branchId] || false;
        const vendor_type = "Caterer"
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
        getCateringSimilarTypes.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [getCateringSimilarTypes])


    // onNavigateDetailPage 
    const onNavigateDetailPage = (slug, branchSlug) => {
        router.push(`/catering-search/${slug}?branch_slug=${branchSlug}`)
    }
    // `/catering-search/${item?.slug}?vendor_id=${item?.vendor_id}&id=${item?.id}`

    const onHandleShare = (cardId, data) => {
        setIsAnimating(cardId);
        // const { slug, branch_slug } = data;
        const linkToCopy = `https://cateringsandtiffins.com/catering-search/${slug}?branch_slug=${branchSlug}`;
        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                toast.success('Link copied to clipboard');
                setTimeout(() => setIsAnimating(false), 1000); // Stop the animation after 1 second
            })
            .catch((error) => {
                toast.error('Failed to copy link');
                setTimeout(() => setIsAnimating(false), 1000); // Stop the animation after 1 second
            });
    };


    const filteredCaterers = getCateringSimilarTypes?.filter((item) => item.branch_slug !== branchSlug) || [];
    console.log(filteredCaterers, "filteredCaterers");
    
    return (
        <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <Stack sx={{ marginBottom: '10px' }} alignItems="center" justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <h2 className='font-24 similar-caterers'>Similar Caterers in your area</h2>
                <Link href="/catering-search" className="vc-see-all" style={{ color: tiffin ? '#D9822B' : '#C33332' }}>See all</Link>
            </Stack>

            {filteredCaterers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', fontSize: '18px' }}>
                    There are no similar caterers in your Area
                </div>
            ) : (
                <Swiper
                    navigation={true}
                    slidesPerView={4}
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
                    {filteredCaterers.map((getSearchCard) => {
                        const brandLogo = getSearchCard?.brand_logo?.[0]?.medium;
                        const bannerImage = getSearchCard?.banner_images?.[0]?.medium;
                        const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
                        const filterFoodTypes = getSearchCard?.food_types.filter((item) => item !== 'All')
                        return (
                            <SwiperSlide>
                                <div className='text-decoration-none  cursor-pointer' onClick={(e) => {
                                    onNavigateDetailPage(getSearchCard?.slug, getSearchCard?.branch_slug)
                                    e.stopPropagation()
                                }}>
                                    <div className="vc-similar-card">
                                        <div className="grid-img-box">
                                            <div className="view-all-dark-overlay"></div>
                                            <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                            <div className="grid-icons">
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <span className='round-white '>
                                                        <ShareIcon className={`grid-lse-icons ${isAnimating === getSearchCard.id ? 'spin-animation text-red' : 'text-dark'}`} style={{ marginRight: '2px', cursor: 'pointer' }}
                                                            onClick={(e) => {
                                                                onHandleShare(getSearchCard.id, { slug: data.slug, branch_slug: data.branch_slug })
                                                                e.stopPropagation()
                                                            }}
                                                        />
                                                    </span>
                                                    <div>
                                                        <span className='round-white'>
                                                            {accessToken ? <>
                                                                {wishlist[getSearchCard?.id] ? <FavoriteIcon className='grid-lse-icons cursor-pointer fill-heart-catering' onClick={(e) => {
                                                                    onHandleAddFavourite(getSearchCard?.id)
                                                                    e.stopPropagation()
                                                                }} /> : <FavoriteBorderIcon className='grid-lse-icons cursor-pointer text-dark'
                                                                    onClick={(e) => {
                                                                        onHandleAddFavourite(getSearchCard?.id)
                                                                        e.stopPropagation()
                                                                    }} />}
                                                            </> : <FavoriteBorderIcon className='grid-lse-icons cursor-pointer'
                                                                onClick={handleClickOpen} />}
                                                        </span>
                                                    </div>
                                                </Stack>
                                            </div>
                                        </div>
                                        <div className="vc-similar-card-description">

                                            <Stack className='w-100 h-100' direction="row" justifyContent="space-between" alignItems="space-between" flexDirection="column">
                                                <div>
                                                    <Stack className='w-100' direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                        <div className="text-start w-100">
                                                            <h3 className='grid-view-title overflow-ellipsis'>{getSearchCard?.catering_service_name || ""}</h3>
                                                            <p className='vc-similar-card-small overflow-ellipsis text-left'>
                                                                {getSearchCard?.area ? `${getSearchCard.area}, ` : ''}
                                                                {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                                                {getSearchCard?.city ? getSearchCard.city : ''}
                                                            </p>
                                                        </div>
                                                    </Stack>

                                                    <div>
                                                        {getSearchCard?.food_types.length > 0 && <Stack direction="row" spacing={1} style={{ marginBottom: '8px' }}>
                                                            {
                                                                filterFoodTypes?.map((food_type, index) => {
                                                                    let iconSrc = '';
                                                                    let foodClassName = '';
                                                                    if (food_type === 'Veg') {
                                                                        iconSrc = '/img/icons/list-card-veg.png';
                                                                        foodClassName = 'food-veg-color';
                                                                    } else if (food_type === 'Non Veg') {
                                                                        iconSrc = '/img/icons/list-card-non-veg.png';
                                                                        foodClassName = 'food-nonveg-color';
                                                                    } else {
                                                                        iconSrc = '/img/icons/list-card-veg.png';
                                                                        foodClassName = 'food-veg-color';
                                                                    }
                                                                    return (
                                                                        <Stack direction="row" alignItems="center" spacing={0} key={index}>
                                                                            <img src={iconSrc} className='list-card-veg' alt="" />
                                                                            <p className={`list-card-veg-font ${foodClassName}`}> {food_type} </p>
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

                                            </Stack>


                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            )}
        </Container>
    )
}

export default SimilarCaterers