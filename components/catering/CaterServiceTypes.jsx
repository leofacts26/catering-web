import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringSearchCards, fetchServiceTypes, setServiceTypesFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CaterServiceTypes = () => {

    const { getCateringServiceTypes } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchCateringSearchCards());
    // }, [dispatch])

    useEffect(() => {
        dispatch(fetchServiceTypes());
    }, []);

    // onHandleServiceFilter 
    const onHandleServiceFilter = useCallback((getServiceType) => {
        dispatch(setServiceTypesFilter(getServiceType.id))
        dispatch(fetchCateringSearchCards());
    }, [dispatch])

    return (
        <>
            {getCateringServiceTypes?.length > 0 ? (
                getCateringServiceTypes?.map((getServiceType) => {
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
        </>
    )
}

export default memo(CaterServiceTypes)