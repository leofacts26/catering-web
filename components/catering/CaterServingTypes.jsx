import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringSearchCards, fetchCateringServingTypes, fetchPriceRanges, setPriceTypeFilter, setServingTypesFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const CaterServingTypes = () => {

    const { getCateringServingTypes } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()


    // useEffect(() => {
    //     dispatch(fetchCateringSearchCards());
    // }, [dispatch])

    useEffect(() => {
        dispatch(fetchCateringServingTypes());
    }, []);

    // onHandleServingFilter 
    const onHandleServingFilter = useCallback((getServingType) => {
        dispatch(setServingTypesFilter(getServingType?.id))
        dispatch(fetchCateringSearchCards());
    }, [dispatch])

    console.log(getCateringServingTypes, "getCateringServingTypes");


    return (
        <>
            {getCateringServingTypes?.length > 0 ? (
                getCateringServingTypes?.map((getServingType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}
                            key={getServingType?.id}>
                            <Checkbox {...label}
                                size="small"
                                className='checkbox-color'
                                checked={getServingType?.selected === 1}
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
        </>
    )
}

export default memo(CaterServingTypes)