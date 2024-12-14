"use client"
import { Stack, Button } from '@mui/material';
import ReactSelectRed from "./ReactSelectRed";
import { useDispatch, useSelector } from "react-redux";
import { fetchCateringSearchCards, fetchGetAllSubscriptionTypes, setCateringSort, setSubscriptionFilter } from "@/app/features/user/cateringFilterSlice";
import { memo, useEffect } from 'react';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { clearFiltersGlobal } from '@/app/features/user/homeSlice';


const SelectBox = () => {
    const dispatch = useDispatch();
    const { cateringSortBy, subscriptionTypes } = useSelector((state) => state.cateringFilter);

    const handleSortChange = (selectedOption) => {
        if (selectedOption) {
            const formattedValue = [{
                value: selectedOption.value.toLowerCase().replace(/\s/g, '_')
            }];
            dispatch(setCateringSort(formattedValue));
            dispatch(fetchCateringSearchCards());
        } else {
            dispatch(setCateringSort([]));
        }
    };



    useEffect(() => {
        dispatch(fetchGetAllSubscriptionTypes())
    }, [])

    // onHandlesubscriptionTypes 
    const onHandlesubscriptionTypes = (id) => {
        dispatch(setSubscriptionFilter(id))
        // dispatch(fetchCateringSearchCards());
    }

    console.log(subscriptionTypes, "subscriptionTypes subscriptionTypes");

    // onHandleFIlterClear 
    const onHandleFIlterClear = async () => {
        await dispatch(clearFiltersGlobal());
        window.location.reload()
    }


    return (
        <>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">

                <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '0px 0px 15px 0px' }}>
                    <ReactSelectRed text1="Sort by" onChange={handleSortChange} />
                    <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ marginTop: '15px' }}>
                        {
                            subscriptionTypes?.map((subscriptionType) => {
                                return (
                                    <Button size="small" className={`btn-pill ${subscriptionType.selectedweb === 1 && 'btn-pill-active'}`} key={subscriptionType?.id}
                                        onClick={() => onHandlesubscriptionTypes(subscriptionType?.id)}
                                    >{subscriptionType?.name}</Button>
                                )
                            })
                        }
                    </Stack>
                </Stack>

                <div className='clear-filter-top-box'>
                    <Button className="cursor-pointer cater-clear-filter" onClick={() => onHandleFIlterClear()}>
                        <Stack direction="row" alignItems="center">
                            <FilterListOffIcon className="cater-removefilter-icon" /> Clear Filter
                        </Stack>
                    </Button>
                </div>
            </Stack>
        </>
    )
}

export default memo(SelectBox);
