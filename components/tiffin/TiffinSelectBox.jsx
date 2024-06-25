"use client"
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Stack, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactSelectTiffin from "./ReactSelectTiffin";
import { useDispatch, useSelector } from "react-redux";
import { setCateringSort } from "@/app/features/user/cateringFilterSlice";
import { fetchGetAllTiffinSubscriptionTypes, fetchtiffinSearchCards, setTiffinSubscriptionFilter } from "@/app/features/tiffin/tiffinFilterSlice";


const TiffinSelectBox = ( ) => {
    const dispatch = useDispatch();
    const { tiffinSubscriptionTypes } = useSelector((state) => state.tiffinFilter);

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
        dispatch(fetchGetAllTiffinSubscriptionTypes())
    }, [])

    // onHandlesubscriptionTypes 
    const onHandlesubscriptionTypes = (id) => {
        dispatch(setTiffinSubscriptionFilter(id))
        dispatch(fetchtiffinSearchCards())
    }

    console.log(tiffinSubscriptionTypes, "tiffinSubscriptionTypes"); 

    return (
        <>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ margin: '10px 0px 15px 0px' }}>
                <ReactSelectTiffin text1="Sort by" onChange={handleSortChange} />
                <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} style={{ marginTop: '15px' }}>
                    {
                        tiffinSubscriptionTypes?.map((subscriptionType) => {
                            return (
                                <Button size="small" className={`btn-pill ${subscriptionType.selectedweb === 1 && 'btn-pill-active-catering'}`} key={subscriptionType?.id}
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