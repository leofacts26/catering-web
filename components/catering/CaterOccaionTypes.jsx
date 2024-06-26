import React, { memo, useCallback, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards, fetchOccasionCateringTypes, setOccasionTypes, setShowAllOccasions } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const CaterOccaionTypes = () => {

    const { getOccasionCateringTypes, occasionCount, occasionTotalCount, isLoading } = useSelector((state) => state.cateringFilter)
    const [occCount, setoccCount] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchOccasionCateringTypes(occasionCount));
    }, [occasionCount]);

    // onHandleSelectOccasion 
    const onHandleSelectOccasion = (getOccasionType) => {
        dispatch(setOccasionTypes(getOccasionType?.occasion_id))
        dispatch(fetchCateringSearchCards());
        dispatch(fetchCateringMapviewSearchCards());
    }

    const onShowAllOccasions = useCallback(() => {
        setoccCount(true)
        dispatch(setShowAllOccasions(occasionTotalCount));
        dispatch(fetchOccasionCateringTypes(occasionCount));
    }, [dispatch])

    // console.log(occasionCount, "occasionCount");

    return (
        <>
            {
                getOccasionCateringTypes?.slice(0, !occCount ? 5 : occasionCount)?.map((getOccasionType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getOccasionType?.id}>
                            <Checkbox
                                {...label}
                                size="small"
                                className='checkbox-color'
                                checked={getOccasionType?.selectedweb === 1}
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
                {isLoading ? 'Loading...' : `Show All ${occasionCount}`}  </p>
        </>
    )
}

export default memo(CaterOccaionTypes)