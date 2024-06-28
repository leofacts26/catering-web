import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import GridViewSkeleton from '../GridViewSkeleton';
import { fetchtiffinSearchCards, incrementTiffinPage } from '@/app/features/tiffin/tiffinFilterSlice';
import { useEffect } from 'react';


const GridViewTiffin = ({ xs, sm, md, lg }) => {
    const dispatch = useDispatch()
    const { getTiffinSearchCards, isLoading, current_page, limit, total_count } = useSelector((state) => state.tiffinFilter)


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
                    {getTiffinSearchCards?.map((item) => {
                        const brandLogo = item?.brand_logo?.[0]?.original;
                        const bannerImage = item?.banner_images?.[0]?.original;
                        const imageSrc = item?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
                        return (
                            <Grid item xs={xs} sm={sm} md={md} lg={lg}>
                                <Link href={`/tiffin-search/${item?.vendor_id}/${item?.id}`} className='text-decoration-none'>
                                    <div className="vc-similar-card">
                                        <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                        <div className="vc-similar-card-description">
                                            <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <div className="text-start">
                                                    <h3 className='grid-view-title'>{item?.catering_service_name}</h3>
                                                    <p className='vc-similar-card-small text-left'> {item?.area}, {item?.street_name} </p>
                                                </div>
                                            </Stack>

                                            <Stack direction="row" spacing={1} sx={{ marginTop: '15px', marginBottom: '15px' }}>
                                                {
                                                    item?.food_types?.map((food_type, index) => {
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

                                            <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: "row" }} flexWrap="wrap" spacing={0} sx={{ marginTop: '15px' }}>
                                                {
                                                    item?.meal_times?.map((mealtime, index) => {
                                                        const isLast = index === item.meal_times.length - 1;
                                                        return (
                                                            <h2 key={index} className='vc-similar-blue'>
                                                                {mealtime}{!isLast && ' | '}
                                                            </h2>
                                                        );
                                                    })
                                                }

                                            </Stack>


                                            <Stack direction="row" alignItems="center" justifyContent="end" className="mb-4">
                                                <Stack direction="row" alignItems="center" justifyContent="end" spacing={0}>
                                                    <CurrencyRupeeIcon className="vc-price-one-similar-tiffin" />
                                                    <span className="vc-price-one-similar-tiffin"> ₹ {item?.start_price}/- </span>
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

export default GridViewTiffin