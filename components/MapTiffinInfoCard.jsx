import React from 'react'
import Stack from '@mui/material/Stack';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const MapTiffinInfoCard = ({ infoWindowData }) => {
    const { catering_service_name, start_price, getSearchCard } = infoWindowData;
    const brandLogo = getSearchCard?.brand_logo?.[0]?.original;
    const bannerImage = getSearchCard?.banner_images?.[0]?.original;
    const imageSrc = getSearchCard?.subscription_type_name === "branded" && brandLogo || bannerImage || '/img/no-image.jpg';
    const filterFoodTypes = getSearchCard?.food_types.filter((item) => item !== 'All')

    return (
        <>
            <div className='text-decoration-none'
                onClick={(e) => {
                    onNavigateDetailPage(getSearchCard?.vendor_id, getSearchCard?.id)
                    e.stopPropagation()
                }}>
                <div className="vc-similar-card">
                    <div className="grid-img-box">
                        <img src={imageSrc} alt="" className="img-fluid vc-similar-card-img" />
                    </div>
                    <div className="vc-similar-card-description">
                        <Stack direction="row" justifyContent="space-between" alignItems="start" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div className="text-start">
                                <h3 className='grid-view-title text-ellipse-two'>{getSearchCard?.catering_service_name || ""}</h3>
                                <p className='vc-similar-card-small text-left'>
                                    {getSearchCard?.street_name ? `${getSearchCard.street_name}, ` : ''}
                                    {/* {getSearchCard?.area ? `${getSearchCard.area}, ` : ''} */}
                                    {getSearchCard?.city ? getSearchCard.city : ''}
                                </p>
                            </div>
                        </Stack>

                        <div>
                            {filterFoodTypes?.length > 0 && <Stack direction="row" spacing={1}>
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

                            {getSearchCard?.cuisines.length > 0 && <h2 className="vc-similar-blue text-ellipse-two">
                                <span className='me-2 text-ellipse-one-listcard'>
                                    {getSearchCard?.cuisines?.slice(0, 8)?.map((cuisine) => cuisine).join(" | ")}
                                </span>
                            </h2>}
                        </div>

                        <div className='w-100'>
                            {
                                getSearchCard?.start_price !== null && <Stack direction="row" alignItems="center" justifyContent="end" className="mb-1 mt-1 w-100">
                                    <Stack direction="row" alignSelf="end" justifyContent="end" spacing={0} className='w-100'>
                                        <CurrencyRupeeIcon style={{ fontSize: '18px' }} className="vc-price-one-similar-catering" />
                                        <span className="vc-price-one-similar-catering"> {getSearchCard?.start_price} / Plate </span>
                                    </Stack>
                                </Stack>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MapTiffinInfoCard