import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards, fetchCaterRatings, fetchServiceTypes, setRatingTypesFilter, setServiceTypesFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import { fetchTiffinMapviewSearchCards, fetchTiffinRatings, fetchtiffinSearchCards, setRatingTiffinTypesFilter } from '@/app/features/tiffin/tiffinFilterSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TiffinRatingCount = () => {

    const { getTiffinRatings } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getTiffinRatings.length) {
            dispatch(fetchTiffinRatings());
        }
    }, [dispatch, getTiffinRatings.length]);



    // onHandleServiceFilter 
    const onHandleRatingFilter = useCallback((getRating) => {
        dispatch(setRatingTiffinTypesFilter(getRating.rating))
        dispatch(fetchtiffinSearchCards())
        dispatch(fetchTiffinMapviewSearchCards())
    }, [dispatch])

    console.log(getTiffinRatings, "getTiffinRatings getTiffinRatings");

    return (
        <>
            {getTiffinRatings?.length > 0 ? (
                getTiffinRatings?.map((getRating) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getRating?.rating}>
                            <Checkbox {...label}
                                size="small"
                                style={{color: getRating.selectedweb === 1 && '#d9822b'}}
                                className='checkbox-color'
                                checked={getRating?.selectedweb === 1}
                                onChange={() => onHandleRatingFilter(getRating)}
                            />
                            <div className="mt-1">
                                {[...Array(parseInt(getRating.rating))].map((star, index) => (
                                    <StarIcon key={index} style={{ color: '#d9822b', fontSize: 20 }} />
                                ))}                               
                            </div>
                            {/* <span className='checkbox-text'>{getRating?.rating}</span> */}
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

export default memo(TiffinRatingCount)