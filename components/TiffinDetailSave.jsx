"use client"
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addchWishlist } from '@/app/features/user/settingSlice';
import { useDispatch } from 'react-redux';

const TiffinDetailSave = ({ branchId }) => {
    const [wishlist, setWishlist] = useState(false);
    const dispatch = useDispatch()

    const onHandleAddFavourite = (branchId) => {
        const newWishlistStatus = !wishlist;
        const vendor_type = "Tiffin"
        let data = {
            branchId,
            whishlistStatus: newWishlistStatus ? 1 : 0,
            vendor_type
        }
        dispatch(addchWishlist(data));
        setWishlist(newWishlistStatus);
    }

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons-tiffin" onClick={() => onHandleAddFavourite(branchId)}>
                {
                    wishlist ? <Stack direction="row" alignItems="center" className="vc-icons-tiffin" spacing={1}><FavoriteIcon style={{ fontSize: '18px' }} /> <span>Save</span></Stack> :
                        <Stack direction="row" alignItems="center" className="vc-icons-tiffin" spacing={1}><FavoriteBorderIcon style={{ fontSize: '18px' }} /> <span>Save</span></Stack>
                }
            </Stack>
        </>
    )
}

export default TiffinDetailSave