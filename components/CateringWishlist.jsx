"use client"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addchWishlist, fetchWishlist, fetchWishlistTiffin, removeAllWishlist } from '@/app/features/user/settingSlice';
import ExploreCaterersShimmer from '@/components/shimmer/ExploreCaterersShimmer';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewSkeleton from './GridViewSkeleton';
import { unwrapResult } from '@reduxjs/toolkit';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import useRegistration from '@/hooks/useRegistration';

const CateringWishlist = () => {

    const router = useRouter()
    const accessToken = useSelector((state) => state.user.accessToken);
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleClickOpen } = useRegistration();

    const { caterWishlist, isLoading, tiffinWishlist } = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWishlist())
    }, [])

    useEffect(() => {
        dispatch(fetchWishlistTiffin())
    }, [])

    const onNavigateCatering = (vendor_id, id) => {
        router.push(`/catering-search`)
    }


    const [wishlist, setWishlist] = useState({});

    const onHandleAddFavourite = async (branchId) => {
        const currentStatus = wishlist[branchId] || false;
        const vendor_type = "Caterer"
        let data = {
            branchId,
            whishlistStatus: !currentStatus ? 1 : 0,
            vendor_type
        }
        const resultAction = await dispatch(addchWishlist(data));
        unwrapResult(resultAction);
        setWishlist((prevState) => ({ ...prevState, [branchId]: !currentStatus }));
        setTimeout(() => {
            dispatch(fetchWishlist())
        }, 1000)
    }

    useEffect(() => {
        const initialWishlist = {};
        caterWishlist.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [caterWishlist])

    // onNavigateDetailPage 
    const onNavigateDetailPage = (vendor_id, id) => {
        router.push(`/catering-search/${vendor_id}/${id}`)
    }

    // onHandleClearWishlist 
    const onHandleClearWishlist = () => {
        dispatch(removeAllWishlist())
        setTimeout(() => {
            dispatch(fetchWishlist())
            dispatch(fetchWishlistTiffin())
        }, 1000)
    }


    const onHandleShare = (cardId, data) => {
        setIsAnimating(cardId);
        const { vendorId, Id } = data;
        const linkToCopy = `https://cateringsandtiffins.com/catering-search/${vendorId}/${Id}`;
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




    if (isLoading) {
        return (
            <Grid container spacing={2}>
                {caterWishlist.length > 0 && caterWishlist.map((getSearchCard, index) => (
                    <GridViewSkeleton xs={12} sm={6} md={4} lg={4} key={index} />
                ))}
            </Grid>
        );
    }

    // console.log(caterWishlist, "caterWishlist");
    // console.log(tiffinWishlist, "tiffinWishlist");

    return (
        <>
            {
                caterWishlist.length > 0 || tiffinWishlist.length > 0 ? <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} justifyContent="end" alignItems="end">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" style={{width: '100%'}}>
                       <div>
                       <h2 className="user-profile-title" style={{ fontSize: '1.8em', color: '#57636c' }}>Your Favourite Saved Caterers</h2>
                       </div>
                        <Button className="cursor-pointer cater-clear-filter" onClick={() => onHandleClearWishlist()}>
                            <Stack direction="row" alignItems="center">
                                {isLoading ? 'Loading' : <><DeleteForeverIcon className="cater-removefilter-icon" /> Remove All</>}
                            </Stack>
                        </Button>
                    </Stack>
                </Stack> : ''
            }


            {caterWishlist?.length > 0 ? (
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {isLoading ? (
                                <ExploreCaterersShimmer count={caterWishlist?.length} />
                            ) : (
                                <>
                                    {caterWishlist?.map((getSearchCard) => {
                                        const brandLogo = getSearchCard?.brand_logo?.original;
                                        const bannerImage = getSearchCard?.banner_images?.[0]?.original;
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
                                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                                    <span className='round-white'>
                                                                        <ShareIcon className={`grid-lse-icons ${isAnimating === getSearchCard?.id ? 'spin-animation text-red' : 'text-dark'}`} style={{ marginRight: '2px', cursor: 'pointer' }}
                                                                            onClick={(e) => {
                                                                                onHandleShare(getSearchCard?.id, { vendorId: getSearchCard?.vendor_id, Id: getSearchCard?.id })
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
                                                                                }} /> : <FavoriteBorderIcon className='text-dark grid-lse-icons cursor-pointer'
                                                                                    onClick={(e) => {
                                                                                        onHandleAddFavourite(getSearchCard?.id)
                                                                                        e.stopPropagation()
                                                                                    }} />}
                                                                            </> : <FavoriteBorderIcon className='grid-lse-icons cursor-pointer' onClick={handleClickOpen} />}
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
                        <p style={{ fontSize: '2em', color: '#57636c' }}>You're Favourite Catering Wishlist is Empty</p>
                    </div>
                    <div>
                        <Button onClick={() => onNavigateCatering()} variant="contained" className="wishlist-btn-tiffin mt-4 active-up">Add Caterers To Wishlist</Button>
                    </div>
                </Stack>
            )}

        </>
    )
}

export default CateringWishlist