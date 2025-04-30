"use client"
import { useCallback, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Link from 'next/link'
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import ListViewSkeleton from '../ListViewSkeleton ';
import { addchWishlist } from '@/app/features/user/settingSlice';
import { fetchtiffinSearchCards, incrementTiffinPage, setTiffinCurrentPage } from '@/app/features/tiffin/tiffinFilterSlice';
import ShowOnMap from '../ShowOnMap';
import StarIcon from '@mui/icons-material/Star';
import toast from 'react-hot-toast';
import useRegistration from '@/hooks/useRegistration';
import useGetLocationResults from '@/hooks/catering/useGetLocationResults';



const ListViewTiffin = () => {
    const accessToken = useSelector((state) => state.user.accessToken);

    const { getTiffinSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleClickOpen } = useRegistration();
    const { selectedLocation } = useGetLocationResults()

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };


    // const [whishlistStatus, setWhishlistStatus] = useState(0)

    const [wishlist, setWishlist] = useState({});
    // console.log(wishlist, "wishlist wishlist wishlist 333");

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
        getTiffinSearchCards.forEach((item) => {
            initialWishlist[item.id] = item?.is_wishlisted
        })
        setWishlist(initialWishlist)
    }, [getTiffinSearchCards])


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
        if (getTiffinSearchCards.length === 0 && current_page > 1) {
            dispatch(setTiffinCurrentPage(1));
            dispatch(fetchtiffinSearchCards());
        }
    }, [getTiffinSearchCards, current_page, dispatch]);

    const handleScroll = useCallback(myThrottle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1000 > document.documentElement.offsetHeight &&
            !isLoading &&
            getTiffinSearchCards.length > 0 // Ensure there's data before fetching more
        ) {
            if ((current_page * limit) < total_count) {
                dispatch(incrementTiffinPage());
                dispatch(fetchtiffinSearchCards());
            }
        }
    }, 500), [dispatch, isLoading, current_page, limit, total_count, getTiffinSearchCards]);




    // const handleScroll = useCallback(myThrottle(() => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop + 1000 > document.documentElement.offsetHeight &&
    //         !isLoading &&
    //         (current_page * limit) < total_count
    //     ) {
    //         dispatch(incrementTiffinPage());
    //         dispatch(fetchtiffinSearchCards());
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
        const linkToCopy = `https://cateringsandtiffins.com/tiffin-search/${vendorId}/${Id}`;
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
            {getTiffinSearchCards.length > 0 && getTiffinSearchCards?.map((getSearchCard) => (
                <ListViewSkeleton center />
            ))}
        </>
    }

    // console.log(getTiffinSearchCards, "getTiffinSearchCards getTiffinSearchCards");

    return (
        <>
            {
                getTiffinSearchCards?.length > 0 ? (
                    <>
                        {getTiffinSearchCards?.map((getSearchCard) => {
                            const brandLogo = getSearchCard?.brand_logo?.[0]?.medium;
                            const bannerImage = getSearchCard?.banner_images?.[0]?.medium;
                            const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || getSearchCard?.brand_logo?.medium || bannerImage || 'img/no-image.jpg';
                            const filterFoodTypes = getSearchCard?.food_types.filter((getSearchCard) => getSearchCard !== 'All')

                            let tagColor = "";
                            if (getSearchCard?.subscription_type_name === "popular") {
                                tagColor = "#459412"
                            } else if (getSearchCard?.subscription_type_name === "branded") {
                                tagColor = "#8E11A5"
                            } else {
                                tagColor = "#8E11A5"
                            }

                            return (
                                <>
                                    <div className="desktop-list-view">
                                        <div className="list-view-card" key={getSearchCard?.id}>
                                            <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">
                                                <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} alignItems="start" spacing={2}>
                                                    <div className="list-card-img position-relative">
                                                        <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}>
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
                                                        <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} className='list-card-title'>{getSearchCard?.catering_service_name}</Link>
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

                                                        {/* {getSearchCard?.cuisines.length > 0 && <Stack
                                                            direction="flex"
                                                            flexWrap="wrap"
                                                            spacing={1} className='list-card-dish-loc'
                                                            style={{ width: '375px', marginBottom: '15px' }}
                                                        >
                                                            <span className='me-2 text-ellipse-one-listcard'>
                                                                {getSearchCard?.cuisines.join(" | ")}
                                                            </span>
                                                        </Stack>} */}

                                                        <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={0} style={{ marginBottom: '10px' }} className='mealtype-chip-tiffin'>
                                                            {
                                                                getSearchCard?.meal_times?.map((mealtime, index) => {
                                                                    const isLast = index === getSearchCard.meal_times.length - 1;
                                                                    return (
                                                                        <span className='list-card-chip-tiffin'> {mealtime}{!isLast && ' |'} </span>
                                                                    )
                                                                })
                                                            }
                                                        </Stack>


                                                        <Stack direction="row" spacing={1}>
                                                            {getSearchCard?.kitchen_types.length > 0 && getSearchCard?.kitchen_types?.slice(0, 4).map((getSearchCard) => (
                                                                <span className='list-card-chip-kitchentypes' style={{ marginBottom: '12px' }}>
                                                                    {getSearchCard}
                                                                </span>
                                                            ))
                                                            }
                                                        </Stack>


                                                        <div className='tiffin-del'>
                                                            <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} className='cat-types' spacing={2}>
                                                                {getSearchCard?.service_types?.map((serviceType) => {
                                                                    let iconSrc = '';
                                                                    if (serviceType.toLowerCase() === 'delivery') {
                                                                        iconSrc = '/img/icons/delivery-icons.svg';
                                                                    } else if (serviceType.toLowerCase() === 'dine in') {
                                                                        iconSrc = '/img/icons/dine-in-icons.svg';
                                                                    } else if (serviceType.toLowerCase() === 'takeaway') {
                                                                        iconSrc = '/img/icons/takeaway-icons.svg';
                                                                    } else {
                                                                        iconSrc = '/img/icons/delivery-icons.svg';
                                                                    }
                                                                    return (
                                                                        <Stack direction="row" alignItems="center">

                                                                            <img src={iconSrc} alt={serviceType} className="img-fluid list-view-icons" />
                                                                            <span className='list-view-icon-text'> {serviceType} </span>
                                                                        </Stack>
                                                                    )
                                                                })}
                                                            </Stack>
                                                        </div>
                                                    </div>
                                                </Stack>





                                                <Stack className="list-card-end m-0 p-0" direction="column" justifyContent="space-between">
                                                    <div>
                                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2 share-love'>
                                                            <ShareIcon className={`lse-icons ${isAnimating === getSearchCard.id ? 'spin-animation text-red' : ''}`} style={{ marginRight: '10px', cursor: 'pointer' }}
                                                                onClick={() => onHandleShare(getSearchCard.id, { vendorId: getSearchCard.vendor_id, Id: getSearchCard.id })}
                                                            />
                                                            {accessToken ? <>
                                                                {wishlist[getSearchCard?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-tiffin' onClick={() => onHandleAddFavourite(getSearchCard?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(getSearchCard?.id)} />}
                                                            </> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={handleClickOpen} />}
                                                        </Stack>
                                                        <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                            <span className='cat-red' style={{ fontSize: '14px' }}>
                                                                <Stack direction="row" alignItems="center">
                                                                    <ShowOnMap tiffinColor locLatitude={getSearchCard?.latitude} locLongtitude={getSearchCard?.longitude} />
                                                                </Stack>
                                                            </span>
                                                        </Stack>
                                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                            <span className='lse-reviews'>  {getSearchCard?.review_count > 0 ? (
                                                                <span className="lse-reviews">{getSearchCard.review_count} Reviews</span>
                                                            ) : <span className="lse-reviews"> No Reviews</span>}</span>
                                                        </Stack>
                                                        {getSearchCard?.rating_count > 1 && (
                                                            <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: 'end' }} style={{ marginBottom: '8px' }}>
                                                                <div className="mt-2">
                                                                    {[...Array(parseInt(getSearchCard?.rating || 0))].map((_, index) => (
                                                                        <StarIcon key={index} style={{ color: '#d9822b', fontSize: 20 }} />
                                                                    ))}
                                                                </div>
                                                            </Stack>
                                                        )}

                                                    </div>


                                                    <div>
                                                        <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                                            <span className='lse-starting-price'>Monthly plan Cost - <span className='lse-rupees-orange'>₹ {getSearchCard?.start_price}/- </span> </span>
                                                        </Stack>

                                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                                            {/* <span className='lse-starting-price'>Inclusive All Taxes</span> */}
                                                        </Stack>


                                                        <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                            <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} className='text-decoration-none' variant="contained" style={{
                                                                color: '#ffffff', padding: '8px 14px', marginTop: '8px', fontWeight: '500',
                                                                backgroundColor: '#d9822b', borderRadius: '8px', fontSize: '14px',
                                                                fontFamily: "Readex Pro, sans-serif",
                                                                textTransform: 'capitalize', '&:hover': {
                                                                    backgroundColor: '#d9822b',
                                                                }
                                                            }}>Enquire Now</Link>
                                                        </Stack>

                                                    </div>

                                                </Stack>
                                            </Stack>
                                        </div>
                                    </div>


                                    <div className="mobile-list-view">
                                        <div className="list-view-card" key={getSearchCard?.id}>
                                            <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">
                                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} alignItems="start" spacing={2}>
                                                    <div className="list-card-img position-relative">
                                                        <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`}>
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
                                                            <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} className='list-card-title'>{getSearchCard?.catering_service_name}</Link>
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

                                                            <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={0} style={{ marginBottom: '10px' }} className='mealtype-chip-tiffin'>
                                                                {
                                                                    getSearchCard?.meal_times?.map((mealtime, index) => {
                                                                        const isLast = index === getSearchCard.meal_times.length - 1;
                                                                        return (
                                                                            <span className='list-card-chip-tiffin'> {mealtime}{!isLast && ' |'} </span>
                                                                        )
                                                                    })
                                                                }
                                                            </Stack>

                                                            {/* <Stack direction="row" spacing={1}>
                                                                {getSearchCard?.kitchen_types.length > 0 && getSearchCard?.kitchen_types?.slice(0, 4).map((getSearchCard) => (
                                                                    <span className='list-card-chip-kitchentypes' style={{ marginBottom: '12px' }}>
                                                                        {getSearchCard}
                                                                    </span>
                                                                ))
                                                                }
                                                            </Stack> */}

                                                        </div>


                                                        <Stack direction="row" justifyContent={{ xs: 'end', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                            <Link target='_blank' href={`/tiffin-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} className='text-decoration-none enq-btn-mob' variant="contained" style={{
                                                                color: '#ffffff', padding: '8px 14px', marginTop: '8px', fontWeight: '500',
                                                                backgroundColor: '#d9822b', borderRadius: '8px', fontSize: '14px',
                                                                fontFamily: "Readex Pro, sans-serif",
                                                                textTransform: 'capitalize', '&:hover': {
                                                                    backgroundColor: '#d9822b',
                                                                }
                                                            }}>Enquire Now</Link>
                                                        </Stack>

                                                    </Stack>

                                                </Stack>









                                            </Stack>
                                        </div>
                                    </div>


                                </>

                            )
                        })}
                    </>
                ) : (
                    <div className="not-fount-vendors">
                        <h2>No Vendors Found</h2>
                    </div>
                )
            }

            {getTiffinSearchCards?.length > 0 && <>
                <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }} className='mb-5 mt-5'>
                    <h2 className='pagination-heading'>{selectedLocation?.terms?.length > 0 && selectedLocation?.terms[0]?.value
                        ? `${selectedLocation?.terms[0]?.value} : ${total_count} Tiffin service providers found`
                        : 'India : ' + total_count + ' Tiffin service providers found'}</h2>
                    <Link href="#" className='pagination-showing'>Go to Top</Link>
                </Stack>
            </>}


            {/* <div className="pagination-box">
                <Pagination count={10} page={page} onChange={handleChange} />
            </div> */}
        </>
    )
}

export default ListViewTiffin