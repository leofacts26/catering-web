import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinMealTypes, setMealTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TiffinMealtypes = () => {
    const { getTiffinMealTypes, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinMealTypes.length) {
            dispatch(fetchTiffinMealTypes());
        }
    }, [dispatch, getTiffinMealTypes.length]);

    const onHandleMealFilter = (mealtype) => {
        dispatch(setMealTypeFilter(mealtype?.id))
    }

    console.log(getTiffinMealTypes, "getTiffinMealTypes");

    return (
        <>
            {getTiffinMealTypes?.length > 0 ? (
                getTiffinMealTypes?.map((mealtype) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={mealtype?.id}>
                            <Checkbox {...label}
                                size="small" className='checkbox-color'
                                checked={mealtype?.selected === 1} onChange={() => onHandleMealFilter(mealtype)} />
                            <span className='checkbox-text'>{mealtype?.name}</span>
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

export default TiffinMealtypes