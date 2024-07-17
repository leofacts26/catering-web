import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewSkeleton from '../GridViewSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCateringSearchCards, incrementPage } from '@/app/features/user/cateringFilterSlice';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addchWishlist } from '@/app/features/user/settingSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const GridViewList = ({ xs, sm, md, lg }) => {
    const dispatch = useDispatch()
    const { getCateringSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.cateringFilter)
    const accessToken = useSelector((state) => state.user.accessToken);
    const router = useRouter()

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
        getCateringSearchCards.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [getCateringSearchCards])


    // Infinite Scroll 
    const myThrottle = (cb, d) => {
        let last = 0;
        return (...args) => {
            let now = new Date().getTime();
            if (now - last < d) return;
            last = now;
            return cb(...args)
        }
    }

    const handleScroll = myThrottle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 2000 >
            document.documentElement.offsetHeight && !isLoading &&
            ((current_page - 1) * limit) < total_count // Adjust condition here
        ) {
            dispatch(fetchCateringSearchCards()).then(() => {
                dispatch(incrementPage());
            });
        }
    }, 500);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])

    // onNavigateDetailPage 
    const onNavigateDetailPage = (vendor_id, id) => {
        router.push(`/catering-search/${vendor_id}/${id}`)
    }



    if (isLoading) {
        return (
            <Grid container spacing={2}>
                {getCateringSearchCards.length > 0 && getCateringSearchCards.map((getSearchCard, index) => (
                    <GridViewSkeleton xs={xs} sm={sm} md={md} lg={md} key={index} />
                ))}
            </Grid>
        );
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {getCateringSearchCards?.map((getSearchCard) => {
                        const brandLogo = getSearchCard?.brand_logo?.[0]?.original;
                        const bannerImage = getSearchCard?.banner_images?.[0]?.original;
                        const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
                        return (
                            <Grid item xs={xs} sm={sm} md={md} lg={lg}>
                                <div className='text-decoration-none cursor-pointer'
                                    onClick={(e) => {
                                        onNavigateDetailPage(getSearchCard?.vendor_id, getSearchCard?.id)
                                        e.stopPropagation()
                                    }}>
                                    <div className="vc-similar-card">
                                        <div className="grid-img-box">
                                            <div className="view-all-dark-overlay"></div>
                                            <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                            <div className="grid-icons">
                                                <ShareIcon className='grid-lse-icons' style={{ marginRight: '10px', cursor: 'pointer' }} />
                                                {accessToken ? <>
                                                    {wishlist[getSearchCard?.id] ? <FavoriteIcon className='grid-lse-icons cursor-pointer fill-heart-catering' onClick={(e) => {
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

                                            <Stack className='w-100 h-100' direction="row" justifyContent="space-between" alignItems="space-between" flexDirection="column">
                                                <div>
                                                    <Stack className='w-100' direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                        <div className="text-start w-100">
                                                            <h3 className='grid-view-title overflow-ellipsis'>{getSearchCard?.catering_service_name || ""}</h3>
                                                            <p className='vc-similar-card-small text-left overflow-ellipsis'>
                                                                {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                                                {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                                                {getSearchCard?.city ? getSearchCard.city : ''}
                                                            </p>
                                                        </div>
                                                    </Stack>

                                                    <div>
                                                        {getSearchCard?.food_types.length > 0 && <Stack direction="row" spacing={1}>
                                                            {
                                                                getSearchCard?.food_types?.slice(1, 3).map((food_type, index) => {
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

                                                        {getSearchCard?.cuisines.length > 0 && <h2 className="vc-similar-blue text-ellipse-two">
                                                            <span className='me-2 text-ellipse-one-listcard'>
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
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>


            {getCateringSearchCards?.length > 0 && <>
                <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }} className='mb-5 mt-5'>
                    <h2 className='pagination-heading'>Total {total_count} Catering service providers found</h2>
                    {/* <p className='pagination-showing'>Showing 20 - 30</p> */}
                    <Link href="#" className='pagination-showing'>Go to Top</Link>
                </Stack>
            </>}

        </>

    )
}

export default GridViewList