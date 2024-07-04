import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinMapviewSearchCards, fetchTiffinMealTypes, fetchtiffinSearchCards, setMealTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TiffinMealtypes = () => {
    const { getTiffinMealTypes, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinMealTypes.length) {
            dispatch(fetchTiffinMealTypes());
        }
    }, [dispatch, getTiffinMealTypes.length]);

    const onHandleMealFilter = useCallback((mealtype) => {
        dispatch(setMealTypeFilter(mealtype?.id))
        dispatch(fetchtiffinSearchCards())
        dispatch(fetchTiffinMapviewSearchCards())
    }, [dispatch])

    // console.log(getTiffinMealTypes, "getTiffinMealTypes"); 

    return (
        <>
            {getTiffinMealTypes?.length > 0 ? (
                getTiffinMealTypes?.map((mealtype) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={mealtype?.id}>
                            <Checkbox {...label}
                                size="small" className='checkbox-color'
                                style={{color: mealtype.selectedweb === 1 && '#d9822b'}}
                                checked={mealtype?.selectedweb === 1} onChange={() => onHandleMealFilter(mealtype)} />
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