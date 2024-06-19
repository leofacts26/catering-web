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

    // detail page 
    getTiffinSimilarTypes: [],

    // listview 
    getTiffinSearchCards: [],
    getTiffinMapviewSearchCards: [],

    // filter 
    current_page: 1,
    limit: 6,
    total_count: null,

}

export const fetchTiffinPriceRanges = createAsyncThunk(
    'user/fetchTiffinPriceRanges',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-price-ranges?current_page=1&limit=10`, {
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
            const response = await api.get(`${BASE_URL}/get-all-service-types?current_page=1&limit=2`, {
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

export const fetchtiffinSearchCards = createAsyncThunk(
    'user/fetchtiffinSearchCards',
    async (data, thunkAPI) => {
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const subscriptionTypes = thunkAPI.getState().cateringFilter?.subscriptionTypes;
        const cateringSortBy = thunkAPI.getState().cateringFilter?.cateringSortBy;
        const getTiffinPriceRanges = thunkAPI.getState().tiffinFilter?.getTiffinPriceRanges;
        const getTiffinFoodTypes = thunkAPI.getState().tiffinFilter?.getTiffinFoodTypes;
        const getTiffinMealTypes = thunkAPI.getState().tiffinFilter?.getTiffinMealTypes;
        const getTiffinServiceTypes = thunkAPI.getState().tiffinFilter?.getTiffinServiceTypes;
        const getTiffinKitchenTypes = thunkAPI.getState().tiffinFilter?.getTiffinKitchenTypes;
        const current_page = thunkAPI.getState().tiffinFilter?.current_page;
        const limit = thunkAPI.getState().tiffinFilter?.limit;
        // const total_count = thunkAPI.getState().tiffinFilter?.total_count;
        // console.log(limit, "limit 87676");

        // pricetype_filter_formatted 
        const selectedPriceRanges = getTiffinPriceRanges?.filter(price => price?.selected === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges?.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) }
        })

        // console.log(getTiffinFoodTypes, "getTiffinFoodTypes");

        // foodtype_filter_formatted 
        const foodtype_filter_formatted = getTiffinFoodTypes?.filter(item => item.id !== "1").map(foodType => ({
            id: foodType.id,
            selected: foodType.selected
        }))

        // mealtype_filter_formatted 
        const mealtype_filter_formatted = getTiffinMealTypes.map(mealType => ({
            id: mealType.id,
            selected: mealType.selected
        }))

        // servicetype_filter_formatted 
        const servicetype_filter_formatted = getTiffinServiceTypes.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selected
        }))

        // kitchentype_filter_formatted 
        const kitchentype_filter_formatted = getTiffinKitchenTypes.map(kitchenType => ({
            id: kitchenType.id,
            selected: kitchenType.selected
        }))

        // subscription_Types_formatted 
        const subscriptionTypes_formatted = subscriptionTypes.map(subscriptionType => ({
            subscription_type_id: Number(subscriptionType.id),
            selected: subscriptionType.selected
        }))

        // cateringSortBy_filter
        const cateringSortBy_filter = JSON.stringify(cateringSortBy)


        // console.log({ startDate, endDate, people, locationValuesGlobal, updatedPriceTypes_formatted, foodtype_filter_formatted, mealtype_filter_formatted, servicetype_filter_formatted, kitchentype_filter_formatted, subscriptionTypes_formatted, cateringSortBy_filter }, "startDate, endDate, people, locationValuesGlobal");


        // 
        // &service_types_filter=${JSON.stringify(servicetype_filter_formatted)}
        // 
        // &occasions_filter=${JSON.stringify(occasions_filter_formatted)}
        // 
        // 
        // &kitchen_types_filter=${kitchentype_filter_formatted}
        // &meal_times_filter=${JSON.stringify(mealtype_filter_formatted)}

        console.log(current_page * limit, "current_page * limit");

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&limit=${(current_page * limit)}&current_page=1&save_filter=1&vendor_type=Tiffin&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&order_by_filter=${cateringSortBy_filter}&meal_times_filter=${JSON.stringify(mealtype_filter_formatted)}&kitchen_types_filter=${JSON.stringify(kitchentype_filter_formatted)}&subscription_types_filter=${JSON.stringify(subscriptionTypes_formatted)}&service_types_filter=${JSON.stringify(servicetype_filter_formatted)}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
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
        // const { locationValuesGlobal } = data;
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const getTiffinPriceRanges = thunkAPI.getState().tiffinFilter?.getTiffinPriceRanges;
        const getTiffinFoodTypes = thunkAPI.getState().tiffinFilter?.getTiffinFoodTypes;
        const getTiffinMealTypes = thunkAPI.getState().tiffinFilter?.getTiffinMealTypes;
        const getTiffinServiceTypes = thunkAPI.getState().tiffinFilter?.getTiffinServiceTypes;
        const getTiffinKitchenTypes = thunkAPI.getState().tiffinFilter?.getTiffinKitchenTypes;

        // pricetype_filter_formatted 
        const selectedPriceRanges = getTiffinPriceRanges?.filter(price => price?.selected === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges?.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) }
        })

        // foodtype_filter_formatted 
        const foodtype_filter_formatted = getTiffinFoodTypes.filter(item => item.id !== "1").map(foodType => ({
            id: foodType.id,
            selected: foodType.selected
        }))

        // mealtype_filter_formatted 
        const mealtype_filter_formatted = getTiffinMealTypes.map(mealType => ({
            id: mealType.id,
            selected: mealType.selected
        }))

        // servicetype_filter_formatted 
        const servicetype_filter_formatted = getTiffinServiceTypes.map(serviceType => ({
            id: serviceType.id,
            selected: serviceType.selected
        }))

        // kitchentype_filter_formatted 
        const kitchentype_filter_formatted = getTiffinKitchenTypes.map(kitchenType => ({
            id: kitchenType.id,
            selected: kitchenType.selected
        }))


        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&save_filter=1&vendor_type=Tiffin&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&service_types_filter=${JSON.stringify(servicetype_filter_formatted)}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&meal_times_filter=${JSON.stringify(mealtype_filter_formatted)}&kitchen_types_filter=${JSON.stringify(kitchentype_filter_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
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




export const tiffinFilterSlice = createSlice({
    name: 'tiffinFilter',
    initialState,
    reducers: {
        incrementTiffinPage(state) {
            state.current_page += 1;
        },
        clearTiffinSlice: (state) => {
            state = initialState;
        },
        setPriceTypeFilter: (state, { payload }) => {
            const updatedPriceRanges = state.getTiffinPriceRanges.map((priceRange) => {
                if (priceRange.id === payload) {
                    return { ...priceRange, selected: priceRange.selected === 1 ? 0 : 1 }
                } else {
                    return priceRange;
                }
            })
            state.getTiffinPriceRanges = updatedPriceRanges;
        },
        setFoodTypeFilter: (state, { payload }) => {
            const updatedFoodTypes = state.getTiffinFoodTypes.map((foodType) => {
                if (foodType.id === payload) {
                    return { ...foodType, selected: foodType.selected === 1 ? 0 : 1 }
                } else {
                    return foodType;
                }
            })
            state.getTiffinFoodTypes = updatedFoodTypes;
        },
        setMealTypeFilter: (state, { payload }) => {
            const updatedMealTypes = state?.getTiffinMealTypes?.map((mealType) => {
                if (mealType.id === payload) {
                    return { ...mealType, selected: mealType.selected === 1 ? 0 : 1 }
                } else {
                    return mealType;
                }
            })
            state.getTiffinMealTypes = updatedMealTypes;
        },
        setServiceTypeFilter: (state, { payload }) => {
            const updatedServiceTypes = state?.getTiffinServiceTypes?.map((serviceType) => {
                if (serviceType.id === payload) {
                    return { ...serviceType, selected: serviceType.selected === 1 ? 0 : 1 }
                } else {
                    return serviceType;
                }
            })
            state.getTiffinServiceTypes = updatedServiceTypes;
        },
        setKitchenTypeFilter: (state, { payload }) => {
            const updatedKitchenTypes = state?.getTiffinKitchenTypes?.map((kitchenType) => {
                if (kitchenType.id === payload) {
                    return { ...kitchenType, selected: kitchenType.selected === 1 ? 0 : 1 }
                } else {
                    return kitchenType;
                }
            })
            state.getTiffinKitchenTypes = updatedKitchenTypes;
        }
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
                console.log(action, "action bbbbbbbbbbbbbbbbbbb");
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
    }
})

// Action creators are generated for each case reducer function
export const { incrementTiffinPage, clearTiffinSlice, setPriceTypeFilter, setFoodTypeFilter, setMealTypeFilter, setServiceTypeFilter, setKitchenTypeFilter } = tiffinFilterSlice.actions

export default tiffinFilterSlice.reducer
