import { fetchTiffinServiceTypes, setServiceTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FilterSkeleton from '../FilterSkeleton';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TiffinServiceTypes = () => {
    const { getTiffinServiceTypes, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinServiceTypes.length) {
            dispatch(fetchTiffinServiceTypes());
        }
    }, [dispatch, getTiffinServiceTypes.length]);

    // handleCheckboxChange 
    const onHandleServiceFilter = (priceType) => {
        dispatch(setServiceTypeFilter(priceType?.id))
    };

    console.log(getTiffinServiceTypes, "getTiffinServiceTypes");

    return (
        <>
            {getTiffinServiceTypes?.length > 0 ? (
                getTiffinServiceTypes?.map((getServiceType) => {
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

export default TiffinServiceTypes