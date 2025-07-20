import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import moment from 'moment';


const initialState = {
    isLoading: false,
    getCateringPriceRanges: [],
    getCateringHeadCount: [],
    getCateringFoodTypes: [],
    getOccasionCateringTypes: [],
    getCateringCuisines: [],
    getCateringServiceTypes: [],
    getCateringRatings: [],
    getCateringServingTypes: [],
    getCateringSearchCards: [],
    getCateringMapviewSearchCards: [],
    occasionCount: 5,
    occasionTotalCount: 5,
    cateringSortBy: [],
    getAllSortOrders: [],
    subscriptionTypes: [],
    current_page: 1,
    limit: 50,
    total_count: null,
    // detail page 
    getCateringSimilarTypes: [],
    // Global Nav 
    startDate: new Date(),
    endDate: new Date(),
    people: "",
    locationPlaceId: null,
    manualLocation: "",
    selectedLocation: "",
    locationValuesGlobal: {},
    similarCatererData: {},
    // Filters 
    // left filters  
    // selectedPriceRanges: [],
}



export const fetchPriceRanges = createAsyncThunk(
    'user/fetchPriceRanges',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-price-ranges?current_page=1&limit=10&vendor_type=Caterer`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const fetchHeadCounts = createAsyncThunk(
    'user/fetchHeadCounts',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-head-count-ranges?current_page=1&limit=10`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCateringFoodTypes = createAsyncThunk(
    'user/fetchCateringFoodTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-food-types?current_page=1&limit=3`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchOccasionCateringTypes = createAsyncThunk(
    'user/fetchOccasionCateringTypes',
    async (occasionCount, thunkAPI) => {
        // console.log(occasionCount, "occasionCount gbhty");
        try {
            const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=100`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            // console.log(response, "response");
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCateringCuisines = createAsyncThunk(
    'user/fetchCateringCuisines',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-cuisines`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchServiceTypes = createAsyncThunk(
    'user/fetchServiceTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=2&vendor_type=Caterer`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCaterRatings = createAsyncThunk(
    'user/fetchCaterRatings',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-ratings?limit=10&current_page=1`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCateringServingTypes = createAsyncThunk(
    'user/fetchCateringServingTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-serving-types?current_page=1&limit=2`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchGetAllSortOrders = createAsyncThunk(
    'user/fetchGetAllSortOrders',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-sort-orders?limit=10&current_page=1`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchGetAllSubscriptionTypes = createAsyncThunk(
    'user/fetchGetAllSubscriptionTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-subscription-types?current_page=1&limit=2&vendor_type=Caterer`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.subscription_types;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const createUserEnquiry = createAsyncThunk(
    'user/createUserEnquiry',
    async (data, thunkAPI) => {
        const { area, vendorId, branchId } = data;
        // console.log(thunkAPI.getState(), "State in thunkAPI");

        const getCateringCuisines = thunkAPI.getState().cateringFilter?.getCateringCuisines;
        const getCateringServiceTypes = thunkAPI.getState().cateringFilter?.getCateringServiceTypes;
        const getOccasionCateringTypes = thunkAPI.getState().cateringFilter?.getOccasionCateringTypes;
        const getCateringServingTypes = thunkAPI.getState().cateringFilter?.getCateringServingTypes;
        const getCateringFoodTypes = thunkAPI.getState().cateringFilter?.getCateringFoodTypes;
        const getCateringHeadCount = thunkAPI.getState().cateringFilter?.getCateringHeadCount;
        const getCateringPriceRanges = thunkAPI.getState().cateringFilter?.getCateringPriceRanges;
        const subscriptionTypes = thunkAPI.getState().cateringFilter?.subscriptionTypes;

        // cuisinetype_filter_formatted 
        function extractChildrenData(data) {
            return data.flatMap(item => item.children.map(({ id, selectedweb }) => ({ id: Number(id), selected: selectedweb })));
        }
        function extractParentData(data) {
            return data.map(({ id, selectedweb }) => ({ id: Number(id), selected: selectedweb }))
        }
        const cuisinetype_filter_Data = extractChildrenData(getCateringCuisines);
        const cuisinetype_filter_Parent_Data = extractParentData(getCateringCuisines);
        const finalCuisineresult = [...cuisinetype_filter_Data, ...cuisinetype_filter_Parent_Data]
        // service_filter_formatted
        const service_filter_formatted = getCateringServiceTypes.map(service => ({
            id: service.id,
            selected: service.selectedweb
        }));
        // occasions_filter_formatted 
        const occasions_filter_formatted_selected = getOccasionCateringTypes?.filter(occasion => occasion?.selectedweb === 1);
        const occasions_filter_formatted = occasions_filter_formatted_selected.map(occasion => ({
            id: Number(occasion.occasion_id),
            selected: occasion.selectedweb
        }));
        // serving_filter_formatted 
        const serving_filter_formatted = getCateringServingTypes.map(serving => ({
            id: Number(serving.id),
            selected: serving.selectedweb
        }))
        // foodtype_filter_formatted 
        const foodtype_filter_formatted = getCateringFoodTypes.filter(item => item.id !== "1").map(foodType => ({
            id: foodType.id,
            selected: foodType.selectedweb
        }))
        // headcount_filter_formatted 
        const selectedHeadcountRanges = getCateringHeadCount?.filter(headcount => headcount?.selectedweb === 1);
        const updatedHeadcount_formatted = selectedHeadcountRanges.map(headcount => {
            return { id: Number(headcount.id), start: parseFloat(headcount.start), end: parseFloat(headcount.end) };
        });
        // pricetype_filter_formatted 
        const selectedPriceRanges = getCateringPriceRanges?.filter(price => price?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges.map(price => {
            return { id: Number(price.id), start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) };
        });
        // subscription_Types_formatted 
        const subscriptionTypes_formatted = subscriptionTypes.map(subscriptionType => ({
            subscription_type_id: Number(subscriptionType.id),
            selected: subscriptionType.selectedweb
        }))


        const body = {
            vendor_id: vendorId,
            branch_id: branchId,
            description: "N/A",
            cuisines_filter: `${JSON.stringify(finalCuisineresult)}`,
            service_types_filter: `${JSON.stringify(service_filter_formatted)}`,
            occasions_filter: `${JSON.stringify(occasions_filter_formatted)}`,
            serving_types_filter: `${JSON.stringify(serving_filter_formatted)}`,
            food_types_filter: `${JSON.stringify(foodtype_filter_formatted)}`,
            head_count_ranges_filter: `${JSON.stringify(updatedHeadcount_formatted)}`,
            meal_times_filter: `${JSON.stringify([{ "id": 1, "selected": 1 }])}`,
            price_ranges_filter: `${JSON.stringify(updatedPriceTypes_formatted)}`,
            kitchen_types_filter: `${JSON.stringify([{ "id": 1, "selected": 1 }])}`,
            subscription_types_filter: `${JSON.stringify(subscriptionTypes_formatted)}`,
            area: area
        }
        // console.log(body, "body");

        try {
            const response = await api.post(`${BASE_URL}/user-create-new-enquiry`, body, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            console.log(response, "response");
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCateringSearchCards = createAsyncThunk(
    'user/fetchCateringSearchCards',
    async (data, thunkAPI) => {
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const vendorSearch = thunkAPI.getState().globalnavbar?.vendorSearch;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const vendorlistitem = thunkAPI.getState().globalnavbar?.vendorlistitem;
        const cateringSortBy = thunkAPI.getState().cateringFilter?.cateringSortBy;
        const getCateringPriceRanges = thunkAPI.getState().cateringFilter?.getCateringPriceRanges;
        const getCateringHeadCount = thunkAPI.getState().cateringFilter?.getCateringHeadCount;
        const getCateringFoodTypes = thunkAPI.getState().cateringFilter?.getCateringFoodTypes;
        const getCateringServingTypes = thunkAPI.getState().cateringFilter?.getCateringServingTypes;
        const getCateringServiceTypes = thunkAPI.getState().cateringFilter?.getCateringServiceTypes;
        const getCateringRatings = thunkAPI.getState().cateringFilter?.getCateringRatings;
        const getCateringCuisines = thunkAPI.getState().cateringFilter?.getCateringCuisines;
        const getOccasionCateringTypes = thunkAPI.getState().cateringFilter?.getOccasionCateringTypes;
        const subscriptionTypes = thunkAPI.getState().cateringFilter?.subscriptionTypes;
        const current_page = thunkAPI.getState().cateringFilter?.current_page;
        const limit = thunkAPI.getState().cateringFilter?.limit;

        const extractChildrenData = (data) =>
            data.flatMap(item => item.children.map(({ id, selectedweb }) => ({ id: Number(id), selected: selectedweb })));
        const extractParentData = (data) =>
            data.map(({ id, selectedweb }) => ({ id: Number(id), selected: selectedweb }));

        const finalCuisineresult = [
            ...extractChildrenData(getCateringCuisines),
            ...extractParentData(getCateringCuisines)
        ];

        const service_filter_formatted = getCateringServiceTypes.map(service => ({
            id: service.id,
            selected: service.selectedweb
        }));

        const occasions_filter_formatted = getOccasionCateringTypes
            ?.filter(occasion => occasion?.selectedweb === 1)
            .map(occasion => ({
                id: Number(occasion.occasion_id),
                selected: occasion.selectedweb
            }));

        const rating_filter_formatted = getCateringRatings.map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));

        const serving_filter_formatted = getCateringServingTypes.map(serving => ({
            id: Number(serving.id),
            selected: serving.selectedweb
        }));

        const foodtype_filter_formatted = getCateringFoodTypes
            .filter(item => item.id !== "1")
            .map(foodType => ({
                id: foodType.id,
                selected: foodType.selectedweb
            }));

        const subscriptionTypes_formatted = subscriptionTypes.map(subscriptionType => ({
            subscription_type_id: Number(subscriptionType.id),
            selected: subscriptionType.selectedweb
        }));

        const updatedPriceTypes_formatted = getCateringPriceRanges
            ?.filter(price => price?.selectedweb === 1)
            .map(price => ({
                id: Number(price.id),
                start_price: parseFloat(price.start_price),
                end_price: parseFloat(price.end_price)
            }));

        const updatedHeadcount_formatted = getCateringHeadCount
            ?.filter(headcount => headcount?.selectedweb === 1)
            .map(headcount => ({
                id: Number(headcount.id),
                start: parseFloat(headcount.start),
                end: parseFloat(headcount.end)
            }));

        const body = {
            search_term: vendorSearch,
            selected_vendor: vendorlistitem,
            order_by: "distance",
            limit: current_page * limit,
            current_page,
            save_filter: 1,
            vendor_type: "Caterer",
            app_type: "web",
            order_by_filter: JSON.stringify(cateringSortBy),
            occasions_filter: JSON.stringify(occasions_filter_formatted),
            food_types_filter: JSON.stringify(foodtype_filter_formatted),
            head_count_ranges: JSON.stringify(updatedHeadcount_formatted),
            price_ranges: JSON.stringify(updatedPriceTypes_formatted),
            subscription_types_filter: JSON.stringify(subscriptionTypes_formatted),
            cuisines_filter: JSON.stringify(finalCuisineresult),
            serving_types_filter: JSON.stringify(serving_filter_formatted),
            is_city_search: "1",
            ratings_filter: JSON.stringify(rating_filter_formatted),
            service_types_filter: JSON.stringify(service_filter_formatted),
            latitude: locationValuesGlobal?.latitude || "",
            longitude: locationValuesGlobal?.longitude || "",
            city: locationValuesGlobal?.city?.long_name || "",
            pincode: locationValuesGlobal?.pincode || "",
            place_id: locationValuesGlobal?.place_id || '',
            start_date: moment(startDate).format('YYYY-MM-DD'),
            end_date: moment(endDate).format('YYYY-MM-DD')
        };

        try {
            const response = await api.post(`${BASE_URL}/search-vendors`, body, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);



export const fetchCateringMapviewSearchCards = createAsyncThunk(
    'user/fetchCateringMapviewSearchCards',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const {
            startDate,
            endDate,
            vendorSearch,
            locationValuesGlobal,
            vendorlistitem
        } = state.globalnavbar;

        const {
            cateringSortBy,
            getCateringPriceRanges,
            getCateringHeadCount,
            getCateringFoodTypes,
            getCateringServingTypes,
            getCateringServiceTypes,
            getCateringRatings,
            getCateringCuisines,
            getOccasionCateringTypes,
            subscriptionTypes,
            current_page,
            limit
        } = state.cateringFilter;

        const cateringSortBy_filter = JSON.stringify(cateringSortBy || []);

        const occasions_filter_formatted = (getOccasionCateringTypes || [])
            .filter(o => o?.selectedweb === 1)
            .map(o => ({ id: Number(o.occasion_id), selected: o.selectedweb }));

        const extractChildrenData = data =>
            data.flatMap(item => item.children.map(({ id, selectedweb }) => ({
                id: Number(id), selected: selectedweb
            })));

        const extractParentData = data =>
            data.map(({ id, selectedweb }) => ({ id: Number(id), selected: selectedweb }));

        const finalCuisineresult = [
            ...extractChildrenData(getCateringCuisines || []),
            ...extractParentData(getCateringCuisines || [])
        ];

        const service_filter_formatted = (getCateringServiceTypes || []).map(service => ({
            id: service.id,
            selected: service.selectedweb
        }));

        const rating_filter_formatted = (getCateringRatings || []).map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));

        const serving_filter_formatted = (getCateringServingTypes || []).map(serving => ({
            id: Number(serving.id),
            selected: serving.selectedweb
        }));

        const foodtype_filter_formatted = (getCateringFoodTypes || [])
            .filter(item => item.id !== "1")
            .map(foodType => ({
                id: foodType.id,
                selected: foodType.selectedweb
            }));

        const subscriptionTypes_formatted = (subscriptionTypes || []).map(sub => ({
            subscription_type_id: Number(sub.id),
            selected: sub.selectedweb
        }));

        const selectedPriceRanges = (getCateringPriceRanges || []).filter(p => p?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges.map(p => ({
            id: Number(p.id),
            start_price: parseFloat(p.start_price),
            end_price: parseFloat(p.end_price)
        }));

        const selectedHeadcountRanges = (getCateringHeadCount || []).filter(h => h?.selectedweb === 1);
        const updatedHeadcount_formatted = selectedHeadcountRanges.map(h => ({
            id: Number(h.id),
            start: parseFloat(h.start),
            end: parseFloat(h.end)
        }));

        try {
            const response = await api.post(`${BASE_URL}/search-vendors`, {
                search_term: vendorSearch || '',
                selected_vendor: vendorlistitem || '',
                order_by: 'distance',
                limit: current_page * limit,
                save_filter: 1,
                vendor_type: 'Caterer',
                app_type: 'web',
                order_by_filter: cateringSortBy_filter,
                occasions_filter: JSON.stringify(occasions_filter_formatted),
                food_types_filter: JSON.stringify(foodtype_filter_formatted),
                head_count_ranges: JSON.stringify(updatedHeadcount_formatted),
                price_ranges: JSON.stringify(updatedPriceTypes_formatted),
                subscription_types_filter: JSON.stringify(subscriptionTypes_formatted),
                cuisines_filter: JSON.stringify(finalCuisineresult),
                serving_types_filter: JSON.stringify(serving_filter_formatted),
                is_city_search: "1",
                ratings_filter: JSON.stringify(rating_filter_formatted),
                service_types_filter: JSON.stringify(service_filter_formatted),
                latitude: locationValuesGlobal?.latitude || "",
                longitude: locationValuesGlobal?.longitude || "",
                city: locationValuesGlobal?.city?.long_name || "",
                pincode: locationValuesGlobal?.pincode || "",
                place_id: locationValuesGlobal?.place_id || '',
                start_date: moment(startDate).format('YYYY-MM-DD'),
                end_date: moment(endDate).format('YYYY-MM-DD')
            }, {
                headers: {
                    authorization: `Bearer ${state?.user?.accessToken}`,
                },
            });

            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg || "Something went wrong");
        }
    }
);


export const fetchCatererSimilarCaterer = createAsyncThunk(
    'user/fetchCatererSimilarCaterer',
    async (data, thunkAPI) => {
        const state = thunkAPI.getState();
        const startDate = state.globalnavbar?.startDate;
        const endDate = state.globalnavbar?.endDate;

        const foodtype_filter_formatted = (data?.foodTypes || [])
            .filter(item => item.id !== "1")
            .map(foodType => ({
                id: foodType.id,
                selected: foodType.selectedweb ? 1 : 0
            }));

        try {
            const response = await api.post(
                `${BASE_URL}/search-vendors`,
                {
                    is_city_search: 1,
                    search_term: "",
                    order_by: "distance",
                    limit: 100,
                    save_filter: 1,
                    vendor_type: "Caterer",
                    app_type: "web",
                    latitude: data?.latitude || "",
                    longitude: data?.longitude || "",
                    city: data?.city || "",
                    pincode: data?.pincode || "",
                    place_id: data?.place_id || "",
                    food_types_filter: JSON.stringify(foodtype_filter_formatted),
                    start_date: moment(startDate).format('YYYY-MM-DD'),
                    end_date: moment(endDate).format('YYYY-MM-DD'),
                    shuffled: 1
                },
                {
                    headers: {
                        authorization: `Bearer ${state?.user?.accessToken}`,
                    },
                }
            );

            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg || "Something went wrong");
        }
    }
);


export const cateringFilterSlice = createSlice({
    name: 'cateringFilter',
    initialState,
    reducers: {
        resetFilters: () => initialState,
        incrementPage(state) {
            state.current_page += 1;
        },

        setShowAllOccasions: (state, action) => {
            state.occasionCount = action.payload;
        },

        setCurrentPage: (state, action) => {
            state.current_page = action.payload;
        },

        setSimilarCatererData: (state, action) => {
            state.similarCatererData = action.payload;
        },


        // setPeople: (state, action) => {
        //     state.people = action.payload;
        // },
        // setLocationPlaceId(state, action) {
        //     state.locationPlaceId = action.payload;
        // },
        // setManualLocation(state, action) {
        //     state.manualLocation = action.payload;
        // },
        // setSelectedLocation(state, action) {
        //     state.selectedLocation = action.payload;
        // },
        // setlLocationValuesGlobal: (state, action) => {
        //     state.locationValuesGlobal = action.payload;
        // },
        // setStartDate(state, action) {
        //     state.startDate = action.payload;
        // },
        // setEndDate(state, action) {
        //     state.endDate = action.payload;
        // },
        // setDateRange(state, action) {
        //     state.startDate = action.payload.startDate;
        //     state.endDate = action.payload.endDate;
        // },
        setCuisineTypeFilter: (state, action) => {
            // console.log(action, "action");
            const { cuisineId, getCateringCuisines, forceSelect } = action.payload;
            const updatedCuisines = getCateringCuisines.map((cuisine) => {
                if (forceSelect) {
                    // If forceSelect, select parent and all children if parent matches
                    if (cuisine.id === cuisineId) {
                        // Parent match: select parent and all children
                        return {
                            ...cuisine,
                            selectedweb: 1,
                            children: cuisine.children.map(child => ({ ...child, selectedweb: 1 }))
                        };
                    } else {
                        // Check children: only select the matching child
                        return {
                            ...cuisine,
                            selectedweb: 0,
                            children: cuisine.children.map(child =>
                                child.id === cuisineId ? { ...child, selectedweb: 1 } : { ...child, selectedweb: 0 }
                            )
                        };
                    }
                } else {
                    if (cuisine.id === cuisineId) {
                        // Toggle selected of parent cuisine
                        const updatedCuisine = {
                            ...cuisine,
                            selectedweb: cuisine.selectedweb === 1 ? 0 : 1
                        };
                        // Toggle selected of all children based on parent's selected
                        const updatedChildren = updatedCuisine.children.map(childCuisine => ({
                            ...childCuisine,
                            selectedweb: updatedCuisine.selectedweb
                        }));
                        return {
                            ...updatedCuisine,
                            children: updatedChildren
                        };
                    } else {
                        // If the selected cuisine is a child, update its selected directly
                        return {
                            ...cuisine,
                            children: cuisine.children.map(childCuisine => {
                                if (childCuisine.id === cuisineId) {
                                    return {
                                        ...childCuisine,
                                        selectedweb: childCuisine.selectedweb === 1 ? 0 : 1
                                    };
                                }
                                return childCuisine;
                            })
                        };
                    }
                }
            });
            state.getCateringCuisines = updatedCuisines;
        },
        setOccasionTypes: (state, action) => {
            // Support both: payload = { occasionId, getOccasionCateringTypes, forceSelect }
            const { occasionId, getOccasionCateringTypes, forceSelect } = action.payload;
            const updatedOccasions = getOccasionCateringTypes?.map((occasion) => {
                // Compare as string for robust query param matching
                if (String(occasion.occasion_id) === String(occasionId)) {
                    if (forceSelect) {
                        return { ...occasion, selectedweb: 1 };
                    } else {
                        return { ...occasion, selectedweb: occasion.selectedweb === 1 ? 0 : 1 };
                    }
                } else {
                    return occasion;
                }
            });
            state.getOccasionCateringTypes = updatedOccasions;
        },
        setServiceTypesFilter: (state, action) => {
            const updatedServiceTypes = state.getCateringServiceTypes.map((serviceType) => {
                if (serviceType.id === action.payload) {
                    return { ...serviceType, selectedweb: serviceType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return serviceType;
                }
            })
            state.getCateringServiceTypes = updatedServiceTypes;
        },
        setRatingTypesFilter: (state, action) => {
            const updatedRatingTypes = state.getCateringRatings.map((getRatingType) => {
                if (getRatingType.rating === action.payload) {
                    return { ...getRatingType, selectedweb: getRatingType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return getRatingType;
                }
            })
            state.getCateringRatings = updatedRatingTypes;
        },
        setServingTypesFilter: (state, action) => {
            const updatedServingTypes = state.getCateringServingTypes.map((servingType) => {
                if (servingType.id === action.payload) {
                    return { ...servingType, selectedweb: servingType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return servingType;
                }
            })
            state.getCateringServingTypes = updatedServingTypes;
        },
        setFoodTypeFilter: (state, action) => {
            const updatedFoodTypes = state.getCateringFoodTypes.map((foodType) => {
                if (foodType.id === action.payload) {
                    return { ...foodType, selectedweb: foodType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return foodType;
                }
            })
            state.getCateringFoodTypes = updatedFoodTypes;
        },
        setPriceTypeFilter: (state, action) => {
            const updatedPriceRanges = state.getCateringPriceRanges.map((priceRange) => {
                if (priceRange.id === action.payload) {
                    return { ...priceRange, selectedweb: priceRange.selectedweb === 1 ? 0 : 1 }
                } else {
                    return priceRange;
                }
            })

            state.getCateringPriceRanges = updatedPriceRanges;
        },
        setHeadcountTypeFilter: (state, action) => {
            const updatedHeadcountRanges = state.getCateringHeadCount.map((headCount) => {
                if (headCount.id === action.payload) {
                    return { ...headCount, selectedweb: headCount.selectedweb === 1 ? 0 : 1 }
                } else {
                    return headCount;
                }
            })

            state.getCateringHeadCount = updatedHeadcountRanges;
        },
        setSubscriptionFilter: (state, action) => {
            const { id, subscriptionTypes } = action.payload;

            const updatedSubscriptionFilter = subscriptionTypes?.map(subscription => {
                if (subscription.id === id) {
                    if (subscription.selectedweb === 1) {
                        return subscription;
                    }
                    return {
                        ...subscription,
                        selectedweb: subscription.selectedweb === 1 ? 0 : 1
                    };
                } else if (["13", "2", "3"].includes(id)) {
                    return {
                        ...subscription,
                        selectedweb: 0
                    };
                } else if (id === "9999") {
                    return {
                        ...subscription,
                        selectedweb: subscription.id === "9999" ? 1 : 0
                    };
                } else {
                    return subscription;
                }
            });

            // const updatedSubscriptionFilter = subscriptionTypes.map(subscription => {
            //     if (Number(subscription.id) === Number(id)) {
            //         return {
            //             ...subscription,
            //             selectedweb: subscription.selectedweb === 1 ? 0 : 1
            //         };
            //     } else if ([2, 3].includes(id)) {
            //         return {
            //             ...subscription,
            //             selectedweb: 0
            //         };
            //     } else if (id === "9999") {
            //         return {
            //             ...subscription,
            //             selectedweb: subscription.id === "9999" ? 1 : 0
            //         };
            //     } else {
            //         return subscription;
            //     }
            // });

            state.subscriptionTypes = updatedSubscriptionFilter;
        },
        setCateringSort: (state, action) => {
            state.cateringSortBy = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchPriceRanges 
            .addCase(fetchPriceRanges.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPriceRanges.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getCateringPriceRanges = payload;
                const persisted = state.getCateringPriceRanges || [];
                state.getCateringPriceRanges = payload.map(apiItem => {
                    const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                    return persistedItem
                        ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                        : apiItem;
                });
            })
            .addCase(fetchPriceRanges.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchHeadCounts 
            .addCase(fetchHeadCounts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchHeadCounts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringHeadCount = payload;
            })
            .addCase(fetchHeadCounts.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCateringFoodTypes
            .addCase(fetchCateringFoodTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringFoodTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getCateringFoodTypes = payload;
                const persisted = state.getCateringFoodTypes || [];
                state.getCateringFoodTypes = payload.map(apiItem => {
                    const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                    return persistedItem
                        ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                        : apiItem;
                });
            })
            .addCase(fetchCateringFoodTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchOccasionCateringTypes
            .addCase(fetchOccasionCateringTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOccasionCateringTypes.fulfilled, (state, { payload }) => {
                // state.isLoading = false;
                // state.occasionCount = payload.total_count;
                // state.occasionTotalCount = payload.total_count;
                // state.getOccasionCateringTypes = payload.data;
                state.isLoading = false;
                state.occasionCount = payload.total_count;
                state.occasionTotalCount = payload.total_count;
                // Merge persisted selections with new API data
                const persisted = state.getOccasionCateringTypes || [];
                state.getOccasionCateringTypes = payload.data.map(apiItem => {
                    const persistedItem = persisted.find(p => String(p.occasion_id) === String(apiItem.occasion_id));
                    return persistedItem
                        ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                        : apiItem;
                });
            })
            .addCase(fetchOccasionCateringTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCateringCuisines 
            .addCase(fetchCateringCuisines.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringCuisines.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getCateringCuisines = payload;
                const persisted = state.getCateringCuisines || [];
                state.getCateringCuisines = payload.map(apiItem => {
                    const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                    if (persistedItem) {
                        // Merge selectedweb for parent
                        let merged = { ...apiItem, selectedweb: persistedItem.selectedweb };
                        // Merge children selections if children exist
                        if (Array.isArray(apiItem.children) && Array.isArray(persistedItem.children)) {
                            merged.children = apiItem.children.map(child => {
                                const persistedChild = persistedItem.children.find(pc => String(pc.id) === String(child.id));
                                return persistedChild
                                    ? { ...child, selectedweb: persistedChild.selectedweb }
                                    : child;
                            });
                        }
                        return merged;
                    }
                    return apiItem;
                });
            })
            .addCase(fetchCateringCuisines.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchServiceTypes 
            .addCase(fetchServiceTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchServiceTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringServiceTypes = payload;
            })
            .addCase(fetchServiceTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCaterRatings 
            .addCase(fetchCaterRatings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCaterRatings.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringRatings = payload;
            })
            .addCase(fetchCaterRatings.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCateringServingTypes
            .addCase(fetchCateringServingTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringServingTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringServingTypes = payload;
            })
            .addCase(fetchCateringServingTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // getCateringSearchCards
            .addCase(fetchCateringSearchCards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringSearchCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getCateringSearchCards = action.payload.vendors;
                state.limit = action.payload.limit;
                state.current_page = action.payload.current_page;
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchCateringSearchCards.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchCateringMapviewSearchCards 
            .addCase(fetchCateringMapviewSearchCards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringMapviewSearchCards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getCateringMapviewSearchCards = action.payload.vendors;
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchCateringMapviewSearchCards.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchGetAllSortOrders
            .addCase(fetchGetAllSortOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetAllSortOrders.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getAllSortOrders = payload;
            })
            .addCase(fetchGetAllSortOrders.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchGetAllSubscriptionTypes 
            .addCase(fetchGetAllSubscriptionTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetAllSubscriptionTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.subscriptionTypes = payload;
            })
            .addCase(fetchGetAllSubscriptionTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchCatererSimilarCaterer 
            .addCase(fetchCatererSimilarCaterer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCatererSimilarCaterer.fulfilled, (state, action) => {
                console.log(action, "actionactionaction");

                state.isLoading = false;
                state.getCateringSimilarTypes = action.payload.vendors;
            })
            .addCase(fetchCatererSimilarCaterer.rejected, (state, { payload }) => {
                state.isLoading = false;
            })

    }
})

// Action creators are generated for each case reducer function
export const {
    resetFilters,
    setShowAllOccasions,
    getAllSortOrders,
    subscriptionTypes,
    setOccasionTypes,
    incrementPage,
    setCurrentPage,

    // setPeople,
    // people,
    // setSelectedLocation,
    // setManualLocation,
    // setLocationPlaceId,
    // setlLocationValuesGlobal,
    // locationPlaceId,
    // manualLocation,
    // selectedLocation,
    // setStartDate,
    // setEndDate,
    // setDateRange,

    setRatingTypesFilter,
    setServiceTypesFilter,
    setServingTypesFilter,
    servingFilters,
    setFoodTypeFilter,
    foodtypeFilters,
    setPriceTypeFilter,
    setHeadcountTypeFilter,
    setCuisineTypeFilter,
    setCateringSort,
    setSubscriptionFilter,
    setSimilarCatererData
} = cateringFilterSlice.actions

export default cateringFilterSlice.reducer
