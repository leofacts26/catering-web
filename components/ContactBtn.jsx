"use client"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';

const ContactBtn = ({ number }) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const [userNumber, setUserNumber] = useState(false)

    return (
        <>
            {accessToken ? <Button variant="contained" className="vc-contact-btn-tiffin" onClick={() => setUserNumber(true)}>
                {userNumber ? <a style={{ color: '#ffffff', textDecoration: 'none' }} href={`tel:${number}`}>{number}</a> : 'Contact Now'} </Button> :
                <LoginModal title="Contact Now"  />
            }
        </>
    )
}

export default ContactBtn