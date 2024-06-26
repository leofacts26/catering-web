import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewSkeleton from '../GridViewSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCateringSearchCards, incrementPage } from '@/app/features/user/cateringFilterSlice';

const GridViewList = ({ xs, sm, md, lg }) => {
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
                    <GridViewSkeleton xs={xs} sm={sm} md={md} lg={md} key={index} />
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
                        const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
                        return (
                            <Grid item xs={xs} sm={sm} md={md} lg={lg}>
                                <Link href={`/catering-search/${getSearchCard?.vendor_id}/${getSearchCard?.id}`} className='text-decoration-none'>
                                    <div className="vc-similar-card">
                                        <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                                        <div className="vc-similar-card-description">
                                            <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                <div className="text-start">
                                                    <h3 className='grid-view-title text-ellipse-two'>{getSearchCard?.catering_service_name || ""}</h3>
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

                                            <h2 className="vc-similar-blue text-ellipse-two">
                                                {
                                                    getSearchCard?.cuisines?.slice(0, 3)?.map((cuisine, index, array) => {
                                                        return (
                                                            <span className='me-0' key={index}> {cuisine}
                                                                {index !== array.length - 1 && <span className='me-0'> | </span>} </span>
                                                        )
                                                    })
                                                }
                                            </h2>

                                          {
                                            getSearchCard?.start_price !== null &&  <Stack direction="row" alignItems="center" justifyContent="end" className="mb-1 mt-1 w-100">
                                            <Stack direction="row" alignSelf="end" justifyContent="end" spacing={0} className='w-100'>
                                                <CurrencyRupeeIcon style={{fontSize: '18px'}} className="vc-price-one-similar-catering" />
                                                <span className="vc-price-one-similar-catering"> {getSearchCard?.start_price} / Plate </span>
                                            </Stack>
                                        </Stack>
                                          }
                                           
                                        </div>
                                    </div>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>


            {getCateringSearchCards?.length > 0 && <>
                <Stack direction="row" justifyContent="space-between" style={{ marginBottom: '20px 0px 0px 0px' }} className='mb-5 mt-5'>
                    <h2 className='pagination-heading'>Total {total_count} Catering service providers found</h2>
                    <p className='pagination-showing'>Showing 20 - 30</p>
                </Stack>
            </>}

        </>

    )
}

export default GridViewList