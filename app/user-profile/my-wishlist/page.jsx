"use client"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addchWishlist, fetchWishlist, fetchWishlistTiffin } from '@/app/features/user/settingSlice';
import ExploreCaterersShimmer from '@/components/shimmer/ExploreCaterersShimmer';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CateringWishlist from '@/components/CateringWishlist';
import TiffinWishList from '@/components/TiffinWishList';


const page = () => {
  const router = useRouter()
  const accessToken = useSelector((state) => state.user.accessToken);

  const { caterWishlist, tiffinWishlist, isLoading } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [])

  useEffect(() => {
    dispatch(fetchWishlistTiffin())
  }, [])

  const onNavigateCatering = (vendor_id, id) => {
    router.push(`/catering-search`)
  }

  const onNavigateTiffin = (vendor_id, id) => {
    router.push(`/tiffin-search`)
  }

  console.log(caterWishlist, "caterWishlist");
  console.log(tiffinWishlist, "tiffinWishlist");


  const [wishlist, setWishlist] = useState({});

  const onHandleAddFavourite = (branchId) => {
    const currentStatus = wishlist[branchId] || false;
    const vendor_type = "Caterer"
    let data = {
      branchId,
      whishlistStatus: !currentStatus ? 1 : 0,
      vendor_type
    }
    dispatch(addchWishlist(data))
    setWishlist((prevState) => ({ ...prevState, [branchId]: !currentStatus }));
  }

  useEffect(() => {
    const initialWishlist = {};
    caterWishlist.forEach((item) => {
      initialWishlist[item.id] = item?.is_wishlisted
    })
    setWishlist(initialWishlist)
  }, [caterWishlist])

  // onNavigateDetailPage 
  const onNavigateDetailPage = (vendor_id, id) => {
    router.push(`/catering-search/${vendor_id}/${id}`)
  }


  return (
    <>

      <CateringWishlist />

      <hr />

     <TiffinWishList />
      <br />
    </>
  )
}

export default page