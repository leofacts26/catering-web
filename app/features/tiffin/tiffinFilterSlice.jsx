import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import moment from 'moment';


const initialState = {
    isLoading: false,
    // filters 
    getTiffinPriceRanges: [],
    getTiffinFoodTypes: [],
    getTiffinMealTypes: [],
    getTiffinServiceTypes: [],
    getTiffinKitchenTypes: [],
    tiffinSubscriptionTypes: [],
    tiffinSortBy: [],
    getTiffinRatings: [],

    // detail page 
    getTiffinSimilarTypes: [],

    // listview 
    getTiffinSearchCards: [],
    getTiffinMapviewSearchCards: [],

    similarCatererTiffinData: {},

    // filter 
    current_page: 1,
    limit: 30,
    total_count: null,

}




export const fetchTiffinPriceRanges = createAsyncThunk(
    'user/fetchTiffinPriceRanges',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-price-ranges?current_page=1&limit=10&vendor_type=Tiffin`, {
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

export const fetchTiffinFoodTypes = createAsyncThunk(
    'user/fetchTiffinFoodTypes',
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


export const fetchTiffinRatings = createAsyncThunk(
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



export const fetchTiffinMealTypes = createAsyncThunk(
    'user/fetchTiffinMealTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-meal-times?current_page=1&limit=20`, {
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

export const fetchTiffinServiceTypes = createAsyncThunk(
    'user/fetchTiffinServiceTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=6&vendor_type=Tiffin`, {
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

export const fetchTiffinKitchenTypes = createAsyncThunk(
    'user/fetchTiffinKitchenTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-kitchen-types?limit=20&current_page=1`, {
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


export const fetchGetAllTiffinSubscriptionTypes = createAsyncThunk(
    'user/fetchGetAllTiffinSubscriptionTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-subscription-types?current_page=1&limit=5&vendor_type=Tiffin`, {
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

export const fetchTiffinSimilarCaterer = createAsyncThunk(
    'user/fetchTiffinSimilarCaterer',
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
                    vendor_type: "Tiffin",
                    app_type: "web",
                    latitude: data?.latitude || "",
                    longitude: data?.longitude || "",
                    city: data?.city || "",
                    pincode: data?.pincode || "",
                    place_id: data?.place_id || '',
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



export const fetchTiffinMapviewSearchCards = createAsyncThunk(
    'user/fetchTiffinMapviewSearchCards',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const {
            startDate,
            endDate,
            people,
            locationValuesGlobal,
            vendorlistitem
        } = state.globalnavbar || {};

        const {
            tiffinSubscriptionTypes,
            getTiffinPriceRanges,
            getTiffinFoodTypes,
            getTiffinMealTypes,
            getTiffinServiceTypes,
            getTiffinKitchenTypes,
            current_page,
            limit,
            tiffinSortBy,
            getTiffinRatings
        } = state.tiffinFilter || {};

        const selectedPriceRanges = (getTiffinPriceRanges || []).filter(p => p?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges.map(p => ({
            id: Number(p.id),
            start_price: parseFloat(p.start_price),
            end_price: parseFloat(p.end_price)
        }));

        const foodtype_filter_formatted = (getTiffinFoodTypes || [])
            .filter(item => item.id !== "1")
            .map(foodType => ({
                id: Number(foodType.id),
                selected: foodType.selectedweb
            }));

        const mealtype_filter_formatted = (getTiffinMealTypes || []).map(mealType => ({
            id: Number(mealType.id),
            selected: mealType.selectedweb
        }));

        const servicetype_filter_formatted = (getTiffinServiceTypes || []).map(serviceType => ({
            id: Number(serviceType.id),
            selected: serviceType.selectedweb
        }));

        const kitchentype_filter_formatted = (getTiffinKitchenTypes || []).map(kitchenType => ({
            id: Number(kitchenType.id),
            selected: kitchenType.selectedweb
        }));

        const tiffinSubscriptionTypes_formatted = (tiffinSubscriptionTypes || []).map(sub => ({
            subscription_type_id: Number(sub.id),
            selected: sub.selectedweb
        }));

        const rating_filter_formatted = (getTiffinRatings || []).map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));

        try {
            const response = await api.post(
                `${BASE_URL}/search-vendors`,
                {
                    search_term: people || '',
                    vendor_type: "Tiffin",
                    selected_vendor: vendorlistitem || "",
                    app_type: "web",
                    limit: current_page * limit,
                    save_filter: 1,
                    order_by: 'distance',
                    order_by_filter: JSON.stringify(tiffinSortBy || []),
                    price_ranges: JSON.stringify(updatedPriceTypes_formatted),
                    ratings_filter: JSON.stringify(rating_filter_formatted),
                    subscription_types_filter: JSON.stringify(tiffinSubscriptionTypes_formatted),
                    kitchen_types_filter: JSON.stringify(kitchentype_filter_formatted),
                    meal_times_filter: JSON.stringify(mealtype_filter_formatted),
                    food_types_filter: JSON.stringify(foodtype_filter_formatted),
                    service_types_filter: JSON.stringify(servicetype_filter_formatted),
                    is_city_search: "1",
                    start_date: moment(startDate).format('YYYY-MM-DD'),
                    end_date: moment(endDate).format('YYYY-MM-DD'),
                    latitude: locationValuesGlobal?.latitude || "",
                    longitude: locationValuesGlobal?.longitude || "",
                    city: locationValuesGlobal?.city?.long_name || "",
                    pincode: locationValuesGlobal?.pincode || "",
                    place_id: locationValuesGlobal?.place_id || ""
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




export const fetchtiffinSearchCards = createAsyncThunk(
    'user/fetchtiffinSearchCards',
    async (data, thunkAPI) => {
        const state = thunkAPI.getState();
        const {
            startDate,
            endDate,
            vendorSearch,
            people,
            locationValuesGlobal,
            vendorlistitem
        } = state.globalnavbar;

        const {
            tiffinSubscriptionTypes,
            getTiffinPriceRanges,
            getTiffinFoodTypes,
            getTiffinMealTypes,
            getTiffinServiceTypes,
            getTiffinKitchenTypes,
            current_page,
            limit,
            tiffinSortBy,
            getTiffinRatings
        } = state.tiffinFilter;

        // Format filters
        const order_by_filter = JSON.stringify(tiffinSortBy);

        const updatedPriceTypes_formatted = getTiffinPriceRanges
            ?.filter(price => price?.selectedweb === 1)
            ?.map(price => ({
                id: price.id,
                start_price: parseFloat(price.start_price),
                end_price: parseFloat(price.end_price)
            }));

        const foodtype_filter_formatted = getTiffinFoodTypes
            ?.filter(item => item.id !== "1")
            ?.map(foodType => ({
                id: foodType.id,
                selected: foodType.selectedweb
            }));

        const mealtype_filter_formatted = getTiffinMealTypes?.map(mealType => ({
            id: mealType.id,
            selected: mealType.selectedweb
        }));

        const servicetype_filter_formatted = getTiffinServiceTypes?.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selectedweb
        }));

        const kitchentype_filter_formatted = getTiffinKitchenTypes?.map(kitchenType => ({
            id: kitchenType.id,
            selected: kitchenType.selectedweb
        }));

        const tiffinSubscriptionTypes_formatted = tiffinSubscriptionTypes?.map(subscriptionType => ({
            subscription_type_id: Number(subscriptionType.id),
            selected: subscriptionType.selectedweb
        }));

        const rating_tiffin_filter_formatted = getTiffinRatings?.map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));

        // Construct request body
        const requestBody = {
            search_term: vendorSearch || "",
            selected_vendor: vendorlistitem || "",
            limit: current_page * limit,
            current_page,
            save_filter: 1,
            vendor_type: "Tiffin",
            app_type: "web",
            latitude: locationValuesGlobal?.latitude || "",
            longitude: locationValuesGlobal?.longitude || "",
            city: locationValuesGlobal?.city?.long_name || "",
            pincode: locationValuesGlobal?.pincode || "",
            place_id: locationValuesGlobal?.place_id || "",
            price_ranges: JSON.stringify(updatedPriceTypes_formatted),
            ratings_filter: JSON.stringify(rating_tiffin_filter_formatted),
            subscription_types_filter: JSON.stringify(tiffinSubscriptionTypes_formatted),
            order_by_filter,
            kitchen_types_filter: JSON.stringify(kitchentype_filter_formatted),
            is_city_search: "1",
            meal_times_filter: JSON.stringify(mealtype_filter_formatted),
            food_types_filter: JSON.stringify(foodtype_filter_formatted),
            service_types_filter: JSON.stringify(servicetype_filter_formatted),
            start_date: moment(startDate).format('YYYY-MM-DD'),
            end_date: moment(endDate).format('YYYY-MM-DD')
        };

        try {
            const response = await api.post(
                `${BASE_URL}/search-vendors`,
                requestBody,
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


export const createTiffinUserEnquiry = createAsyncThunk(
    'user/createTiffinUserEnquiry',
    async (data, thunkAPI) => {
        const { area, vendorId, branchId } = data;

        const getTiffinServiceTypes = thunkAPI.getState().tiffinFilter?.getTiffinServiceTypes;
        const getTiffinFoodTypes = thunkAPI.getState().tiffinFilter?.getTiffinFoodTypes;
        const getTiffinMealTypes = thunkAPI.getState().tiffinFilter?.getTiffinMealTypes;
        const getTiffinPriceRanges = thunkAPI.getState().tiffinFilter?.getTiffinPriceRanges;
        const getTiffinKitchenTypes = thunkAPI.getState().tiffinFilter?.getTiffinKitchenTypes;
        const tiffinSubscriptionTypes = thunkAPI.getState().tiffinFilter?.tiffinSubscriptionTypes;


        // servicetype_filter_formatted 
        const servicetype_filter_formatted = getTiffinServiceTypes.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selectedweb
        }))

        // foodtype_filter_formatted 
        const foodtype_filter_formatted = getTiffinFoodTypes?.filter(item => item.id !== "1").map(foodType => ({
            id: foodType.id,
            selected: foodType.selectedweb
        }))

        // mealtype_filter_formatted 
        const mealtype_filter_formatted = getTiffinMealTypes.map(mealType => ({
            id: mealType.id,
            selected: mealType.selectedweb
        }))

        // pricetype_filter_formatted 
        const selectedPriceRanges = getTiffinPriceRanges?.filter(price => price?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges?.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) }
        })

        // kitchentype_filter_formatted 
        const kitchentype_filter_formatted = getTiffinKitchenTypes.map(kitchenType => ({
            id: kitchenType.id,
            selected: kitchenType.selectedweb
        }))

        // subscription_Types_formatted 
        const tiffinSubscriptionTypes_formatted = tiffinSubscriptionTypes.map(subscriptionType => ({
            subscription_type_id: Number(subscriptionType.id),
            selected: subscriptionType.selectedweb
        }))




        const body = {
            vendor_id: vendorId,
            branch_id: branchId,
            description: "N/A",
            cuisines_filter: `${JSON.stringify([{ "id": 1, "selected": 1 }])}`,
            service_types_filter: `${JSON.stringify(servicetype_filter_formatted)}`,
            occasions_filter: `${JSON.stringify([{ "id": 1, "selected": 1 }])}`,
            serving_types_filter: `${JSON.stringify([{ "id": 1, "selected": 1 }])}`,
            food_types_filter: `${JSON.stringify(foodtype_filter_formatted)}`,
            head_count_ranges_filter: `${JSON.stringify([{ "id": 1, "start": 100, "end": 200 }])}`,
            meal_times_filter: `${JSON.stringify(mealtype_filter_formatted)}`,
            price_ranges_filter: `${JSON.stringify(updatedPriceTypes_formatted)}`,
            kitchen_types_filter: `${JSON.stringify(kitchentype_filter_formatted)}`,
            subscription_types_filter: `${JSON.stringify(tiffinSubscriptionTypes_formatted)}`,
            area: area
        }

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


export const tiffinFilterSlice = createSlice({
    name: 'tiffinFilter',
    initialState,
    reducers: {
        clearTiffinSlice: () => initialState,
        setSimilarCatererTiffinData: (state, action) => {
            state.similarCatererTiffinData = action.payload;
        },
        incrementTiffinPage(state) {
            state.current_page += 1;
        },
        setTiffinCurrentPage: (state, action) => {
            state.current_page = action.payload;
        },
        setTiffinSort: (state, action) => {
            state.tiffinSortBy = action.payload;
        },
        setPriceTypeFilter: (state, { payload }) => {
            const updatedPriceRanges = state.getTiffinPriceRanges.map((priceRange) => {
                if (priceRange.id === payload) {
                    return { ...priceRange, selectedweb: priceRange.selectedweb === 1 ? 0 : 1 }
                } else {
                    return priceRange;
                }
            })
            state.getTiffinPriceRanges = updatedPriceRanges;
        },
        setFoodTypeFilter: (state, { payload }) => {
            const updatedFoodTypes = state.getTiffinFoodTypes.map((foodType) => {
                if (foodType.id === payload) {
                    return { ...foodType, selectedweb: foodType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return foodType;
                }
            })
            state.getTiffinFoodTypes = updatedFoodTypes;
        },
        setRatingTiffinTypesFilter: (state, action) => {
            const updatedTiffinRatingTypes = state.getTiffinRatings.map((getRatingType) => {
                if (getRatingType.rating === action.payload) {
                    return { ...getRatingType, selectedweb: getRatingType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return getRatingType;
                }
            })
            state.getTiffinRatings = updatedTiffinRatingTypes;
        },
        setMealTypeFilter: (state, { payload }) => {
            const updatedMealTypes = state?.getTiffinMealTypes?.map((mealType) => {
                if (mealType.id === payload) {
                    return { ...mealType, selectedweb: mealType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return mealType;
                }
            })
            state.getTiffinMealTypes = updatedMealTypes;
        },
        setServiceTypeFilter: (state, { payload }) => {
            const updatedServiceTypes = state?.getTiffinServiceTypes?.map((serviceType) => {
                if (serviceType.id === payload) {
                    return { ...serviceType, selectedweb: serviceType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return serviceType;
                }
            })
            state.getTiffinServiceTypes = updatedServiceTypes;
        },
        setKitchenTypeFilter: (state, { payload }) => {
            // Support both: payload = id (toggle), or { id, forceSelect } (set selectedweb=1)
            let id, forceSelect;
            if (typeof payload === 'object' && payload !== null) {
                id = payload.id;
                forceSelect = payload.forceSelect;
            } else {
                id = payload;
                forceSelect = false;
            }
            const updatedKitchenTypes = state?.getTiffinKitchenTypes?.map((kitchenType) => {
                if (kitchenType.id === id) {
                    if (forceSelect) {
                        return { ...kitchenType, selectedweb: 1 };
                    } else {
                        return { ...kitchenType, selectedweb: kitchenType.selectedweb === 1 ? 0 : 1 };
                    }
                } else {
                    return kitchenType;
                }
            });
            state.getTiffinKitchenTypes = updatedKitchenTypes;
        },
        setTiffinSubscriptionFilter: (state, action) => {
            // console.log(action, "action");            
            const { id, tiffinSubscriptionTypes } = action.payload;
            const updatedSubscriptionFilter = tiffinSubscriptionTypes?.map(subscription => {
                if (subscription.id === id) {
                    if (subscription.selectedweb === 1) {
                        return subscription;
                    }
                    return {
                        ...subscription,
                        selectedweb: subscription.selectedweb === 1 ? 0 : 1
                    };
                } else if (["17", "5"].includes(id)) {
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

            state.tiffinSubscriptionTypes = updatedSubscriptionFilter;
        },


    },
    extraReducers: (builder) => {
        builder
            // fetchTiffinPriceRanges 
            .addCase(fetchTiffinPriceRanges.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinPriceRanges.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getTiffinPriceRanges = payload;
                const persisted = state.getTiffinPriceRanges || [];

                state.getTiffinPriceRanges = Array.isArray(payload)
                    ? payload.map(apiItem => {
                        const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                        return persistedItem
                            ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                            : { ...apiItem, selectedweb: 0 }; // default to 0 if not selected before
                    })
                    : [];
            })
            .addCase(fetchTiffinPriceRanges.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // fetchTiffinFoodTypes
            .addCase(fetchTiffinFoodTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinFoodTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getTiffinFoodTypes = payload;
            })
            .addCase(fetchTiffinFoodTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // fetchCaterRatings 
            .addCase(fetchTiffinRatings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinRatings.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getTiffinRatings = payload;
            })
            .addCase(fetchTiffinRatings.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // fetchTiffinMealTypes
            .addCase(fetchTiffinMealTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinMealTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getTiffinMealTypes = payload;
                const persisted = state.getTiffinMealTypes || [];

                state.getTiffinMealTypes = Array.isArray(payload)
                    ? payload.map(apiItem => {
                        const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                        return persistedItem
                            ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                            : { ...apiItem, selectedweb: 0 }; // default to 0 if not found
                    })
                    : [];
            })
            .addCase(fetchTiffinMealTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            //  fetchTiffinServiceTypes
            .addCase(fetchTiffinServiceTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinServiceTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getTiffinServiceTypes = payload;
                const persisted = state.getTiffinServiceTypes || [];

                state.getTiffinServiceTypes = Array.isArray(payload)
                    ? payload.map(apiItem => {
                        const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                        return persistedItem
                            ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                            : { ...apiItem, selectedweb: 0 }; // default to not selected
                    })
                    : [];
            })
            .addCase(fetchTiffinServiceTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // fetchTiffinKitchenTypes
            .addCase(fetchTiffinKitchenTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinKitchenTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                // state.getTiffinKitchenTypes = payload;
                const persisted = state.getTiffinKitchenTypes || [];

                state.getTiffinKitchenTypes = Array.isArray(payload)
                    ? payload.map(apiItem => {
                        const persistedItem = persisted.find(p => String(p.id) === String(apiItem.id));
                        return persistedItem
                            ? { ...apiItem, selectedweb: persistedItem.selectedweb }
                            : { ...apiItem, selectedweb: 0 }; // Default to 0 if not persisted
                    })
                    : [];
            })
            .addCase(fetchTiffinKitchenTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // fetchtiffinSearchCards 
            .addCase(fetchtiffinSearchCards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchtiffinSearchCards.fulfilled, (state, action) => {
                console.log(action, "what is action");
                state.isLoading = false;
                state.getTiffinSearchCards = action.payload.vendors;
                state.limit = action.payload.limit;
                state.current_page = action.payload.current_page;
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchtiffinSearchCards.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchTiffinMapviewSearchCards 
            .addCase(fetchTiffinMapviewSearchCards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinMapviewSearchCards.fulfilled, (state, action) => {
                // console.log(action, "action bbbbbbbbbbbbbbbbbbb"); 
                state.isLoading = false;
                state.getTiffinMapviewSearchCards = action.payload.vendors;
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchTiffinMapviewSearchCards.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchTiffinSimilarCaterer 
            .addCase(fetchTiffinSimilarCaterer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinSimilarCaterer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getTiffinSimilarTypes = action.payload.vendors;
            })
            .addCase(fetchTiffinSimilarCaterer.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchGetAllTiffinSubscriptionTypes 
            .addCase(fetchGetAllTiffinSubscriptionTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetAllTiffinSubscriptionTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.tiffinSubscriptionTypes = payload;
            })
            .addCase(fetchGetAllTiffinSubscriptionTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
    }
})

// Action creators are generated for each case reducer function
export const { setSimilarCatererTiffinData, setTiffinCurrentPage, clearTiffinSlice, incrementTiffinPage, setTiffinSort, setRatingTiffinTypesFilter, setTiffinSubscriptionFilter, setPriceTypeFilter, setFoodTypeFilter, setMealTypeFilter, setServiceTypeFilter, setKitchenTypeFilter } = tiffinFilterSlice.actions

export default tiffinFilterSlice.reducer
