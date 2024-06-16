"use client"
import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards } from '@/app/features/user/cateringFilterSlice';

const page = () => {
    const { getCateringMapviewSearchCards, isLoading } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()
    // console.log(getCateringMapviewSearchCards, "getCateringMapviewSearchCards");
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchCateringMapviewSearchCards())
    }, [])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBf22eHEMxKk_9x0XWag-oCFTXkdClnPw8",
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    const customMarker = {
        url: '/img/map/location.png', // Replace with your image URL or path
        scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
        origin: new window.google.maps.Point(0, 0), // Adjust origin as needed
        anchor: new window.google.maps.Point(25, 50) // Adjust anchor as needed
    };



    const markers = getCateringMapviewSearchCards?.map((getCateringSearchCard) => {
        if (!getCateringMapviewSearchCards || !Array.isArray(getCateringMapviewSearchCards)) {
            return [];
        }
        return {
            lat: getCateringSearchCard?.latitude,
            lng: getCateringSearchCard?.longitude,
            address: getCateringSearchCard?.catering_service_name,
        }
    })

    console.log(getCateringMapviewSearchCards, "getCateringMapviewSearchCards 888");

    // const markers = [
    //     { address: "Address1", lat: 18.5204, lng: 73.8567 },
    //     { address: "Address2", lat: 18.5314, lng: 73.8446 },
    //     { address: "Address3", lat: 18.5642, lng: 73.7769 },
    // ];

    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds?.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (id, lat, lng, address) => {
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, address });
        setIsOpen(true);
    };

    return (
        <div className="map-box-contaier">
            <button className='btn-close' onClick={() => router.push('/catering-search')}>
                Close Map
            </button>
            <div style={{ width: '100%', height: '100vh' }}>
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={10}
                        mapContainerStyle={{
                            width: "100%",
                            height: '100vh'
                        }}
                        onLoad={onMapLoad}
                        onClick={() => setIsOpen(false)}
                    >
                        {markers.map(({ address, lat, lng }, ind) => (
                            <Marker
                                key={ind}
                                position={{ lat, lng }}
                                onClick={() => {
                                    handleMarkerClick(ind, lat, lng, address);
                                }}
                                icon={customMarker}
                            >
                                {isOpen && infoWindowData?.id === ind && (
                                    <InfoWindow
                                        onCloseClick={() => {
                                            setIsOpen(false);
                                        }}
                                    >
                                        <h3>{infoWindowData.address}</h3>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}

                    </GoogleMap>
                )}
            </div>
        </div>
    )
}

export default page