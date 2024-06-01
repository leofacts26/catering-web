import { setlLocationValuesGlobal, setLocationPlaceId, setManualLocation, setSelectedLocation } from '@/app/features/user/cateringFilterSlice';
import React, { useEffect, useState } from 'react'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useDispatch, useSelector } from 'react-redux';



const useGetLocationResults = () => {

    const dispatch = useDispatch()
    const { locationValuesGlobal, locationPlaceId, manualLocation, selectedLocation } = useSelector((state) => state.cateringFilter);


    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE,
        options: {
            componentRestrictions: { country: 'in' }
        }
    });


    useEffect(() => {
        if (placePredictions?.length)
            placesService?.getDetails(
                {
                    placeId: locationPlaceId,
                },
                (placeDetails) => savePlaceDetailsToState(placeDetails)
            );
    }, [placePredictions, locationPlaceId]);


    const savePlaceDetailsToState = (places) => {
        const { formatted_address, name } = places;
        const { address_components } = places;

        const country = address_components?.find(c => c?.types?.includes('country')) || {};
        const state = address_components?.find(c => c?.types?.includes('administrative_area_level_1')) || {};
        // const city = address_components?.find(c => c?.types?.includes('administrative_area_level_3')) || {};
        const city = address_components?.find(c => c?.types?.includes('locality')) || {};
        const pincode = address_components?.find(c => c?.types?.includes('postal_code')) || {};
        const area = address_components?.find(c => c?.types?.includes('locality')) || {};
        const street_name = address_components?.find(c => c?.types?.includes('locality')) || {};

        const { geometry: { location } } = places;
        const { lat, lng } = location;

        const data = {
            ...locationValuesGlobal,
            street_name: street_name || "",
            area: area,
            pincode: pincode?.long_name,
            latitude: lat(),
            longitude: lng(),
            address: name,
            city: city,
            state: state,
            country: country,
            formatted_address: formatted_address,
            place_id: places?.place_id
        }

        dispatch(setlLocationValuesGlobal(data))
    }


    const selectLocation = (item) => {
        dispatch(setSelectedLocation(item));
        dispatch(setManualLocation(item.description));
        dispatch(setLocationPlaceId(item?.place_id));
    }

    return {  manualLocation, isPlacePredictionsLoading, selectedLocation, placePredictions, getPlacePredictions, selectLocation }
}

export default useGetLocationResults