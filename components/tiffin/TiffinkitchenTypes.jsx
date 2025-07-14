import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FilterSkeleton from '../FilterSkeleton';
import { fetchTiffinKitchenTypes, fetchTiffinMapviewSearchCards, fetchtiffinSearchCards, setKitchenTypeFilter } from '@/app/features/tiffin/tiffinFilterSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TiffinkitchenTypes = () => {

    const { getTiffinKitchenTypes, isLoading } = useSelector((state) => state.tiffinFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        // if (!getTiffinKitchenTypes.length > 0) {
            dispatch(fetchTiffinKitchenTypes());
        // }
    }, [dispatch, getTiffinKitchenTypes.length]);

    // handleCheckboxChange 
    const onHandlekitchenFilter = useCallback((kitchenType) => {
        dispatch(setKitchenTypeFilter(kitchenType?.id))
        dispatch(fetchtiffinSearchCards())
        dispatch(fetchTiffinMapviewSearchCards())
    }, [dispatch]);

    // console.log(getTiffinKitchenTypes, "getTiffinKitchenTypes getTiffinKitchenTypes"); 

    return (
        <>
            {getTiffinKitchenTypes?.length > 0 ? (
                getTiffinKitchenTypes?.map((getKitchenType) => {
                    return (
                        <Stack className='text-muted' direction="row" alignItems="center" sx={{ marginLeft: '-10px', marginTop: '5px' }} key={getKitchenType?.id}>
                            <Checkbox {...label}
                                size="small"
                                className='checkbox-color'
                                style={{color: getKitchenType.selectedweb === 1 && '#d9822b'}}
                                checked={getKitchenType?.selectedweb === 1}
                                onChange={() => onHandlekitchenFilter(getKitchenType)}
                            />
                            <span className='checkbox-text'>{getKitchenType?.name}</span>
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

export default TiffinkitchenTypes