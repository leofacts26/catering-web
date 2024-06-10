import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringFoodTypes, fetchCateringSearchCards, fetchPriceRanges, setFoodTypeFilter, setPriceTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CaterFoodTypes = () => {

    const { getCateringFoodTypes, isLoading } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchCateringSearchCards());
    // }, [dispatch])
    console.log(getCateringFoodTypes, "getCateringFoodTypes");

    useEffect(() => {
        dispatch(fetchCateringFoodTypes());
    }, []);

    // handleCheckboxChange 
    const onHandleFoodFilter = useCallback((priceType) => {
        dispatch(setFoodTypeFilter(priceType?.id))
        dispatch(fetchCateringSearchCards());
    }, [dispatch]);


  

    return (
        <>
            {getCateringFoodTypes?.length > 0 ? (
                getCateringFoodTypes?.map((foodType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={foodType?.id}>
                            <Checkbox {...label}
                                size="small" className='checkbox-color'
                                checked={foodType?.selected === 1} onChange={() => onHandleFoodFilter(foodType)} />
                            <span className='checkbox-text'>{foodType?.name}</span>
                        </Stack>
                    )
                })
            ) : (
                <FilterSkeleton />
            )
            }
        </>
    )
}

export default memo(CaterFoodTypes)