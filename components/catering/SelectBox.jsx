"use client"
import { Stack, Button } from '@mui/material';
import ReactSelectRed from "./ReactSelectRed";
import { useDispatch, useSelector } from "react-redux";
import { fetchCateringSearchCards, fetchGetAllSubscriptionTypes, setCateringSort, setSubscriptionFilter } from "@/app/features/user/cateringFilterSlice";
import { memo, useEffect } from 'react';


const SelectBox = () => {
    const dispatch = useDispatch();
    const { cateringSortBy, subscriptionTypes } = useSelector((state) => state.cateringFilter);

    const handleSortChange = (selectedOption) => {
        if (selectedOption) {
            const formattedValue = [{
                value: selectedOption.value.toLowerCase().replace(/\s/g, '_')
            }];
            dispatch(setCateringSort(formattedValue));
        } else {
            dispatch(setCateringSort([]));
        }
    };


    useEffect(() => {
        dispatch(fetchCateringSearchCards())
    }, [cateringSortBy, subscriptionTypes])

    useEffect(() => {
        dispatch(fetchGetAllSubscriptionTypes())
    }, [])

    // onHandlesubscriptionTypes 
    const onHandlesubscriptionTypes = (id) => {
        dispatch(setSubscriptionFilter(id))
    }

    console.log(subscriptionTypes, "subscriptionTypes");

    return (
        <>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '10px 0px 15px 0px' }}>
                <ReactSelectRed text1="Sort by" onChange={handleSortChange} />
                <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ marginTop: '15px' }}>
                    {
                        subscriptionTypes?.map((subscriptionType) => {
                            return (
                                <Button size="small" className={'btn-pill btn-pill-active'} key={subscriptionType?.id}
                                onClick={()=> onHandlesubscriptionTypes(subscriptionType?.id)}
                                >{subscriptionType?.name}</Button>
                            )
                        })
                    }
                    {/* <Button size="small" className="btn-pill" style={{ color: '#726e6e', fontSize: '12px' }}>Branded Caterers</Button>
                    <Button size="small" className="btn-pill" style={{ color: '#726e6e', fontSize: '12px' }}>Popular Caterers</Button> */}
                </Stack>
            </Stack>

        </>
    )
}

export default memo(SelectBox);
