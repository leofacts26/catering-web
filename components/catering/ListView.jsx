"use client"
import React, { memo, useCallback, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link'
import ShareIcon from '@mui/icons-material/Share';
import ListViewSkeleton from '../ListViewSkeleton ';
import { useDispatch, useSelector } from 'react-redux';
import { addchWishlist, fetchWishlist } from '@/app/features/user/settingSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchCateringSearchCards, incrementPage, setCurrentPage } from '@/app/features/user/cateringFilterSlice';
import toast from 'react-hot-toast';
import ShowOnMap from '../ShowOnMap';
import StarIcon from '@mui/icons-material/Star';
import ShowOnMapCatering from '../ShowOnMapCatering';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';
import { getRandomCuisines } from '@/helper';
import useRegistration from '@/hooks/useRegistration';


const ListView = () => {
    const dispatch = useDispatch()
    const { getCateringSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.cateringFilter)
    const accessToken = useSelector((state) => state.user.accessToken);
    const { selectedLocation } = useGetLocationResults()
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleClickOpen } = useRegistration();

    // console.log(selectedLocation, "selectedLocation selectedLocation");

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

    useEffect(() => {
        if (getCateringSearchCards.length === 0 && current_page > 1) {
            dispatch(setCurrentPage(1));
            dispatch(fetchCateringSearchCards());
        }
    }, [getCateringSearchCards, current_page, dispatch]);

    const handleScroll = useCallback(myThrottle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1000 > document.documentElement.offsetHeight &&
            !isLoading &&
            getCateringSearchCards.length > 0 // Ensure there's data before fetching more
        ) {
            if ((current_page * limit) < total_count) {
                dispatch(incrementPage());
                dispatch(fetchCateringSearchCards());
            }
        }
    }, 500), [dispatch, isLoading, current_page, limit, total_count, getCateringSearchCards]);


    // const handleScroll = useCallback(myThrottle(() => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop + 1000 > document.documentElement.offsetHeight &&
    //         !isLoading &&
    //         (current_page * limit) < total_count
    //     ) {
    //         dispatch(incrementPage());
    //         dispatch(fetchCateringSearchCards());
    //     }
    // }, 500), [dispatch, isLoading, current_page, limit, total_count]);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])


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
                getCateringSearchCards?.map((getSearchCard) => {
                    const brandLogo = getSearchCard?.brand_logo?.[0]?.medium;
                    const bannerImage = getSearchCard?.banner_images?.[0]?.medium;
                    const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || 'img/no-image.jpg';
                    // const randomCuisines = getRandomCuisines(getSearchCard?.cuisines || [], 8);
                    const filterFoodTypes = getSearchCard?.food_types.filter((item) => item !== 'All')
                    // console.log(getSearchCard, "getSearchCard");

                    let tagColor = "";
                    if (getSearchCard?.subscription_type_name === "popular") {
                        tagColor = "#459412"
                    } else if (getSearchCard?.subscription_type_name === "branded") {
                        tagColor = "#8e11a5"
                    } else {
                        tagColor = "#459412"
                    }

                    return (
                        <>
                            <div className="desktop-list-view">
                                <div className="list-view-card" key={getSearchCard?.id}>
                                    <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">
                                        <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} alignItems="start" spacing={2}>
                                            <div className="list-card-img position-relative">
                                                <Link target='_blank'
                                                    href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
                                                >
                                                    {getSearchCard ? (
                                                        <img
                                                            src={
                                                                getSearchCard?.brand_logo?.medium
                                                                    ? getSearchCard.brand_logo.medium
                                                                    : getSearchCard?.banner_images?.[0]?.medium
                                                                        ? getSearchCard.banner_images[0].medium
                                                                        : 'img/no-image.jpg'
                                                            }
                                                            alt="Image"
                                                            className="img-fluid listview-img"
                                                            style={{ borderRadius: '8px', height: '100%' }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/img/no-image.jpg"
                                                            alt="Image"
                                                            className="img-fluid listview-img"
                                                            style={{ borderRadius: '8px', height: '100%' }}
                                                        />
                                                    )}
                                                </Link>
                                                <div className="position-absolute list-card-tag" style={{ backgroundColor: getSearchCard?.label_display_color }}>
                                                    {getSearchCard?.subscription_type_display}
                                                </div>
                                            </div>


                                            <div className="list-card-center h-100">
                                                <Link target='_blank'
                                                    href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                    // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} 
                                                    className='list-card-title'
                                                >{getSearchCard?.catering_service_name}</Link>
                                                <p className='list-card-desc' style={{ marginBottom: '15px' }}>
                                                    {getSearchCard?.area ? `${getSearchCard?.area}, ` : ''}
                                                    {getSearchCard?.city ? getSearchCard.city : ''}
                                                </p>

                                                {filterFoodTypes?.length > 0 && <Stack direction="row" spacing={1} style={{ marginBottom: '15px' }}>
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

                                                {getSearchCard?.cuisines.length > 0 && <Stack
                                                    direction="flex"
                                                    flexWrap="wrap"
                                                    spacing={1} className='list-card-dish-loc'
                                                    style={{ width: '375px', marginBottom: '15px' }}
                                                >
                                                    <span className='me-2 text-ellipse-one-listcard'>
                                                        {getSearchCard?.cuisines.join(" | ")}
                                                    </span>
                                                </Stack>}


                                                <Stack direction="flex" flexWrap="wrap" spacing={1} className='listview-three'>
                                                    {getSearchCard?.service_types?.length > 0 && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                        {getSearchCard?.service_types?.map((service_type) => service_type).join(" & ")}
                                                    </span>}

                                                    {getSearchCard?.minimum_quantity && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                        Min. Order - {getSearchCard?.minimum_quantity}
                                                    </span>}

                                                    {getSearchCard?.total_staffs_approx && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                        No. of Staffs: {getSearchCard?.total_staffs_approx}
                                                    </span>}
                                                </Stack>


                                                {/* <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                                            <Stack direction="row" alignItems="center">
                                                <img src="/img/icons/Table-srvice.png" alt="" className="img-fluid list-view-icons" />
                                                <span className='list-view-icon-text'>Table Service</span>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1} className='tablet-second'>
                                                <img src="/img/icons/Buffet-Service.png" alt="" className="img-fluid list-view-icons" />
                                                <span className='list-view-icon-text'>Buffet Service</span>
                                            </Stack>
                                        </Stack> */}

                                                {getSearchCard?.serving_types?.length > 0 && <Stack direction="row" spacing={1} style={{ marginBottom: '15px' }}>
                                                    {
                                                        getSearchCard?.serving_types?.map((serving_type, index) => {
                                                            let iconSrc = '';
                                                            if (serving_type === 'Buffet Service') {
                                                                iconSrc = '/img/icons/Table-srvice.png';
                                                            } else if (serving_type === 'Table Service') {
                                                                iconSrc = '/img/icons/Buffet-Service.png';
                                                            }
                                                            return (
                                                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                                                                    <Stack direction="row" alignItems="center">
                                                                        <img src={iconSrc} alt="cater" className="img-fluid list-view-icons" />
                                                                        <span className='list-view-icon-text'>{serving_type}</span>
                                                                    </Stack>
                                                                </Stack>
                                                            )
                                                        })
                                                    }
                                                </Stack>}


                                            </div>
                                        </Stack>





                                        <Stack className="list-card-end m-0 p-0" direction="column" justifyContent="space-between">
                                            <div>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2 share-love'>
                                                    <ShareIcon className={`lse-icons ${isAnimating === getSearchCard.id ? 'spin-animation text-red' : ''}`} style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        onClick={() => onHandleShare(getSearchCard.id, { vendorId: getSearchCard.vendor_id, Id: getSearchCard.id })}
                                                    />
                                                    {accessToken ? <>
                                                        {wishlist[getSearchCard?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-catering' onClick={() => onHandleAddFavourite(getSearchCard?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(getSearchCard?.id)} />}
                                                    </> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={handleClickOpen} />}
                                                </Stack>
                                                <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='cat-red' style={{ fontSize: '14px' }}>
                                                        <Stack direction="row" alignItems="center">
                                                            <ShowOnMapCatering locLatitude={getSearchCard?.latitude} locLongtitude={getSearchCard?.longitude} />
                                                        </Stack>
                                                    </span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='lse-reviews'>  {getSearchCard?.review_count > 0 ? (
                                                        <span className="lse-reviews">{getSearchCard.review_count} Reviews</span>
                                                    ) : <span className="lse-reviews">No Reviews</span>}</span>
                                                </Stack>
                                                {getSearchCard?.rating_count > 1 && (
                                                    <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: 'end' }} style={{ marginTop: '4px' }}>
                                                        <div className="mt-2">
                                                            {[...Array(parseInt(getSearchCard?.rating || 0))].map((_, index) => (
                                                                <StarIcon key={index} style={{ color: '#C33332', fontSize: 20 }} />
                                                            ))}
                                                        </div>
                                                    </Stack>
                                                )}

                                            </div>


                                            <div>
                                                <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                                    <span className='lse-starting-price'>Starting Price - <span className='lse-rupees'>₹ {getSearchCard?.start_price}/- </span> </span>
                                                </Stack>

                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                                    {/* <span className='lse-starting-price'>Inclusive All Taxes</span> */}
                                                </Stack>


                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                    <Link target='_blank'
                                                        href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                        // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
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
                            </div>


                            <div className="mobile-list-view">
                                <div className="list-view-card w-100" key={getSearchCard?.id} >
                                    <Stack className="w-100" spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">
                                        <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} alignItems="start" spacing={2} className="w-100">
                                            <div className="list-card-img position-relative">
                                                <Link target='_blank'
                                                    href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
                                                >
                                                    {getSearchCard ? (
                                                        <img
                                                            src={
                                                                getSearchCard?.brand_logo?.medium
                                                                    ? getSearchCard.brand_logo.medium
                                                                    : getSearchCard?.banner_images?.[0]?.medium
                                                                        ? getSearchCard.banner_images[0].medium
                                                                        : 'img/no-image.jpg'
                                                            }
                                                            alt="Image"
                                                            className="img-fluid listview-img"
                                                            style={{ borderRadius: '8px', height: '100%' }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/img/no-image.jpg"
                                                            alt="Image"
                                                            className="img-fluid listview-img"
                                                            style={{ borderRadius: '8px', height: '100%' }}
                                                        />
                                                    )}
                                                </Link>
                                                <div className="position-absolute list-card-tag" style={{ backgroundColor: tagColor }}>
                                                    {getSearchCard?.subscription_type_display}
                                                </div>
                                            </div>


                                            <Stack direction="column" justifyContent="space-between" className='h-100 w-100'>

                                                <div className="list-card-center h-100">
                                                    <Link target='_blank'
                                                        href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                        // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} 
                                                        className='list-card-title'>{getSearchCard?.catering_service_name}</Link>
                                                    <p className='list-card-desc' style={{ marginBottom: '15px' }}>
                                                        {getSearchCard?.area ? `${getSearchCard?.area}, ` : ''}
                                                        {getSearchCard?.city ? getSearchCard.city : ''}
                                                    </p>

                                                    {filterFoodTypes?.length > 0 && <Stack direction="row" spacing={1} style={{ marginBottom: '15px' }}>
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

                                                    {getSearchCard?.cuisines.length > 0 && <Stack
                                                        direction="flex"
                                                        flexWrap="wrap"
                                                        spacing={1} className='list-card-dish-loc'
                                                        style={{ marginBottom: '15px' }}
                                                    >
                                                        <span className='me-2 text-ellipse-one-listcard'>
                                                            {getSearchCard?.cuisines.join(" | ")}
                                                        </span>
                                                    </Stack>}


                                                    <Stack direction="flex" flexWrap="wrap" spacing={1} className='listview-three'>
                                                        {getSearchCard?.service_types?.length > 0 && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                            {getSearchCard?.service_types?.map((service_type) => service_type).join(" & ")}
                                                        </span>}

                                                        {getSearchCard?.minimum_quantity && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                            Min. Order - {getSearchCard?.minimum_quantity}
                                                        </span>}

                                                        {/* {getSearchCard?.total_staffs_approx && <span style={{ marginBottom: '15px' }} className='list-card-chip me-2'>
                                                        No. of Staffs: {getSearchCard?.total_staffs_approx}
                                                    </span>} */}
                                                    </Stack>

                                                </div>


                                                <Stack direction="row" justifyContent={{ xs: 'end', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                    <Link target='_blank'
                                                        href={`/catering-search/${getSearchCard?.slug}?vendor_id=${getSearchCard?.vendor_id}&id=${getSearchCard?.id}`}
                                                        // href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
                                                        className='text-decoration-none' variant="contained" style={{
                                                            color: '#ffffff', padding: '8px 14px', marginTop: '8px', fontWeight: '500',
                                                            backgroundColor: '#C33332', borderRadius: '8px', fontSize: '14px',
                                                            fontFamily: "Readex Pro, sans-serif",
                                                            textTransform: 'capitalize', '&:hover': {
                                                                backgroundColor: '#C33332',
                                                            }
                                                        }}>Enquire Now</Link>
                                                </Stack>

                                            </Stack>

                                        </Stack>







                                        {/* <Stack className="list-card-end m-0 p-0" direction="column" justifyContent="space-between">
                                            <div>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2 share-love'>
                                                    <ShareIcon className={`lse-icons ${isAnimating === getSearchCard.id ? 'spin-animation text-red' : ''}`} style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        onClick={() => onHandleShare(getSearchCard.id, { vendorId: getSearchCard.vendor_id, Id: getSearchCard.id })}
                                                    />
                                                    {accessToken ? <>
                                                        {wishlist[getSearchCard?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-catering' onClick={() => onHandleAddFavourite(getSearchCard?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(getSearchCard?.id)} />}
                                                    </> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={handleClickOpen} />}
                                                </Stack>
                                                <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='cat-red' style={{ fontSize: '14px' }}>
                                                        <Stack direction="row" alignItems="center">
                                                            <ShowOnMapCatering locLatitude={getSearchCard?.latitude} locLongtitude={getSearchCard?.longitude} />
                                                        </Stack>
                                                    </span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='lse-reviews'> {getSearchCard?.review_count} Reviews</span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '4px' }}>
                                                    <div className="mt-2">
                                                        {[...Array(parseInt(getSearchCard.rating.slice(0, 1)))].map((star, index) => (
                                                            <StarIcon key={index} style={{ color: '#C33332', fontSize: 20 }} />
                                                        ))}

                                                    </div>
                                                </Stack>
                                            </div>


                                            <div>
                                                <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                                    <span className='lse-starting-price'>Starting Price - <span className='lse-rupees'>₹ {getSearchCard?.start_price}/- </span> </span>
                                                </Stack>

                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                                </Stack>


                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                    <Link target='_blank' href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}
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

                                        </Stack> */}


                                    </Stack>
                                </div>
                            </div>


                        </>


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
                    <h2 className='catering-found'>
                        {selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                            ? `${selectedLocation?.terms[0].value} : ${total_count} Catering service providers found`
                            : 'India : ' + total_count + ' Catering service providers found'}
                    </h2>
                    {/* <p className='pagination-showing'>Showing 20 - 30</p> */}
                    <Link href="#" className='pagination-showing'>Go to Top</Link>
                </Stack>
            </>}


        </>
    )
}

export default React.memo(ListView)