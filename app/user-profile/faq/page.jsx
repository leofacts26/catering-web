"use client"
import Faq from '@/components/Faq'
import React from 'react'
import Container from '@mui/material/Container';


const page = () => {
    return (
        <>
            <Container maxWidth="lg">
                <h2 className="user-profile-title mb-4" style={{ fontSize: '1.8em', color: '#57636c' }}>
                    FAQ's
                </h2>
            </Container>
            <Faq />
        </>
    )
}

export default page