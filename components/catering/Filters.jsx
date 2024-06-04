"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateringSearchCards, setFoodTypeFilter, setFoodTypeFilters, setOccasionFilters, setOccasionTypes, setPriceTypeFilter, setPriceTypeFilters, setServiceFilters, setServiceTypesFilter, setServingFilters, setServingTypesFilter, setShowAllOccasions } from '@/app/features/user/cateringFilterSlice';
import FilterSkeleton from '../FilterSkeleton';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&:hover fieldset': {
            border: '2px solid #e0e3e7',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #C33332',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '16px',
        padding: '10px 20px',
    },
}));

const Filters = ({
    getPriceRanges,
    getFoodTypes,
    getOccasionTypes,
    getCuisines,
    getServiceTypes,
    getServingTypes,
    occationsCount,
    loading,
    fetchOccasionCateringTypes,
}) => {

    const [occCount, setoccCount] = useState(false)
    const { locationValuesGlobal, people, occasionFilters, serviceFilters, servingFilters, foodtypeFilters, pricetypeFilters } = useSelector((state) => state.cateringFilter)

    const dispatch = useDispatch()

    const onShowAllOccasions = () => {
        setoccCount(true)
        dispatch(setShowAllOccasions(occationsCount));
        dispatch(fetchOccasionCateringTypes(occationsCount));
    }

    useEffect(() => {
        dispatch(fetchCateringSearchCards({
            people: people,
            locationValuesGlobal,
            occasions_filter: occasionFilters,
            service_filter: serviceFilters,
            serving_filter: servingFilters,
            foodtype_filter: foodtypeFilters,
            pricetype_filter: getPriceRanges,
        }));
    }, [occasionFilters, serviceFilters, servingFilters, foodtypeFilters, getPriceRanges, dispatch])


    // onHandleSelectOccasion 
    const onHandleSelectOccasion = (getOccasionType) => {
        dispatch(setOccasionTypes(getOccasionType?.occasion_id))
        const updatedOccasionsFilter = getOccasionTypes.map(occasion => occasion.occasion_id === getOccasionType.occasion_id
            ? { ...occasion, selected: occasion.selected === 1 ? 0 : 1 }
            : occasion
        )
        dispatch(setOccasionFilters(updatedOccasionsFilter));
    }


    // onHandleServiceFilter 
    const onHandleServiceFilter = (getServiceType) => {
        dispatch(setServiceTypesFilter(getServiceType.id))
        const updatedServiceTypes = getServiceTypes?.map(serviceType => serviceType.id === getServiceType.id
            ? { ...serviceType, selected: serviceType.selected === 1 ? 0 : 1 } : serviceType)
        dispatch(setServiceFilters(updatedServiceTypes));
    }

    // onHandleServingFilter 
    const onHandleServingFilter = (getServingType) => {
        dispatch(setServingTypesFilter(getServingType?.id))
        const updatedServingTypes = getServingTypes?.map(servingType => servingType.id === getServingType.id
            ? { ...servingType, selectedweb: servingType.selectedweb === 1 ? 0 : 1 } : servingType)
        dispatch(setServingFilters(updatedServingTypes))
    }

    // onHandleFoodFilter 
    const onHandleFoodFilter = (getFoodType) => {
        dispatch(setFoodTypeFilter(getFoodType?.id))
        const updatedFoodTypes = getFoodTypes?.map(foodType => foodType.id === getFoodType.id
            ? { ...foodType, selectedweb: foodType.selectedweb === 1 ? 0 : 1 } : foodType)
        dispatch(setFoodTypeFilters(updatedFoodTypes))
    }

    // handleCheckboxChange 
    const onHandlePriceRanges = (priceType) => {
        dispatch(setPriceTypeFilter(priceType?.id))
        // const updatedPriceRanges = getPriceRanges?.map(price => {
        //     if (price?.id === priceType?.id) {
        //         return { ...price, selectedweb: price?.selectedweb === 1 ? 0 : 1 };
        //     } else {
        //         return price;
        //     }
        // });

        // const selectedPriceRanges = updatedPriceRanges?.filter(price => price?.selectedweb === 1);


        // Convert the selected price ranges to the required format
        // const updatedPriceTypes = selectedPriceRanges.map(price => {
        //     return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) };
        // });

        // dispatch(setPriceTypeFilters(updatedPriceTypes))
    };


    return (
        <>
            <Box sx={{ marginBottom: '10px' }} className="filter-shadow">
                <Card>
                    <CardContent>
                        <h3 className='filter-text'>Filter by:</h3>
                    </CardContent>
                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Your Budget (Per Plate Cost):</h3>
                        <p style={{ margin: '10px 0px', fontSize: '16px' }} className='select-price-range'>Select Price Range</p>

                        {getPriceRanges?.length > 0 ? (
                            getPriceRanges?.map((price) => (
                                <Stack className='text-muted' key={price?.id} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                                    <Checkbox {...label} size="small" className='checkbox-color'
                                        checked={price.selectedweb === 1}
                                        onChange={() => onHandlePriceRanges(price)}
                                    />
                                    <span className='checkbox-text'>{`Rs. ${price?.start_price} - Rs. ${price?.end_price}`}</span>
                                </Stack>
                            ))
                        ) : (
                            <FilterSkeleton />
                        )}
                    </CardContent>

                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Food Type:</h3>
                        {getFoodTypes?.length > 0 ? (
                            getFoodTypes?.map((foodType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={foodType?.id}>
                                        <Checkbox {...label}
                                            size="small" className='checkbox-color'
                                            checked={foodType?.selectedweb === 1} onChange={() => onHandleFoodFilter(foodType)} />
                                        <span className='checkbox-text'>{foodType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>

                    <Divider />

                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text mb-2'>Choose Cuisine</h3>
                        <CssTextField
                            id="outlined-number"
                            variant="outlined"
                            label="Search here..."
                            className='mt-0'
                            style={{ width: '100%', marginTop: '10px' }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#f4f4fc6b',
                                },
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        onClick={() => setIsAdornmentClicked(true)}
                                    >
                                        <SearchIcon style={{ fontSize: '14px' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ marginTop: '0px' }}>
                            {getCuisines?.length > 0 ? (
                                getCuisines?.map((getCuisine) => {
                                    return (
                                        <Accordion className='m-0 shadow-none' key={getCuisine?.id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                className='m-0 p-0'
                                            >
                                                <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px' }}>
                                                    <Checkbox {...label} size="small" className='m-0 checkbox-color' />
                                                    <span className='checkbox-text'>{getCuisine?.name}</span>
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ marginLeft: '-20px', padding: '0px 16px' }}>
                                                {getCuisine?.children?.map((child) => {
                                                    return (
                                                        <Stack className='text-muted' direction="row" alignItems="center" key={child?.id}>
                                                            <Checkbox {...label} size="small" className='checkbox-color' />
                                                            <span className='checkbox-text'>{child?.name}</span>
                                                        </Stack>
                                                    )
                                                })}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            ) : (
                                <FilterSkeleton />
                            )
                            }
                        </Box>
                    </CardContent>

                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Occasions:</h3>
                        {
                            getOccasionTypes?.slice(0, !occCount ? 5 : occationsCount)?.map((getOccasionType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getOccasionType?.id}>
                                        <Checkbox
                                            {...label}
                                            size="small"
                                            className='checkbox-color'
                                            checked={getOccasionType?.selected === 1}
                                            onChange={() => onHandleSelectOccasion(getOccasionType)}
                                        />
                                        <span className='checkbox-text'>{getOccasionType?.occasion_name}</span>
                                    </Stack>
                                )
                            })
                        }
                        <p className='text-center' style={{ color: '#245396', fontSize: '12px', cursor: 'pointer' }}
                            onClick={onShowAllOccasions}
                        >
                            {loading ? 'Loading...' : `Show All ${occationsCount}`}  </p>
                    </CardContent>


                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Service Type:</h3>
                        {getServiceTypes?.length > 0 ? (
                            getServiceTypes?.map((getServiceType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getServiceType?.id}>
                                        <Checkbox {...label}
                                            size="small"
                                            className='checkbox-color'
                                            checked={getServiceType?.selected === 1}
                                            onChange={() => onHandleServiceFilter(getServiceType)}
                                        />
                                        <span className='checkbox-text'>{getServiceType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>

                    <Divider />
                    <CardContent>
                        <h3 className='font-20 font-weight-500 filter-text'>Choose Cater Service:</h3>
                        {getServingTypes?.length > 0 ? (
                            getServingTypes?.map((getServingType) => {
                                return (
                                    <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}
                                        key={getServingType?.id}>
                                        <Checkbox {...label}
                                            size="small"
                                            className='checkbox-color'
                                            checked={getServingType?.selectedweb === 1}
                                            onChange={() => onHandleServingFilter(getServingType)}
                                        />
                                        <span className='checkbox-text'>{getServingType?.name}</span>
                                    </Stack>
                                )
                            })
                        ) : (
                            <FilterSkeleton />
                        )
                        }
                    </CardContent>

                </Card>
            </Box>
        </>
    )
}

export default Filters