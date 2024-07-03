"use client"
import { useEffect, useState } from 'react';
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

const ListViewTiffin = () => {
    const accessToken = useSelector((state) => state.user.accessToken);

    const { getTiffinSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

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

    const handleScroll = myThrottle(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1000 >
            document.documentElement.offsetHeight && !isLoading &&
            ((current_page - 1) * limit) < total_count
        ) {
            dispatch(fetchtiffinSearchCards()).then(() => {
                dispatch(incrementTiffinPage());
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
                        {getTiffinSearchCards?.map((item) => {
                            const brandLogo = item?.brand_logo?.[0]?.original;
                            const bannerImage = item?.banner_images?.[0]?.original;
                            const imageSrc = item?.subscription_type_name === "branded" && brandLogo || item?.brand_logo?.original || bannerImage || 'img/no-image.jpg';
                            return (
                                <div className="list-view-card" key={item?.vendor_id}>
                                    <Stack spacing={{ xs: 1, sm: 2, md: 0 }} direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} justifyContent="space-between" flexWrap="wrap">

                                        <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: "row" }} spacing={2}>
                                            <div className="list-card-img-tiffin position-relative">
                                                <img src={imageSrc} alt="" className="img-fluid listview-img-tiffin" style={{ borderRadius: '8px', height: '100%' }} />
                                                <div className="position-absolute list-card-tag-tiffin">
                                                    {item?.subscription_type_name}
                                                </div>
                                            </div>
                                            <div className="list-card-center h-100">

                                                <Stack className='h-100' justifyContent="space-between">
                                                    <div>
                                                        <h2 className='list-card-title'>{item?.catering_service_name}</h2>
                                                        <p className='list-card-desc'>
                                                            {item?.street_name ? `${item.street_name}, ` : ''}
                                                            {/* {item?.area ? `${item.area}, ` : ''} */}
                                                            {item?.city ? item.city : ''}
                                                        </p>
                                                        <div className='m-0 p-0'>
                                                            {
                                                                item?.food_types?.length > 0 && <Stack direction="row" spacing={1} sx={{ marginTop: '10px', marginBottom: '4px' }}>
                                                                    {
                                                                        item?.food_types?.slice(1, 3).map((food_type, index) => {
                                                                            let iconSrc = '';
                                                                            if (food_type === 'Veg') {
                                                                                iconSrc = '/img/icons/list-card-veg.png';
                                                                            } else if (food_type === 'Non Veg') {
                                                                                iconSrc = '/img/icons/list-card-non-veg.png';
                                                                            } else {
                                                                                iconSrc = '/img/icons/list-card-veg.png';
                                                                            }
                                                                            return (
                                                                                <Stack direction="row" alignItems="center" spacing={0} key={index} className='m-0 p-0'>
                                                                                    <img src={iconSrc} className='list-card-veg' alt="" />
                                                                                    <p className='list-card-veg-font'> {food_type} </p>
                                                                                </Stack>
                                                                            )
                                                                        })
                                                                    }
                                                                </Stack>
                                                            }
                                                            <Stack className='m-0 p-0' direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={0} sx={{ marginTop: '15px' }}>
                                                                {
                                                                    item?.meal_times?.map((mealtime, index) => {
                                                                        const isLast = index === item.meal_times.length - 1;
                                                                        return (
                                                                            <span className='list-card-chip-tiffin'> {mealtime}{!isLast && ' |'} </span>
                                                                        )
                                                                    })
                                                                }
                                                            </Stack>
                                                        </div>
                                                    </div>

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
                                                </Stack>





                                            </div>
                                        </Stack>


                                        <Stack className="list-card-end" direction="column" justifyContent="space-between">
                                            <div>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} className='mb-2'>
                                                    <ShareIcon className='lse-icons' style={{ marginRight: '10px' }} />
                                                    {
                                                        wishlist[item?.id] ? <FavoriteIcon className='lse-icons cursor-pointer fill-heart-tiffin' onClick={() => onHandleAddFavourite(item?.id)} /> :
                                                            <FavoriteBorderIcon className='lse-icons cursor-pointer' onClick={() => onHandleAddFavourite(item?.id)} />
                                                    }
                                                </Stack>
                                                <Stack direction="row" alignItems="center" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='cat-yellow' style={{ fontSize: '14px' }}>
                                                        <Stack direction="row" alignItems="center">
                                                            <ShowOnMap locLatitude={item?.latitude} locLongtitude={item?.longitude} />
                                                        </Stack>
                                                    </span>
                                                </Stack>
                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '8px' }}>
                                                    <span className='lse-reviews'> {item?.review_count} Reviews</span>
                                                </Stack>
                                            </div>


                                            <div>
                                                {item?.start_price && <Stack className="lv-price mb-2" direction="row" justifyContent={{ xs: 'start', sm: 'start', lg: "end" }}>
                                                    <span className='lse-starting-price'>Monyhly plan Cost - <span className='lse-rupees-orange'>₹ {item?.start_price}/- </span> </span>
                                                </Stack>}

                                                <Stack direction="row" justifyContent={{ xs: 'start', sm: 'end', lg: "end" }} style={{ marginTop: '6px' }}>
                                                    <span className='lse-starting-price'>Inclusive All Taxes</span>
                                                </Stack>
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
                    <p className='pagination-showing'>Showing 20 - 30</p>
                </Stack>
            </>}

            {/* <div className="pagination-box">
                <Pagination count={10} page={page} onChange={handleChange} />
            </div> */}
        </>
    )
}

export default ListViewTiffin