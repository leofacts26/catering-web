import { api, BASE_URL } from '@/api/apiConfig';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useGetPriceRanges = () => {
    const accessToken = useSelector((state) => state.user.accessToken)
    const [getPriceRanges, setGetPriceRanges] = useState([]);
    const [getFoodTypes, setGetFoodTypes] = useState([]);
    const [getOccasionTypes, setGetOccasionTypes] = useState([]);
    const [getCuisines, setGetCuisines] = useState([]);
    const [getServiceTypes, setGetServiceTypes] = useState([]);
    const [getServingTypes, setGetServingTypes] = useState([]);
    const [getSearchCards, setSearchCards] = useState([]);
    const [showAllOccasions, setShowAllOccasions] = useState(5)
    const [occationsCount, setoccasionCount] = useState(null)
    const [loading, setLoading] = useState(false)

    // filters 
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);


    const fetchPriceRanges = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-price-ranges?current_page=1&limit=10`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            setGetPriceRanges(response?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPriceRanges()
    }, [])


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
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=2`, {
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

    return { getPriceRanges, getFoodTypes, getOccasionTypes, getCuisines, getServiceTypes, getServingTypes, getSearchCards, showAllOccasions, setShowAllOccasions, occationsCount, setoccasionCount, loading, setGetFoodTypes, fetchSearchCards, isChecked, updatePriceRangesFilter }
}

export default useGetPriceRanges