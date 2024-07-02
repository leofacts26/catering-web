"use client"
import React, { memo, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link'
import ShareIcon from '@mui/icons-material/Share';
import ListViewSkeleton from '../ListViewSkeleton ';
import { useDispatch, useSelector } from 'react-redux';
import { addchWishlist, fetchWishlist } from '@/app/features/user/settingSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchCateringSearchCards, incrementPage } from '@/app/features/user/cateringFilterSlice';
import toast from 'react-hot-toast';


const ListView = () => {
    const dispatch = useDispatch()
    const { getCateringSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.cateringFilter)
    const accessToken = useSelector((state) => state.user.accessToken);

    console.log(accessToken, "accessToken accessToken");

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



    if (isLoading) {
        return <>
            {getCateringSearchCards.length > 0 && getCateringSearchCards?.map((getSearchCard) => (
                <ListViewSkeleton center />
            ))}
        </>
    }
    console.log(getCateringSearchCards, "getCateringSearchCards");



    return (
        <>
            {getCateringSearchCards.length > 0 ? (
                getCateringSearchCards?.map((getSearchCard) => {
                    const brandLogo = getSearchCard?.brand_logo?.[0]?.original;
                    const bannerImage = getSearchCard?.banner_images?.[0]?.original;
                    const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || 'img/no-image.jpg';
                    return (
                        <div className="list-view-card" key={getSearchCard?.id}>
                            <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">

                                <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} alignItems="center" spacing={2}>
                                    <div className="list-card-img position-relative">
                                        <img src={imageSrc} alt="" className="img-fluid listview-img" style={{ borderRadius: '8px', height: '100%' }} />
                                        <div className="position-absolute list-card-tag">
                                            {getSearchCard?.subscription_type_name}
                                        </div>
                                    </div>
                                    <div className="list-card-center">
                                        <h2 className='list-card-title'>{getSearchCard?.catering_service_name}</h2>
                                        <p className='list-card-desc'>
                                            {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                            {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                            {getSearchCard?.city ? getSearchCard.city : ''}
                                        </p>

                                        <Stack direction="row" spacing={1} sx={{ marginTop: '15px', marginBottom: '15px' }}>
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
                                        </Stack>

                                        {getSearchCard?.cuisines.length > 0 && <Stack
                                            // direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} 
                                            direction="flex"
                                            flexWrap="wrap"
                                            spacing={1} className='list-card-dish-loc'
                                            style={{ width: '375px' }}
                                        >
                                            <span className='me-2 text-ellipse-one-listcard'>
                                                {getSearchCard?.cuisines?.slice(0, 8)?.map((cuisine) => cuisine).join(" | ")}
                                            </span>
                                        </Stack>}




                                        <Stack direction="flex" flexWrap="wrap" spacing={1} sx={{ marginTop: '15px' }} className='listview-three'>

                                            {getSearchCard?.service_types?.length > 0 && <span className='list-card-chip me-2'>
                                                {getSearchCard?.service_types?.map((service_type) => service_type).join(" & ")}
                                            </span>}

                                            {getSearchCard?.minimum_quantity && <span className='list-card-chip me-2'>
                                                Min. Order - {getSearchCard?.minimum_quantity}
                                            </span>}

                                            {getSearchCard?.total_staffs_approx && <span className='list-card-chip me-2'>
                                                No.Of Staffs: {getSearchCard?.total_staffs_approx}
                                            </span>}

                                        </Stack>
                                        <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} className='cat-types' spacing={2}>
                                            <Stack direction="row" alignItems="center">
                                                <img src="/img/icons/Table-srvice.png" alt="" className="img-fluid list-view-icons" />
                                                <span className='list-view-icon-text'>Table Service</span>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1} className='tablet-second'>
                                                <img src="/img/icons/Buffet-Service.png" alt="" className="img-fluid list-view-icons" />
                                                <span className='list-view-icon-text'>Buffet Service</span>
                                            </Stack>
                                        </Stack>
                                    </div>
                                </Stack>


                                <Stack className="list-card-end m-0 p-0" direction="column" justifyContent="space-between">
                                    <div>
                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2 share-love'>
                                            <ShareIcon className='lse-icons' style={{ marginRight: '10px', cursor: 'pointer' }} />
                                           {accessToken ? <>
                                            {wishlist[getSearchCard?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-catering' onClick={() => onHandleAddFavourite(getSearchCard?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(getSearchCard?.id)} />}
                                           </> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => toast.error("Login before Adding to Wishlist")} />  } 
                                        </Stack>
                                        <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                            <span className='cat-red' style={{ fontSize: '14px' }}>
                                                <Stack direction="row" alignItems="center">
                                                    <LocationOnIcon style={{ fontSize: '15px', marginRight: '5px' }} /> <span className='lse-map-icon'>Show On Map</span>
                                                </Stack>
                                            </span>
                                        </Stack>
                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                            <span className='lse-reviews'> {getSearchCard?.review_count} Reviews</span>
                                        </Stack>
                                    </div>


                                    <div>
                                        {getSearchCard?.start_price && <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                            <span className='lse-starting-price'>Starting Price - <span className='lse-rupees'>₹ {getSearchCard?.start_price}/- </span> </span>
                                        </Stack>}

                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                            <span className='lse-starting-price'>Inclusive All Taxes</span>
                                        </Stack>
                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                            <Link
                                                href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
                                                className='text-decoration-none' variant="contained" style={{
                                                    color: '#ffffff', padding: '8px 14px', marginTop: '8px', fontWeight: '500',
                                                    backgroundColor: '#C33332', borderRadius: '8px', fontSize: '14px',
                                                    fontFamily: "Readex Pro, sans-serif",
                                                    textTransform: 'capitalize', '&:hover': {
                                                        backgroundColor: '#C33332',
                                                    }
                                                }}>Enquire Now</Link>
                                        </Stack>
                                    </div>

                                </Stack>
                            </Stack>
                        </div>
                    )
                })
            ) : (
                <div className="not-fount-vendors">
                    <h2>No Vendors Found</h2>
                </div>
            )
            }

            {getCateringSearchCards?.length > 0 && <>
                <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }} className='mb-5 mt-5'>
                    <h2 className='pagination-heading'>Chennai: {total_count} Catering service providers found</h2>
                    <p className='pagination-showing'>Showing 20 - 30</p>
                </Stack>
            </>}


        </>
    )
}

export default React.memo(ListView)