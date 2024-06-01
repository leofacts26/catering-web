import { setlLocationValuesGlobal } from '@/app/features/user/cateringFilterSlice';
import React, { useEffect, useState } from 'react'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useDispatch, useSelector } from 'react-redux';


const initialState = {
    street_name: '',
    area: '',
    pincode: '',
    latitude: '',
    longitude: '',
    address: '',
    city: '',
    state: '',
    country: '',
    formatted_address: '',
    place_id: '',
}


const useGetLocationResults = () => {

    // const {  } = useSelector((state) => state.cateringFilter)
    const dispatch = useDispatch()
    const { locationValuesGlobal } = useSelector((state) => state.cateringFilter);

    // select location 
    // const [locationValues, setLocationValues] = useState(initialState)
    const [locationPlaceId, setLocationPlaceId] = useState(null)
    const [manualLocation, setManualLocation] = useState("")
    const [selectedLocation, setSelectedLocation] = useState(null);



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
        setSelectedLocation(item);
        setManualLocation(item.description);
        setLocationPlaceId(item?.place_id)
    }

    return {  manualLocation, isPlacePredictionsLoading, setSelectedLocation, selectedLocation, placePredictions, setManualLocation, getPlacePredictions, selectLocation }
}

export default useGetLocationResults