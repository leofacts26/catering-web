import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinPriceRanges, setPriceTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TiffinPriceRanges = () => {
    const { getTiffinPriceRanges, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinPriceRanges.length) {
            dispatch(fetchTiffinPriceRanges());
        }
    }, [dispatch, getTiffinPriceRanges.length]);

    // handleCheckboxChange 
    const onHandlePriceRanges = (priceType) => {
        dispatch(setPriceTypeFilter(priceType?.id))
    };

    console.log(getTiffinPriceRanges, "getTiffinPriceRanges");

    return (
        <>
            {getTiffinPriceRanges?.length > 0 ? (
                getTiffinPriceRanges?.map((price) => (
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

export default TiffinPriceRanges