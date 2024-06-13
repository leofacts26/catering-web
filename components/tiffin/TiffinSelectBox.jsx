"use client"
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Stack, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactSelectTiffin from "./ReactSelectTiffin";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllSubscriptionTypes, setCateringSort, setSubscriptionFilter } from "@/app/features/user/cateringFilterSlice";
import { fetchtiffinSearchCards } from "@/app/features/tiffin/tiffinFilterSlice";


const TiffinSelectBox = ( ) => {
    const dispatch = useDispatch();
    const { subscriptionTypes } = useSelector((state) => state.cateringFilter);

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
        dispatch(fetchGetAllSubscriptionTypes())
    }, [])

    // onHandlesubscriptionTypes 
    const onHandlesubscriptionTypes = (id) => {
        dispatch(setSubscriptionFilter(id))
        dispatch(fetchtiffinSearchCards())
    }

    // console.log(subscriptionTypes, "subscriptionTypes"); 

    return (
        <>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '10px 0px 15px 0px' }}>
                <ReactSelectTiffin text1="Sort by" onChange={handleSortChange} />
                <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ marginTop: '15px' }}>
                    {
                        subscriptionTypes?.map((subscriptionType) => {
                            return (
                                <Button size="small" className={`btn-pill ${subscriptionType.selected === 1 && 'btn-pill-active-catering'}`} key={subscriptionType?.id}
                                    onClick={() => onHandlesubscriptionTypes(subscriptionType?.id)}
                                >{subscriptionType?.name}</Button>
                            )
                        })
                    }
                </Stack>
            </Stack>

        </>
    )
}

export default TiffinSelectBox;