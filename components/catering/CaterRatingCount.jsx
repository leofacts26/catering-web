import React, { memo, useCallback, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import FilterSkeleton from '../FilterSkeleton';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards, fetchCaterRatings, fetchServiceTypes, setRatingTypesFilter, setServiceTypesFilter } from '@/app/features/user/cateringFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CaterRatingCount = () => {

    const { getCateringRatings } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!getCateringRatings.length) {
            dispatch(fetchCaterRatings());
        }
    }, [dispatch, getCateringRatings.length]);



    // onHandleServiceFilter 
    const onHandleRatingFilter = useCallback((getRating) => {
        dispatch(setRatingTypesFilter(getRating.rating))
        dispatch(fetchCateringSearchCards());
        dispatch(fetchCateringMapviewSearchCards());
    }, [dispatch])

    console.log(getCateringRatings, "getCateringRatings getCateringRatings");

    return (
        <>
            {getCateringRatings?.length > 0 ? (
                getCateringRatings?.map((getRating) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getRating?.rating}>
                            <Checkbox {...label}
                                size="small"
                                className='checkbox-color'
                                checked={getRating?.selectedweb === 1}
                                onChange={() => onHandleRatingFilter(getRating)}
                            />
                            <div className="mt-2">
                                {[...Array(parseInt(getRating.rating))].map((star, index) => (
                                    <StarIcon key={index} style={{ color: '#C33332', fontSize: 20 }} />
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

export default memo(CaterRatingCount)