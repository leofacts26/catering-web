"use client"
import React, { memo, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link'
import ShareIcon from '@mui/icons-material/Share';
import ListViewSkeleton from '../ListViewSkeleton ';
import { useDispatch, useSelector } from 'react-redux';
import { addchWishlist } from '@/app/features/user/settingSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchCateringSearchCards, incrementPage } from '@/app/features/user/cateringFilterSlice';


const ListView = () => {

    const dispatch = useDispatch()
    const { getCateringSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.cateringFilter)

    console.log({ current_page, total_count }, "current_page, total_count");

    const [whishlistStatus, setWhishlistStatus] = useState(0)

    const onHandleAddFavourite = (branchId) => {
        let data = {
            branchId,
            whishlistStatus
        }
        dispatch(addchWishlist(data))
        setWhishlistStatus((prevStatus) => (prevStatus === 0 ? 1 : 0));
    }


    // test 
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
            window.innerHeight + document.documentElement.scrollTop + 1500 >
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
    // console.log(getCateringSearchCards, "getCateringSearchCards");



    return (
        <>
            {getCateringSearchCards.length > 0 ? (
                getCateringSearchCards?.map((getSearchCard) => (
                    <div className="list-view-card" key={getSearchCard?.id}>
                        <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">

                            <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                                <div className="list-card-img position-relative">
                                    <img src="/img/occasions/03.jpg" alt="" className="img-fluid listview-img" style={{ borderRadius: '8px', height: '100%' }} />
                                    <div className="position-absolute list-card-tag">
                                        {getSearchCard?.subscription_type_name}
                                    </div>
                                </div>
                                <div className="list-card-center">
                                    <h2 className='list-card-title'>{getSearchCard?.catering_service_name}</h2>
                                    <p className='list-card-desc'>{getSearchCard?.street_name} {getSearchCard?.area} {getSearchCard?.city}</p>

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

                                    <Stack
                                        // direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} 
                                        direction="flex"
                                        flexWrap="wrap"
                                        spacing={1} className='list-card-dish-loc'
                                        style={{ width: '375px' }}
                                    >
                                        {
                                            getSearchCard?.cuisines?.slice(0, 3)?.map((cuisine, index) => {
                                                return (
                                                    <span className='me-2' key={index}> {cuisine} </span>
                                                )
                                            })
                                        }
                                    </Stack>


                                    <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={1} sx={{ marginTop: '15px' }}>
                                        {
                                            getSearchCard?.occasions?.slice(0, 4)?.map((occasion, index) => {
                                                return (
                                                    <span className='list-card-chip' key={index}>{occasion}</span>
                                                )
                                            })
                                        }
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


                            <Stack className="list-card-end" direction="column" justifyContent="space-between">
                                <div>
                                    <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2'>
                                        <ShareIcon className='lse-icons' style={{ marginRight: '10px', cursor: 'pointer' }} />
                                        {
                                            getSearchCard?.is_wishlisted ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-catering' onClick={() => onHandleAddFavourite(getSearchCard?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(getSearchCard?.id)} />
                                        }
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
                                    <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                        <span className='lse-starting-price'>Starting Price - <span className='lse-rupees'>₹ {getSearchCard?.start_price}/- </span> </span>
                                    </Stack>
                                    <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                        <span className='lse-starting-price'>Inclusive All Taxes</span>
                                    </Stack>
                                    <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                        <Link
                                            href={`/catering-search/${getSearchCard?.vendor_id}`}
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
                ))
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