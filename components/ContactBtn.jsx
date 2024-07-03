"use client"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ContactBtn = ({ number }) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const [userNumber, setUserNumber] = useState(false)

    return (
        <>
            {accessToken ? <Button variant="contained" className="vc-contact-btn-tiffin" onClick={() => setUserNumber(true)}>
                {userNumber ? <a style={{ color: '#ffffff', textDecoration: 'none' }} href={`tel:${number}`}>{number}</a> : 'Contact Now'} </Button> :
                <Button variant="contained" className="vc-contact-btn-tiffin" onClick={() => toast.error("Please Login Before You Contact Vendor")}>Contact Now</Button>
            }

        </>
    )
}

export default ContactBtn