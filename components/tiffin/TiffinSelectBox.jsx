"use client"
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Stack, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactSelectTiffin from "./ReactSelectTiffin";
import { useDispatch, useSelector } from "react-redux";
import { clearFiltersGlobal, fetchGetAllTiffinSubscriptionTypes, fetchtiffinSearchCards, setTiffinSort, setTiffinSubscriptionFilter } from "@/app/features/tiffin/tiffinFilterSlice";
import toast from "react-hot-toast";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const TiffinSelectBox = () => {
    const dispatch = useDispatch();
    const { tiffinSubscriptionTypes } = useSelector((state) => state.tiffinFilter);

    const handleSortChange = (selectedOption) => {
        if (selectedOption) {
            const formattedValue = [{
                value: selectedOption.value.toLowerCase().replace(/\s/g, '_')
            }];
            dispatch(setTiffinSort(formattedValue));
            dispatch(fetchtiffinSearchCards())
        } else {
            dispatch(setTiffinSort([]));
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


    // onHandleFIlterClear 
    const onHandleFIlterClear = async () =>{
        await dispatch(clearFiltersGlobal());
        window.location.reload()
    }

    // console.log(tiffinSubscriptionTypes, "tiffinSubscriptionTypes"); 

    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
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


                <div className='clear-filter-top-box'>
                    <Button className="cursor-pointer clear-filter" onClick={() => onHandleFIlterClear()}> 
                       <Stack direction="row" alignItems="center">
                       <FilterListOffIcon className="tiffin-removefilter-icon" /> Clear Filter
                       </Stack>
                    </Button>
                </div>
            </Stack>
        </>
    )
}

export default TiffinSelectBox;