"use client"
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addchWishlist } from '@/app/features/user/settingSlice';
import { useDispatch } from 'react-redux';

const CateringDetailSave = ({ branchId, is_wishlisted }) => {
    const [wishlist, setWishlist] = useState(is_wishlisted);
    const dispatch = useDispatch();

    const onHandleAddFavourite = (branchId) => {
        const newWishlistStatus = !wishlist;
        const vendor_type = "Caterer";
        let data = {
            branchId: branchId,
            whishlistStatus: newWishlistStatus ? 1 : 0,
            vendor_type
        };
        dispatch(addchWishlist(data));
        setWishlist(newWishlistStatus);
    };

    console.log(wishlist, "wishlist");

    return (
        <Stack direction="row" alignItems="center" spacing={1} className="vc-icons" onClick={() => onHandleAddFavourite(branchId)}>
            {
                wishlist ?
                    <Stack direction="row" alignItems="center" className="vc-icons" spacing={1}>
                        <FavoriteIcon style={{ fontSize: '18px' }} /> <span>Save</span>
                    </Stack>
                    :
                    <Stack direction="row" alignItems="center" className="vc-icons" spacing={1}>
                        <FavoriteBorderIcon style={{ fontSize: '18px' }} /> <span>Save</span>
                    </Stack>
            }
        </Stack>
    );
};

export default CateringDetailSave;
