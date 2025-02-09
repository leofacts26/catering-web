"use client"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import useRegistration from '@/hooks/useRegistration';
import PhoneIcon from '@mui/icons-material/Phone';
import { createUserEnquiry } from '@/app/features/user/cateringFilterSlice';
import { usePathname } from 'next/navigation'
import { createTiffinUserEnquiry } from '@/app/features/tiffin/tiffinFilterSlice';


const ContactBtn = ({ number, vendorId, branchId }) => {
    const { userDetails } = useSelector((state) => state.user)
    const accessToken = useSelector((state) => state.user.accessToken);
    const [userNumber, setUserNumber] = useState(false)
    const { handleClickOpen } = useRegistration();
    const dispatch = useDispatch()
    const pathname = usePathname()
    const formattedArea = `${userDetails?.area}, ${userDetails?.city}`;

    // console.log(userDetails, "userDetails");
    
    // console.log(pathname, "router.pathname");

    const onHandleEnquiryFn = async () => {
        const data = {
            vendorId,
            branchId,
            area: formattedArea
        }
        if (pathname.includes('catering-search')) {
            console.log("cateringcateringcatering");
            await dispatch(createUserEnquiry(data))
        } else if (pathname.includes('tiffin-search')) {
            console.log("tiffintiffintiffintiffin");
            await dispatch(createTiffinUserEnquiry(data));
        } else {
            console.error('Unknown search type in URL');
        }
    }

    return (
        <>
            {accessToken ? <Button startIcon={<PhoneIcon />} variant="contained" className="vc-contact-btn-tiffin" onClick={() => setUserNumber(true)}>
                {userNumber ? <a style={{ color: '#ffffff', textDecoration: 'none' }} href={`tel:${number}`}>{number}</a> : <span onClick={() => onHandleEnquiryFn()}>Contact Now</span>} </Button> :
                <Button variant="contained" className="vc-contact-btn-tiffin" onClick={handleClickOpen}>Contact Now</Button>
            }
        </>
    )
}

export default ContactBtn