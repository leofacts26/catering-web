import React, { memo, useCallback, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringSearchCards, fetchOccasionCateringTypes, setOccasionTypes, setShowAllOccasions } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const CaterOccaionTypes = () => {

    const { getOccasionCateringTypes, occasionCount, isLoading } = useSelector((state) => state.cateringFilter)
    const [occCount, setoccCount] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchCateringSearchCards());
    // }, [dispatch])

    useEffect(() => {
        dispatch(fetchOccasionCateringTypes(occasionCount));
    }, []);

    // onHandleSelectOccasion 
    const onHandleSelectOccasion = (getOccasionType) => {
        dispatch(setOccasionTypes(getOccasionType?.occasion_id))
        dispatch(fetchCateringSearchCards());
    }

    const onShowAllOccasions = useCallback(() => {
        setoccCount(true)
        dispatch(setShowAllOccasions(occasionCount));
        dispatch(fetchOccasionCateringTypes(occasionCount));
    }, [dispatch])

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
                {isLoading ? 'Loading...' : `Show All ${occasionCount}`}  </p>
        </>
    )
}

export default memo(CaterOccaionTypes)