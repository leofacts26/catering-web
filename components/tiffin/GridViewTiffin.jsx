import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import GridViewSkeleton from '../GridViewSkeleton';
import { fetchtiffinSearchCards, incrementTiffinPage } from '@/app/features/tiffin/tiffinFilterSlice';
import { useEffect, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addchWishlist } from '@/app/features/user/settingSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useRegistration from '@/hooks/useRegistration';


const GridViewTiffin = ({ xs, sm, md, lg }) => {
    const dispatch = useDispatch()
    const { getTiffinSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.tiffinFilter)
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleClickOpen } = useRegistration();

    const accessToken = useSelector((state) => state.user.accessToken);
    const router = useRouter()

    const [wishlist, setWishlist] = useState({});

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
            window.innerHeight + document.documentElement.scrollTop + 2000 >
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


    // onNavigateDetailPage 
    const onNavigateDetailPage = (vendor_id, id) => {
        router.push(`/tiffin-search/${vendor_id}/${id}`)
    }




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
        return (
            <Grid container spacing={2}>
                {getTiffinSearchCards.length > 0 && getTiffinSearchCards.map((getSearchCard, index) => (
                    <GridViewSkeleton xs={xs} sm={sm} md={md} lg={lg} key={index} />
                ))}
            </Grid>
        );
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {getTiffinSearchCards?.map((getSearchCard) => {
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
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <span className='round-white'>
                                                        <ShareIcon className={`grid-lse-icons-tiffin ${isAnimating === getSearchCard.id ? 'spin-animation text-orange' : 'text-dark'}`} style={{ marginRight: '2px', cursor: 'pointer' }}
                                                            onClick={(e) => {
                                                                onHandleShare(getSearchCard.id, { vendorId: getSearchCard.vendor_id, Id: getSearchCard.id })
                                                                e.stopPropagation()
                                                            }}
                                                        />
                                                    </span>

                                                    <div>
                                                        <span className='round-white'>
                                                            {accessToken ? <>
                                                                {wishlist[getSearchCard?.id] ? <FavoriteIcon className='grid-lse-icons-tiffin cursor-pointer fill-heart-tiffin' onClick={(e) => {
                                                                    onHandleAddFavourite(getSearchCard?.id)
                                                                    e.stopPropagation()
                                                                }} /> : <FavoriteBorderIcon className='text-dark grid-lse-icons-tiffin cursor-pointer'
                                                                    onClick={(e) => {
                                                                        onHandleAddFavourite(getSearchCard?.id)
                                                                        e.stopPropagation()
                                                                    }} />}
                                                            </> : <FavoriteBorderIcon className='grid-lse-icons-tiffin cursor-pointer' onClick={handleClickOpen} />}
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
                                                            <p className='vc-similar-card-small text-left'>
                                                                {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                                                {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                                                {getSearchCard?.city ? getSearchCard.city : ''}
                                                            </p>
                                                        </div>
                                                    </Stack>

                                                    <div>
                                                        {getSearchCard?.food_types.length > 0 && <Stack direction="row" spacing={1}>
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
                                                                <CurrencyRupeeIcon style={{ fontSize: '18px' }} className="vc-price-one-similar-tiffin" />
                                                                <span className="vc-price-one-similar-tiffin"> {getSearchCard?.start_price} / Plate </span>
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
            </Box >


            {getTiffinSearchCards?.length > 0 && <>
                <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }} className='mb-5 mt-5'>
                    <h2 className='pagination-heading'>Total {total_count} Tiffin service providers found</h2>
                    {/* <p className='pagination-showing'>Showing 20 - 30</p> */}
                    <Link href="#" className='pagination-showing'>Go to Top</Link>
                </Stack>
            </>}
        </>

    )
}

export default GridViewTiffin