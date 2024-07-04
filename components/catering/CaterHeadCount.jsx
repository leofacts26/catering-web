import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards, fetchHeadCounts, setHeadcountTypeFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CaterHeadCount = () => {
    const { getCateringHeadCount, isLoading } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!getCateringHeadCount.length) {
            dispatch(fetchHeadCounts());
        }
    }, [dispatch, getCateringHeadCount.length]);


    // handleCheckboxChange 
    const onHandleHeadCount = useCallback((headcount) => {
        dispatch(setHeadcountTypeFilter(headcount?.id))
        dispatch(fetchCateringSearchCards());
        dispatch(fetchCateringMapviewSearchCards());
    }, [dispatch]);


    return (
        <>
            {getCateringHeadCount?.length > 0 ? (
                getCateringHeadCount?.map((headCount) => (
                    <Stack className='text-muted' key={headCount?.id} direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }}>
                        <Checkbox {...label} size="small" className='checkbox-color'
                            style={{ color: headCount.selectedweb === 1 && '#c33332' }}
                            checked={headCount.selectedweb === 1}
                            onChange={() => onHandleHeadCount(headCount)}
                        />
                        <span className='checkbox-text'>{`Rs. ${headCount?.start} - Rs. ${headCount?.end}`}</span>
                    </Stack>
                ))
            ) : (
                <FilterSkeleton />
            )}
        </>
    )
}

export default memo(CaterHeadCount)