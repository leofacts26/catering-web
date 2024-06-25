import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewSkeleton from '../GridViewSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCateringSearchCards, incrementPage } from '@/app/features/user/cateringFilterSlice';

const GridViewList = () => {
    const dispatch = useDispatch()
    const { getCateringSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.cateringFilter)

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
        return (
            <Grid container spacing={2}>
                {getCateringSearchCards.length > 0 && getCateringSearchCards.map((getSearchCard, index) => (
                    <GridViewSkeleton xs={12} sm={6} md={4} lg={4} key={index} />
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
                        const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || 'img/no-image.jpg';
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Link href="/catering-view" className='text-decoration-none'>
                                    <div className="vc-similar-card">
                                        <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                        <div className="vc-similar-card-description">
                                            <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <div className="text-start">
                                                    <h3 className='grid-view-title'>{getSearchCard?.catering_service_name || ""}</h3>
                                                    <p className='vc-similar-card-small text-left'>{getSearchCard?.street_name} {getSearchCard?.area} {getSearchCard?.city}</p>
                                                </div>
                                            </Stack>

                                            <Stack direction="row" spacing={1}>
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

                                            <h2 className="vc-similar-blue">
                                                {
                                                    getSearchCard?.cuisines?.slice(0, 3)?.map((cuisine, index, array) => {
                                                        return (
                                                            <span className='me-0' key={index}> {cuisine}
                                                                {index !== array.length - 1 && <span className='me-0'> | </span>} </span>
                                                        )
                                                    })
                                                }
                                            </h2>

                                            <Stack direction="row" alignItems="center" justifyContent="end" className="mb-4">
                                                <Stack direction="row" alignItems="center" justifyContent="end" spacing={0}>
                                                    <CurrencyRupeeIcon className="vc-price-one-similar-catering" />
                                                    <span className="vc-price-one-similar-catering"> {getSearchCard?.start_price} / Plate </span>
                                                </Stack>
                                            </Stack>



                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box >
        </>

    )
}

export default GridViewList