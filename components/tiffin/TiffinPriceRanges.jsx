import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinMapviewSearchCards, fetchTiffinPriceRanges, fetchtiffinSearchCards, setPriceTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
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
    const onHandlePriceRanges = useCallback((priceType) => {
        dispatch(setPriceTypeFilter(priceType?.id))
        dispatch(fetchtiffinSearchCards())
        dispatch(fetchTiffinMapviewSearchCards())
    }, [dispatch]);

    // console.log(getTiffinPriceRanges, "getTiffinPriceRanges"); 

    return (
        <>
            {!isLoading ? (
                getTiffinPriceRanges?.map((price) => (
                    <Stack className='text-muted' key={price?.id} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                        <Checkbox {...label} size="small" className='checkbox-color'
                            style={{ color: price.selectedweb === 1 && '#d9822b' }}
                            checked={price.selectedweb === 1}
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