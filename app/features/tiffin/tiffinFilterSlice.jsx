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
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=2&vendor_type=Tiffin`, {
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
            const response = await api.get(`${BASE_URL}/get-all-kitchen-types?limit=10&current_page=1`, {
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
        // const { locationValuesGlobal } = data;
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&save_filter=1&vendor_type=Tiffin&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}&shuffled=1`, {
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


export const fetchTiffinMapviewSearchCards = createAsyncThunk(
    'user/fetchTiffinMapviewSearchCards',
    async (data, thunkAPI) => {
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const tiffinSubscriptionTypes = thunkAPI.getState().tiffinFilter?.tiffinSubscriptionTypes;
        const getTiffinPriceRanges = thunkAPI.getState().tiffinFilter?.getTiffinPriceRanges;
        const getTiffinFoodTypes = thunkAPI.getState().tiffinFilter?.getTiffinFoodTypes;
        const getTiffinMealTypes = thunkAPI.getState().tiffinFilter?.getTiffinMealTypes;
        const getTiffinServiceTypes = thunkAPI.getState().tiffinFilter?.getTiffinServiceTypes;
        const getTiffinKitchenTypes = thunkAPI.getState().tiffinFilter?.getTiffinKitchenTypes;
        const current_page = thunkAPI.getState().tiffinFilter?.current_page;
        const limit = thunkAPI.getState().tiffinFilter?.limit;
        const tiffinSortBy = thunkAPI.getState().tiffinFilter?.tiffinSortBy;
        const total_count = thunkAPI.getState().tiffinFilter?.total_count;
        const getTiffinRatings = thunkAPI.getState().tiffinFilter?.getTiffinRatings;

        // tiffinSortBy_filter
        const tiffinSortBy_filter = JSON.stringify(tiffinSortBy)

        // pricetype_filter_formatted 
        const selectedPriceRanges = getTiffinPriceRanges?.filter(price => price?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges?.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) }
        })

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

        // servicetype_filter_formatted 
        const servicetype_filter_formatted = getTiffinServiceTypes.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selectedweb
        }))

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

        // rating_tiffin_filter_formatted
        const rating_tiffin_filter_formatted = getTiffinRatings.map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));


        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&limit=${total_count}&current_page=1&save_filter=1&vendor_type=Tiffin&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&ratings_filter=${JSON.stringify(rating_tiffin_filter_formatted)}&subscription_types_filter=${JSON.stringify(tiffinSubscriptionTypes_formatted)}&is_city_search=${"1" || "0"}&order_by_filter=${tiffinSortBy_filter}&kitchen_types_filter=${JSON.stringify(kitchentype_filter_formatted)}&meal_times_filter=${JSON.stringify(mealtype_filter_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&service_types_filter=${JSON.stringify(servicetype_filter_formatted)}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        } a
    }
)

export const fetchtiffinSearchCards = createAsyncThunk(
    'user/fetchtiffinSearchCards',
    async (data, thunkAPI) => {
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const vendorSearch = thunkAPI.getState().globalnavbar?.vendorSearch;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const vendorlistitem = thunkAPI.getState().globalnavbar?.vendorlistitem;
        const tiffinSubscriptionTypes = thunkAPI.getState().tiffinFilter?.tiffinSubscriptionTypes;
        const getTiffinPriceRanges = thunkAPI.getState().tiffinFilter?.getTiffinPriceRanges;
        const getTiffinFoodTypes = thunkAPI.getState().tiffinFilter?.getTiffinFoodTypes;
        const getTiffinMealTypes = thunkAPI.getState().tiffinFilter?.getTiffinMealTypes;
        const getTiffinServiceTypes = thunkAPI.getState().tiffinFilter?.getTiffinServiceTypes;
        const getTiffinKitchenTypes = thunkAPI.getState().tiffinFilter?.getTiffinKitchenTypes;
        const current_page = thunkAPI.getState().tiffinFilter?.current_page;
        const limit = thunkAPI.getState().tiffinFilter?.limit;
        const tiffinSortBy = thunkAPI.getState().tiffinFilter?.tiffinSortBy;
        const getTiffinRatings = thunkAPI.getState().tiffinFilter?.getTiffinRatings;

        // tiffinSortBy_filter
        const tiffinSortBy_filter = JSON.stringify(tiffinSortBy)

        // pricetype_filter_formatted 
        const selectedPriceRanges = getTiffinPriceRanges?.filter(price => price?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges?.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) }
        })

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

        // servicetype_filter_formatted 
        const servicetype_filter_formatted = getTiffinServiceTypes.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selectedweb
        }))

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

        // rating_tiffin_filter_formatted
        const rating_tiffin_filter_formatted = getTiffinRatings.map(item => ({
            rating: item.rating,
            selected: item.selectedweb
        }));

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${vendorSearch}&selected_vendor=${vendorlistitem}&limit=${(current_page * limit)}&current_page=1&save_filter=1&vendor_type=Tiffin&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&ratings_filter=${JSON.stringify(rating_tiffin_filter_formatted)}&subscription_types_filter=${JSON.stringify(tiffinSubscriptionTypes_formatted)}&order_by_filter=${tiffinSortBy_filter}&kitchen_types_filter=${JSON.stringify(kitchentype_filter_formatted)}&is_city_search=${"1" || "0"}&meal_times_filter=${JSON.stringify(mealtype_filter_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&service_types_filter=${JSON.stringify(servicetype_filter_formatted)}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
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



export const tiffinFilterSlice = createSlice({
    name: 'tiffinFilter',
    initialState,
    reducers: {
        // clearTiffinSlice: () => initialState,
        incrementTiffinPage(state) {
            state.current_page += 1;
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
            const updatedKitchenTypes = state?.getTiffinKitchenTypes?.map((kitchenType) => {
                if (kitchenType.id === payload) {
                    return { ...kitchenType, selectedweb: kitchenType.selectedweb === 1 ? 0 : 1 }
                } else {
                    return kitchenType;
                }
            })
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
                } else if (["5", "6"].includes(id)) {
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
                state.getTiffinPriceRanges = payload;
            })
            .addCase(fetchTiffinPriceRanges.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
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
                toast.error(datavalidationerror(payload));
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
                toast.error(datavalidationerror(payload));
            })
            // fetchTiffinMealTypes
            .addCase(fetchTiffinMealTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinMealTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getTiffinMealTypes = payload;
            })
            .addCase(fetchTiffinMealTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            //  fetchTiffinServiceTypes
            .addCase(fetchTiffinServiceTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinServiceTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getTiffinServiceTypes = payload;
            })
            .addCase(fetchTiffinServiceTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchTiffinKitchenTypes
            .addCase(fetchTiffinKitchenTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTiffinKitchenTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getTiffinKitchenTypes = payload;
            })
            .addCase(fetchTiffinKitchenTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
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
export const { incrementTiffinPage, setTiffinSort, setRatingTiffinTypesFilter, setTiffinSubscriptionFilter, setPriceTypeFilter, setFoodTypeFilter, setMealTypeFilter, setServiceTypeFilter, setKitchenTypeFilter } = tiffinFilterSlice.actions

export default tiffinFilterSlice.reducer
