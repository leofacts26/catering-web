"use client"
import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCateringMapviewSearchCards, fetchCateringSearchCards } from '@/app/features/user/cateringFilterSlice';
import { useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Filters from '@/components/catering/Filters';
import GridViewList from '@/components/catering/GridView';
import MapAsyncSelectCatering from '@/components/MapAsyncSelectCatering';
import LoaderSpinner from '@/components/LoaderSpinner';
import MapTiffinInfoCard from '@/components/MapTiffinInfoCard';
import { setlLocationValuesGlobal } from '@/app/features/user/globalNavSlice';

const page = () => {
    const { getCateringMapviewSearchCards, isLoading } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch();
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [infoWindowData, setInfoWindowData] = useState(null);
    const [zoom, setZoom] = useState(10);
    const router = useRouter();

    // console.log(getCateringMapviewSearchCards, "getCateringMapviewSearchCards");

    const searchParams = useSearchParams()
    const detailLat = searchParams.get('lat')
    const detailLng = searchParams.get('lng')
    const detailZoom = searchParams.get('zoom');

    // console.log(detailLat, detailLng, "detailLat, detailLng");


    useEffect(() => {
        const fetchData = async () => {
            if (detailLat && detailLng) {
                await dispatch(setlLocationValuesGlobal({
                    is_city_search: 1,
                    latitude: detailLat,
                    longitude: detailLng
                }));
                await dispatch(fetchCateringMapviewSearchCards());
            } else {
                await dispatch(fetchCateringMapviewSearchCards());
            }
        };

        fetchData();
    }, [dispatch, detailLat, detailLng]);

    useEffect(() => {
        dispatch(fetchCateringSearchCards());
    }, [dispatch]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBf22eHEMxKk_9x0XWag-oCFTXkdClnPw8",
    });

    const markers = useMemo(() => {
        if (!getCateringMapviewSearchCards || !Array.isArray(getCateringMapviewSearchCards)) {
            return [];
        }
        return getCateringMapviewSearchCards.map(card => ({
            lat: card.latitude,
            lng: card.longitude,
            catering_service_name: card.catering_service_name,
            start_price: card.start_price,
            branch_id: card.id,
            vendor_id: card.vendor_id,
            getSearchCard: card
        }));
    }, [getCateringMapviewSearchCards]);

    const defaultCenter = useMemo(() => {
        if (detailLat && detailLng) {
            return { lat: parseFloat(detailLat), lng: parseFloat(detailLng) };
        }
        if (markers.length > 0) {
            return { lat: markers[0].lat, lng: markers[0].lng };
        }
        return { lat: 18.52043, lng: 73.856743 }; // Default center if no markers are available
    }, [markers, detailLat, detailLng]);

    const selectedLocation = {
        lat: parseFloat(detailLat),
        lng: parseFloat(detailLng)
    };

    const customMarker = {
        url: '/img/icons/catering-map-icon-catering.svg', // Replace with your image URL or path
        scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
        origin: new window.google.maps.Point(0, 0), // Adjust origin as needed
        anchor: new window.google.maps.Point(25, 50) // Adjust anchor as needed
    };

    const highlightedMarker = {
        url: '/img/icons/catering-map-icon-catering.svg', // Add a special icon for the selected location
        scaledSize: new window.google.maps.Size(50, 50),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50)
    };

    const onMapLoad = (map) => {
        setMapRef(map);
        if (markers.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            // markers.forEach(({ lat, lng }) => {
            //     if (typeof lat === 'number' && typeof lng === 'number') {
            //         bounds.extend({ lat, lng });
            //     } else {
            //         console.error('Invalid marker coordinates:', { lat, lng });
            //     }
            // });
            markers.forEach(marker => {
                const lat = parseFloat(marker.lat);
                const lng = parseFloat(marker.lng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    bounds.extend({ lat, lng });
                } else {
                    console.error(`Invalid lat or lng value for marker: ${marker}`);
                }
            });
            if (!bounds.isEmpty()) {
                map.fitBounds(bounds);
            }
        }
    };


    useEffect(() => {
        if (mapRef && detailLat && detailLng) {
            const latLng = new window.google.maps.LatLng(parseFloat(detailLat), parseFloat(detailLng));
            mapRef.panTo(latLng);
            if (detailZoom) {
                setZoom(parseInt(detailZoom, 10));
            } else {
                setZoom(15);
            }
        }
    }, [mapRef, detailLat, detailLng, detailZoom]);

    useEffect(() => {
        if (mapRef) {
            mapRef.setZoom(zoom);
        }
    }, [mapRef, zoom]);

    const handleMarkerHover = (index, lat, lng, catering_service_name, start_price, vendor_id, branch_id, getSearchCard) => {
        setHoveredMarker(index);
        setInfoWindowData({ index, catering_service_name, start_price, vendor_id, branch_id, getSearchCard });
        setIsOpen(true);
    };

    const handleMarkerHoverOut = () => {
        setHoveredMarker(null);
        setIsOpen(false);
    };

    const handleSelect = (selectedOption) => {
        if (mapRef && selectedOption) {
            const latLng = new window.google.maps.LatLng(selectedOption.lat, selectedOption.lng);
            mapRef.panTo(latLng);
            mapRef.setZoom(15);
        }
    };

    return (

        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} lg={4} className='map-filter-none'>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div className="map-left-container">
                                    <Filters />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="map-left-container">
                                    <GridViewList xs={12} sm={12} md={12} lg={12} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <div className="map-box-container">

                            <MapAsyncSelectCatering onSelect={handleSelect} />

                            <button className='btn-close' onClick={() => window.close()}>
                                Close Map
                            </button>

                            <div style={{ width: '100%', height: '100vh' }}>
                                {!isLoaded ? (
                                    <LoaderSpinner />
                                ) : (
                                    <GoogleMap
                                        mapContainerClassName="map-container"
                                        center={defaultCenter}
                                        zoom={zoom}
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: '100vh'
                                        }}
                                        onLoad={onMapLoad}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {markers.map(({ catering_service_name, lat, lng, start_price, vendor_id, branch_id, getSearchCard }, index) => {
                                            const isSelected = lat === selectedLocation.lat && lng === selectedLocation.lng;
                                            return (
                                                <Marker
                                                    key={index}
                                                    position={{ lat, lng }}
                                                    onMouseOver={() => handleMarkerHover(index, lat, lng, catering_service_name, start_price, vendor_id, branch_id, getSearchCard)}
                                                    onMouseOut={handleMarkerHoverOut}
                                                    icon={isSelected ? highlightedMarker : customMarker}
                                                    onClick={() => router.push(`/catering-search/${vendor_id}/${branch_id}`)}
                                                >
                                                    {isOpen && infoWindowData?.index === index && (
                                                        <InfoWindow
                                                            onCloseClick={() => setIsOpen(false)}
                                                        >
                                                            <MapTiffinInfoCard infoWindowData={infoWindowData} />
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            )
                                        })}
                                    </GoogleMap>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default page