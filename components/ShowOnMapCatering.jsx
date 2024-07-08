"use client";
import React from 'react';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/navigation';

const ShowOnMapCatering = ({ tiffinColor, locLatitude, locLongtitude, zoomLevel = 15 }) => {
    const router = useRouter();
    // console.log(locData, "locData locData");

    const handleClick = () => {
        router.push(`/catering-search/catering-map?lat=${locLatitude}&lng=${locLongtitude}&zoom=${zoomLevel}`);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={1} className="vc-icons">
                <LocationOnIcon style={{ fontSize: '14px' }} className="primary" />
                <span className="primary font-12" onClick={handleClick}>Show On Map</span>
            </Stack>
        </>
    );
};

export default ShowOnMapCatering;
