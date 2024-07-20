"use client"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addchWishlist, fetchWishlist, fetchWishlistTiffin } from '@/app/features/user/settingSlice';
import ExploreCaterersShimmer from '@/components/shimmer/ExploreCaterersShimmer';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CateringWishlist from '@/components/CateringWishlist';
import GridViewSkeleton from './GridViewSkeleton';
import { unwrapResult } from '@reduxjs/toolkit';


const TiffinWishList = () => {

    const router = useRouter()
    const accessToken = useSelector((state) => state.user.accessToken);

    const { tiffinWishlist, isLoading } = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWishlist())
    }, [])

    useEffect(() => {
        dispatch(fetchWishlistTiffin())
    }, [])


    const onNavigateTiffin = (vendor_id, id) => {
        router.push(`/tiffin-search`)
    }

    const [wishlist, setWishlist] = useState({});

    const onHandleAddFavourite = async (branchId) => {
        const currentStatus = wishlist[branchId] || false;
        const vendor_type = "Tiffin"
        let data = {
            branchId,
            whishlistStatus: !currentStatus ? 1 : 0,
            vendor_type
        }
        // dispatch(addchWishlist(data))
        const resultAction = await dispatch(addchWishlist(data));
        unwrapResult(resultAction);
        setWishlist((prevState) => ({ ...prevState, [branchId]: !currentStatus }));
        setTimeout(() => {
            dispatch(fetchWishlistTiffin())
        }, 2000)
    }

    useEffect(() => {
        const initialWishlist = {};
        tiffinWishlist.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [tiffinWishlist])

    // onNavigateDetailPage 
    const onNavigateDetailPage = (vendor_id, id) => {
        router.push(`/tiffin-search/${vendor_id}/${id}`)
    }

    console.log(tiffinWishlist, "tiffinWishlist");

    if (isLoading) {
        return (
            <Grid container spacing={2}>
                {tiffinWishlist.length > 0 && tiffinWishlist.map((getSearchCard, index) => (
                    <GridViewSkeleton xs={12} sm={6} md={4} lg={4} key={index} />
                ))}
            </Grid>
        );
    }



    return (
        <>
            {tiffinWishlist?.length > 0 ? (
                <>
                    <h2 className="user-profile-title" style={{ marginTop: '30px', fontSize: '1.8em', color: '#57636c' }}>Your Favourite Saved Tiffins</h2>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {isLoading ? (
                                <ExploreCaterersShimmer count={tiffinWishlist?.length} />
                            ) : (
                                <>
                                    {tiffinWishlist?.map((getSearchCard) => {
                                        const brandLogo = getSearchCard?.brand_logo?.original;
                                        const bannerImage = getSearchCard?.banner_images?.original;
                                        const imageSrc = brandLogo || bannerImage || '/img/no-image.jpg';
                                        const filterFoodTypes = getSearchCard?.food_types.filter((item) => item !== 'All')
                                        return (
                                            <Grid item xs={12} sm={6} md={4} lg={4}>
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
                                                                <Stack direction="row" alignItems="center">
                                                                    <ShareIcon className='grid-lse-icons-tiffin' style={{ marginRight: '10px', cursor: 'pointer' }} />
                                                                    <div>
                                                                        <span className='round-white'>
                                                                            {accessToken ? <>
                                                                                {wishlist[getSearchCard?.id] ? <FavoriteIcon className='grid-lse-icons-tiffin cursor-pointer fill-heart-tiffin' onClick={(e) => {
                                                                                    onHandleAddFavourite(getSearchCard?.id)
                                                                                    e.stopPropagation()
                                                                                }} /> : <FavoriteBorderIcon className='grid-lse-icons-tiffin cursor-pointer'
                                                                                    onClick={(e) => {
                                                                                        onHandleAddFavourite(getSearchCard?.id)
                                                                                        e.stopPropagation()
                                                                                    }} />}
                                                                            </> : <FavoriteBorderIcon className='grid-lse-icons-tiffin cursor-pointer' onClick={() => toast.error("Login before Adding to Wishlist")} />}
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
                                                                            <p className='vc-similar-card-small text-left overflow-ellipsis'>
                                                                                {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                                                                {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                                                                {getSearchCard?.city ? getSearchCard.city : ''}
                                                                            </p>
                                                                        </div>
                                                                    </Stack>

                                                                    <div>
                                                                        {filterFoodTypes?.length > 0 && <Stack direction="row" spacing={1}>
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
                                            </Grid>
                                        )
                                    })}
                                </>
                            )
                            }
                        </Grid>
                    </Box>
                </>
            ) : (
                <Stack direction="row" justifyContent="center" flexDirection="column" alignItems="center" style={{ height: '400px' }}>
                    <div>
                        <p style={{ fontSize: '2em', color: '#57636c' }}>You're Tiffin Wishlist is Empty</p>
                    </div>
                    <div>
                        <Button onClick={() => onNavigateTiffin()} variant="contained" className="wishlist-btn-tiffin mt-4 active-up">Add Favourite Tiffins to Wishlist</Button>
                    </div>
                </Stack>
            )}
        </>
    )
}

export default TiffinWishList