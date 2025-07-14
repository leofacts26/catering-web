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

//    console.log(getOccasionCateringTypes, "getOccasionCateringTypes");
   

    const [showAll, setShowAll] = useState(true)
    const [count, setCount] = useState(8)


    useEffect(() => {
        // if (!getOccasionCateringTypes?.length) {
            dispatch(fetchOccasionCateringTypes(occasionCount || 5));
        // }
    }, [dispatch, getOccasionCateringTypes?.length, occasionCount]);


    // onHandleSelectOccasion 
    const onHandleSelectOccasion = (occasionId) => {
        dispatch(setOccasionTypes({ occasionId, getOccasionCateringTypes }));
        dispatch(fetchCateringSearchCards());
        dispatch(fetchCateringMapviewSearchCards());
    }

    const onHandleShow = () => {
        // console.log("true");
        setShowAll(false)
        setCount(100)
    }

    const onHandleClose = () => {
        // console.log("false");
        setShowAll(true)
        setCount(8)
    }

    return (
        <>
            {
                getOccasionCateringTypes?.slice(0, count)?.map((getOccasionType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getOccasionType?.id}>
                            <Checkbox
                                {...label}
                                size="small"
                                className='checkbox-color'
                                checked={getOccasionType?.selectedweb === 1}
                                onChange={() => onHandleSelectOccasion(getOccasionType?.occasion_id)}
                                style={{
                                    color: getOccasionType.selectedweb === 1 && '#c33332',
                                }}
                            />
                            <span className='checkbox-text'>{getOccasionType?.occasion_name}</span>
                        </Stack>
                    )
                })
            }

            {showAll ? <p className='text-center' style={{ color: '#245396', fontSize: '12px', cursor: 'pointer' }} onClick={() => onHandleShow()}>
                {`Show All ${occasionCount}`}
            </p> : <p className='text-center' style={{ color: '#245396', fontSize: '12px', cursor: 'pointer' }} onClick={() => onHandleClose()}>
                {`Show Less`}
            </p>}

            {/* {showAll ? <span className="text-red view-all ms-2 cursor-pointer" onClick={() => onHandleShow()}> Show All </span> :
                <span className="text-red view-all ms-2 cursor-pointer" onClick={() => onHandleClose()}> Show Less </span>} */}

        </>
    )
}

export default memo(CaterOccaionTypes)