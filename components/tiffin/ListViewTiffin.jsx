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
import { fetchtiffinSearchCards, incrementTiffinPage } from '@/app/features/tiffin/tiffinFilterSlice';
import ShowOnMap from '../ShowOnMap';
import StarIcon from '@mui/icons-material/Star';
import toast from 'react-hot-toast';



const ListViewTiffin = () => {
    const accessToken = useSelector((state) => state.user.accessToken);

    const { getTiffinSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()
    const [isAnimating, setIsAnimating] = useState(false);

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

    const handleScroll = useCallback(myThrottle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1000 > document.documentElement.offsetHeight &&
            !isLoading &&
            (current_page * limit) < total_count
        ) {
            dispatch(incrementTiffinPage());
            dispatch(fetchtiffinSearchCards());
        }
    }, 500), [dispatch, isLoading, current_page, limit, total_count]);


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

    console.log(getTiffinSearchCards, "getTiffinSearchCards getTiffinSearchCards");

    return (
        <>
            {
                getTiffinSearchCards?.length > 0 ? (
                    <>
                        {getTiffinSearchCards?.map((item) => {
                            const brandLogo = item?.brand_logo?.[0]?.original;
                            const bannerImage = item?.banner_images?.[0]?.original;
                            const imageSrc = item?.subscription_type_name === "branded" && brandLogo || item?.brand_logo?.original || bannerImage || 'img/no-image.jpg';

                            let tagColor = "";
                            if (item?.subscription_type_name === "popular") {
                                tagColor = "#459412"
                            } else if (item?.subscription_type_name === "branded") {
                                tagColor = "#8E11A5"
                            } else {
                                tagColor = "#8E11A5"
                            }

                            return (
                                <div className="list-view-card-tiffin" key={item?.id}>
                                    <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap" style={{ height: '100%' }}>

                                        <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                                            <div className="list-card-img-tiffin position-relative">
                                                <Link href={`/tiffin-search/${item?.vendor_id}/${item?.id}`}>
                                                    <img src={imageSrc} alt="" className="img-fluid listview-img-tiffin" style={{ borderRadius: '8px', height: '100%' }} />
                                                </Link>
                                                <div className="position-absolute list-card-tag-tiffin" style={{ backgroundColor: tagColor }}>
                                                    {item?.subscription_type_name}
                                                </div>
                                            </div>
                                            <div className="list-card-center h-100">

                                                <Stack className='h-100' justifyContent="space-between">
                                                    <div>
                                                        <Link href={`/tiffin-search/${item?.vendor_id}/${item?.id}`} className='list-card-title'>{item?.catering_service_name}</Link>
                                                        <p className='list-card-desc' style={{ marginBottom: '14px' }}>
                                                            {item?.street_name ? `${item.street_name}, ` : ''}
                                                            {item?.city ? item.city : ''}
                                                        </p>
                                                        <div>
                                                            {
                                                                item?.food_types?.length > 0 && <Stack direction="row" spacing={1} style={{ marginBottom: '10px' }}>
                                                                    {
                                                                        item?.food_types?.slice(1, 3).map((food_type, index) => {
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
                                                                </Stack>
                                                            }


                                                            <Stack  direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={0} style={{ marginBottom: '10px' }}>
                                                                {
                                                                    item?.meal_times?.map((mealtime, index) => {
                                                                        const isLast = index === item.meal_times.length - 1;
                                                                        return (
                                                                            <span className='list-card-chip-tiffin'> {mealtime}{!isLast && ' |'} </span>
                                                                        )
                                                                    })
                                                                }
                                                            </Stack>

                                                            <Stack direction="row" spacing={1}>
                                                                {item?.kitchen_types.length > 0 && item?.kitchen_types?.slice(0, 4).map((item) => (
                                                                    <span className='list-card-chip-kitchentypes' style={{ marginBottom: '10px' }}>
                                                                        {item}
                                                                    </span>
                                                                ))
                                                                }
                                                            </Stack>

                                                            
                                                            <div>
                                                                <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} className='cat-types' spacing={2}>
                                                                    {item?.service_types?.map((serviceType) => {
                                                                        let iconSrc = '';
                                                                        if (serviceType.toLowerCase() === 'delivery') {
                                                                            iconSrc = '/img/icons/delivery.png';
                                                                        } else if (serviceType.toLowerCase() === 'dine in') {
                                                                            iconSrc = '/img/icons/Dine-In.png';
                                                                        } else if (serviceType.toLowerCase() === 'takeaway') {
                                                                            iconSrc = '/img/icons/Takeaway.png';
                                                                        } else {
                                                                            iconSrc = '/img/icons/delivery.png';
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
                                                    </div>
                                                </Stack>





                                            </div>
                                        </Stack>


                                        <Stack className="list-card-end" direction="column" justifyContent="space-between">
                                            <div>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginBottom: '8px'}}>
                                                    <ShareIcon className={`lse-icons ${isAnimating === item?.id ? 'spin-animation text-orange' : ''}`} style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        onClick={() => onHandleShare(item?.id, { vendorId: item?.vendor_id, Id: item?.id })}
                                                    />

                                                    {accessToken ? <>
                                                        {wishlist[item?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-tiffin' onClick={() => onHandleAddFavourite(item?.id)} /> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(item?.id)} />}
                                                    </> : <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => toast.error("Login before Adding to Wishlist")} />}
                                                </Stack>
                                                <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginBottom: '8px'}}>
                                                    <span className='cat-yellow' style={{ fontSize: '14px' }}>
                                                        <Stack direction="row" alignItems="center">
                                                            <ShowOnMap tiffinColor locLatitude={item?.latitude} locLongtitude={item?.longitude} />
                                                        </Stack>
                                                    </span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginBottom: '8px'}}>
                                                    <span className='lse-reviews'> {item?.review_count} Reviews</span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }}style={{ marginBottom: '8px'}}>
                                                    <div className="mt-2">
                                                        {[...Array(parseInt(item.rating.slice(0, 1)))].map((star, index) => (
                                                            <StarIcon key={index} style={{ color: '#d9822b', fontSize: 20 }} />
                                                        ))}

                                                    </div>
                                                </Stack>
                                                <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                                    <span className='lse-starting-price'>Monyhly plan Cost - <span className='lse-rupees-orange'>₹ {item?.start_price}/- </span> </span>
                                                </Stack>
                                            </div>


                                            <div>

                                                {/* <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                                    <span className='lse-starting-price'>Inclusive All Taxes</span>
                                                </Stack> */}

                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} sx={{ marginBottom: '5px' }}>
                                                    <Link href={`/tiffin-search/${item?.vendor_id}/${item?.id}`} className='text-decoration-none' variant="contained" style={{
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
                    <h2 className='pagination-heading'>Chennai: {total_count} Tiffin service providers found</h2>
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