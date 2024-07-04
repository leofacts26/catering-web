"use client"
import Faq from '@/components/Faq'
import React from 'react'

const page = () => {
    return (
        <>
            <h2 className="user-profile-title mb-4" style={{ marginTop: '30px', fontSize: '1.8em', color: '#57636c' }}>
               FAQ's    
            </h2>
            <Faq />
        </>
    )
}

export default page