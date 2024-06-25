"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchTiffinMapviewSearchCards } from '@/app/features/tiffin/tiffinFilterSlice';
import TiffinFilters from '@/components/tiffin/TiffinFilters';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoaderSpinner from '@/components/LoaderSpinner';

const Page = () => {
    const { getTiffinMapviewSearchCards, isLoading } = useSelector((state) => state.tiffinFilter);
    const dispatch = useDispatch();
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [infoWindowData, setInfoWindowData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchTiffinMapviewSearchCards());
    }, [dispatch]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBf22eHEMxKk_9x0XWag-oCFTXkdClnPw8",
    });

    const markers = useMemo(() => {
        if (!getTiffinMapviewSearchCards || !Array.isArray(getTiffinMapviewSearchCards)) {
            return [];
        }
        return getTiffinMapviewSearchCards.map(card => ({
            lat: card.latitude,
            lng: card.longitude,
            catering_service_name: card.catering_service_name,
            start_price: card.start_price,
            branch_id: card.id,
            vendor_id: card.vendor_id,
        }));
    }, [getTiffinMapviewSearchCards]);

    const defaultCenter = useMemo(() => {
        if (markers.length > 0) {
            return { lat: markers[0].lat, lng: markers[0].lng };
        }
        return { lat: 18.52043, lng: 73.856743 }; // Default center if no markers are available
    }, [markers]);

    const customMarker = {
        url: '/img/map/location.png', // Replace with your image URL or path
        scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
        origin: new window.google.maps.Point(0, 0), // Adjust origin as needed
        anchor: new window.google.maps.Point(25, 50) // Adjust anchor as needed
    };

    const onMapLoad = (map) => {
        setMapRef(map);
        if (markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
            map.fitBounds(bounds);
        }
    };

    const handleMarkerHover = (index, lat, lng, catering_service_name, start_price, vendor_id, branch_id) => {
        setHoveredMarker(index);
        setInfoWindowData({ index, catering_service_name, start_price, vendor_id, branch_id });
        setIsOpen(true);
    };

    const handleMarkerHoverOut = () => {
        setHoveredMarker(null);
        setIsOpen(false);
    };

    console.log(getTiffinMapviewSearchCards, "getTiffinMapviewSearchCards");

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className="map-left-container">
                            <TiffinFilters />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className="map-box-container">
                            <button className='btn-close' onClick={() => router.push('/tiffin-search')}>
                                Close Map
                            </button>

                            <div style={{ width: '100%', height: '100vh' }}>
                                {!isLoaded ? (
                                    <LoaderSpinner />
                                ) : (
                                    <GoogleMap
                                        mapContainerClassName="map-container"
                                        center={defaultCenter}
                                        zoom={10}
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: '100vh'
                                        }}
                                        onLoad={onMapLoad}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {markers.map(({ catering_service_name, lat, lng, start_price, vendor_id, branch_id }, index) => (
                                            <Marker
                                                key={index}
                                                position={{ lat, lng }}
                                                onMouseOver={() => handleMarkerHover(index, lat, lng, catering_service_name, start_price, vendor_id, branch_id)}
                                                onMouseOut={handleMarkerHoverOut}
                                                icon={customMarker}
                                                onClick={() => router.push(`/tiffin-search/${vendor_id}/${branch_id}`)}
                                            >
                                                {isOpen && infoWindowData?.index === index && (
                                                    <InfoWindow
                                                        onCloseClick={() => setIsOpen(false)}
                                                    >
                                                        <div>
                                                            <p> <b>Name:-</b> {infoWindowData.catering_service_name}</p>
                                                            <p className='mt-2'> <b>Start Price:-</b> {infoWindowData.start_price}</p>
                                                        </div>
                                                    </InfoWindow>
                                                )}
                                            </Marker>
                                        ))}
                                    </GoogleMap>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Page;
