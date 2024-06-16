"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchTiffinMapviewSearchCards } from '@/app/features/tiffin/tiffinFilterSlice';

const Page = () => {
    const { getTiffinMapviewSearchCards, isLoading } = useSelector((state) => state.tiffinFilter);
    const dispatch = useDispatch();
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
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
            address: card.catering_service_name,
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

    const handleMarkerClick = (index, lat, lng, address) => {
        mapRef.panTo({ lat, lng });
        setInfoWindowData({ index, address });
        setIsOpen(true);
    };

    return (
        <div className="map-box-container">
            <button className='btn-close' onClick={() => router.push('/tiffin-search')}>
                Close Map
            </button>
            <div style={{ width: '100%', height: '100vh' }}>
                {!isLoaded ? (
                    <h1>Loading...</h1>
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
                        {markers.map(({ address, lat, lng }, index) => (
                            <Marker
                                key={index}
                                position={{ lat, lng }}
                                onClick={() => handleMarkerClick(index, lat, lng, address)}
                                icon={customMarker}
                            >
                                {isOpen && infoWindowData?.index === index && (
                                    <InfoWindow
                                        onCloseClick={() => setIsOpen(false)}
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
    );
};

export default Page;
