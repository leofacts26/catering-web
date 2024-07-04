import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinFoodTypes, fetchTiffinMapviewSearchCards, fetchtiffinSearchCards, setFoodTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TiffinFoodTypes = () => {
    const { getTiffinFoodTypes, isLoading } = useSelector((state) => state.tiffinFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinFoodTypes.length) {
            dispatch(fetchTiffinFoodTypes());
        }
    }, [dispatch, getTiffinFoodTypes.length]);

    // handleCheckboxChange 
    const onHandleFoodFilter = useCallback((foodType) => {
        dispatch(setFoodTypeFilter(foodType?.id))
        dispatch(fetchtiffinSearchCards())
        dispatch(fetchTiffinMapviewSearchCards())
    }, [dispatch]);

    // console.log(getTiffinFoodTypes, "getTiffinFoodTypes"); 

    return (
        <>
            {!isLoading ? (
                getTiffinFoodTypes?.slice(1, 3)?.map((foodType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={foodType?.id}>
                            <Checkbox {...label}
                                size="small" className='checkbox-color'
                                style={{ color: foodType.selectedweb === 1 && '#d9822b' }}
                                checked={foodType?.selectedweb === 1} onChange={() => onHandleFoodFilter(foodType)} />
                            <span className='checkbox-text'>{foodType?.name}</span>
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

export default TiffinFoodTypes