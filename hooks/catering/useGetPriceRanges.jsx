import { api, BASE_URL } from '@/api/apiConfig';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

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

const useGetPriceRanges = () => {
    const accessToken = useSelector((state) => state.user.accessToken)
    // const [getPriceRanges, setGetPriceRanges] = useState([]); // d
    const [getFoodTypes, setGetFoodTypes] = useState([]); // d
    const [getOccasionTypes, setGetOccasionTypes] = useState([]); // d
    const [getCuisines, setGetCuisines] = useState([]); // d
    const [getServiceTypes, setGetServiceTypes] = useState([]); // d
    const [getServingTypes, setGetServingTypes] = useState([]); // d
    const [getSearchCards, setSearchCards] = useState([]); //d
    const [showAllOccasions, setShowAllOccasions] = useState(5)
    const [occationsCount, setoccasionCount] = useState(null)
    const [loading, setLoading] = useState(false)

    // filters 
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

     // people 
     const [people, setPeople] = useState("")
     // select location 
     const [locationValues, setLocationValues] = useState(initialState)
     const [locationPlaceId, setLocationPlaceId] = useState(null)
     const [manualLocation, setManualLocation] = useState("")
     const [selectedLocation, setSelectedLocation] = useState(null);
 
    //  console.log(locationValues, "locationValues locationValues");
    //  console.log(people, "people people");

     
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

        setLocationValues({
            ...locationValues,
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
        })
    }


    const selectLocation = (item) => {
        setSelectedLocation(item);
        setManualLocation(item.description);
        setLocationPlaceId(item?.place_id)
    }


    // const fetchPriceRanges = async () => {
    //     try {
    //         const response = await api.get(`${BASE_URL}/get-all-price-ranges?current_page=1&limit=10`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             }
    //         })
    //         setGetPriceRanges(response?.data?.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchPriceRanges()
    // }, [])


    const fetchFoodTypes = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-food-types?current_page=1&limit=2`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setGetFoodTypes(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFoodTypes()
    }, [])

    const fetchGetCuisines = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-cuisines`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setGetCuisines(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGetCuisines()
    }, [])

    const fetchOccasionTypes = async () => {
        setLoading(true)
        try {
            const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=${showAllOccasions}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setoccasionCount(response?.data?.total_count)
            setGetOccasionTypes(response?.data?.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOccasionTypes()
    }, [showAllOccasions])

    const fetchServiceTypes = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=2&vendor_type=Tiffin`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setGetServiceTypes(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchServiceTypes()
    }, [])


    const fetchServingTypes = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-serving-types?current_page=1&limit=2`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setGetServingTypes(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchServingTypes()
    }, [])

    // Occasions Show All 
    const onShowAllOccasions = () => {
        setShowAllOccasions(occationsCount)
    }

    // Food type Filter 
    const updateFoodTypeFilter = (item) => {
        const newFoodTypes = getFoodTypes.map((foodType) => {
            if (foodType.id === item.id) {
                return { ...foodType, selected: item.selected === "1" ? "0" : "1" };
            } else {
                return foodType;
            }
        });
        setGetFoodTypes(newFoodTypes);
        fetchSearchCards();
    };

    // Price range filter  start
    const isChecked = (price) => {
        return selectedPriceRanges.some(range => areEqualRanges(range, price));
    }

    const updatePriceRangesFilter = (price) => {
        const isSelected = isChecked(price);
        setSelectedPriceRanges(prevRanges =>
            isSelected
                ? prevRanges.filter(range => !areEqualRanges(range, price))
                : [...prevRanges, price]
        );
    }

    const areEqualRanges = (range1, range2) => {
        return range1.start_price === range2.start_price && range1.end_price === range2.end_price;
    }

    const formattedPriceRanges = selectedPriceRanges.map(range => ({
        start_price: range.start_price,
        end_price: range.end_price
    }));

    // Price range filter end 

    const fetchSearchCards = async () => {
        setLoading(true)
        try {

            const foodTypesFilter = getFoodTypes?.map(foodType => ({
                id: foodType.id,
                selected: foodType.selected === "1" ? 1 : 0
            }));

            // `https://api.cateringsandtiffins.in/search-vendors?order_by=distance&limit=100&current_page=1&occasions_filter=[{"id":1,"selected":0},{"id":2,"selected":1},{"id":3,"selected":1}]&serving_types_filter=[{"id":1,"selected":1},{"id":2,"selected":0}]&food_types_filter=[{"id":1,"selected":1},{"id":2,"selected":0}]&price_ranges= [{"start_price" :100,"end_price" :2500}] &latitude=12.9359&longitude=77.7005&city=Bangalore&pincode=560085&place_id=111222&start_date=2024-05-01&end_date=2024-05-05&search_term=200`

            const response = await api.get(`${BASE_URL}/search-vendors?order_by=distance&limit=100&current_page=1&food_types_filter=${JSON.stringify(foodTypesFilter)}&price_ranges=${JSON.stringify(formattedPriceRanges)}&latitude=12.9359&longitude=77.7005&city=Bangalore&pincode=560085&place_id=111222&start_date=2024-05-01&end_date=2024-05-05&search_term=200`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setSearchCards(response?.data?.data?.vendors);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSearchCards()
    }, [selectedPriceRanges])

    return {
        //  getPriceRanges, 
        getFoodTypes, getOccasionTypes, getCuisines, getServiceTypes, getServingTypes, getSearchCards, showAllOccasions, setShowAllOccasions, occationsCount, setoccasionCount, loading, setGetFoodTypes, fetchSearchCards, onShowAllOccasions, updateFoodTypeFilter, isChecked, updatePriceRangesFilter,  manualLocation, isPlacePredictionsLoading, placePredictions, setSelectedLocation, selectedLocation, people, setPeople, setManualLocation, getPlacePredictions, selectLocation  }
}

export default useGetPriceRanges