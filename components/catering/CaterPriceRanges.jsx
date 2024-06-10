import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringSearchCards, fetchPriceRanges, setPriceTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectCateringPriceRanges } from '@/hooks/selectCateringFilter';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CaterPriceRanges = () => {
    
    // const getCateringPriceRanges = useSelector(makeSelectCateringPriceRanges);
    
    
    const { getCateringPriceRanges } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()

    
    // useEffect(() => {
    //     dispatch(fetchCateringSearchCards());
    // }, [dispatch])

  
    console.log(getCateringPriceRanges, "getCateringPriceRanges");

    useEffect(() => {
        dispatch(fetchPriceRanges());
    }, [dispatch, getCateringPriceRanges.length]);

    // handleCheckboxChange 
    const onHandlePriceRanges = useCallback((priceType) => {
        dispatch(setPriceTypeFilter(priceType?.id))
        dispatch(fetchCateringSearchCards());
    }, [dispatch]);


    return (
        <>
            {getCateringPriceRanges?.length > 0 ? (
                getCateringPriceRanges?.map((price) => (
                    <Stack className='text-muted' key={price?.id} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                        <Checkbox {...label} size="small" className='checkbox-color'
                            checked={price.selected === 1}
                            onChange={() => onHandlePriceRanges(price)}
                        />
                        <span className='checkbox-text'>{`Rs. ${price?.start_price} - Rs. ${price?.end_price}`}</span>
                    </Stack>
                ))
            ) : (
                <FilterSkeleton />
            )}
        </>
    )
}

export default memo(CaterPriceRanges)