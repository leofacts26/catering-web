import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import moment from 'moment';


const initialState = {
    isLoading: false,
    getCateringPriceRanges: [],
    getCateringFoodTypes: [],
    getOccasionCateringTypes: [],
    getCateringCuisines: [],
    getCateringServiceTypes: [],
    getCateringServingTypes: [],
    getCateringSearchCards: [],
    occasionCount: 5,
    // Global Nav 
    startDate: new Date(),
    endDate: new Date(),
    people: "",
    locationPlaceId: null,
    manualLocation: "",
    selectedLocation: "",
    locationValuesGlobal: {},
    // Filters 
    // left filters  
    // selectedPriceRanges: [],
}

export const fetchPriceRanges = createAsyncThunk(
    'user/fetchPriceRanges',
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

export const fetchCateringFoodTypes = createAsyncThunk(
    'user/fetchCateringFoodTypes',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-food-types?current_page=1&limit=2`, {
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
        try {
            const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=${occasionCount}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
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

export const fetchCateringSearchCards = createAsyncThunk(
    'user/fetchCateringSearchCards',
    async (data, thunkAPI) => {
        const { people, locationValuesGlobal, occasions_filter, service_filter, serving_filter, foodtype_filter, pricetype_filter, cuisine_filter } = data;
        const startDate = thunkAPI.getState().cateringFilter?.startDate;
        const endDate = thunkAPI.getState().cateringFilter?.endDate;
        console.log(data, "data22334455");

        // occasions_filter_formatted 
        const occasions_filter_formatted_selected = occasions_filter?.filter(occasion => occasion?.selectedweb === 1);
        const occasions_filter_formatted = occasions_filter_formatted_selected.map(occasion => ({
            id: occasion.occasion_id,
            selectedweb: occasion.selectedweb
        }));

        // cuisinetype_filter_formatted 
        function extractChildrenData(data) {
            return data.flatMap(item => item.children.map(({ id, selectedweb }) => ({ id, selectedweb })));
        }
        const cuisinetype_filter_Data = extractChildrenData(cuisine_filter);

        // console.log(JSON.stringify(cuisinetype_filter_Data), "cuisinetype_filter_Data cuisinetype_filter_Data");

        // service_filter_formatted
        const service_filter_formatted = service_filter.map(service => ({
            id: service.id,
            selectedweb: service.selectedweb
        }));

        // serving_filter_formatted 
        const serving_filter_formatted = serving_filter.map(serving => ({
            id: serving.id,
            selectedweb: serving.selectedweb
        }))

        // foodtype_filter_formatted 
        const foodtype_filter_formatted = foodtype_filter.map(foodType => ({
            id: foodType.id,
            selectedweb: foodType.selectedweb
        }))

        // pricetype_filter_formatted 
        const selectedPriceRanges = pricetype_filter?.filter(price => price?.selectedweb === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) };
        });

        // &cuisines_filter=${JSON.stringify(cuisinetype_filter_Data)} 

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&current_page=1&save_filter=1&vendor_type=Caterer&app_type=web&service_types_filter=${JSON.stringify(service_filter_formatted)}&serving_types_filter=${JSON.stringify(serving_filter_formatted)}&occasions_filter=${JSON.stringify(occasions_filter_formatted)}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&cuisines_filter=${JSON.stringify(cuisinetype_filter_Data)}&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}&save_filter=1`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data?.vendors;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const cateringFilterSlice = createSlice({
    name: 'cateringFilter',
    initialState,
    reducers: {
        resetFilters: (state) => {
            state = initialState;
        },
        setShowAllOccasions: (state, action) => {
            state.occasionCount = action.payload;
        },
        setPeople: (state, action) => {
            state.people = action.payload;
        },
        setLocationPlaceId(state, action) {
            state.locationPlaceId = action.payload;
        },
        setManualLocation(state, action) {
            state.manualLocation = action.payload;
        },
        setSelectedLocation(state, action) {
            state.selectedLocation = action.payload;
        },
        setlLocationValuesGlobal: (state, action) => {
            state.locationValuesGlobal = action.payload;
        },
        setStartDate(state, action) {
            state.startDate = action.payload;
        },
        setEndDate(state, action) {
            state.endDate = action.payload;
        },
        setDateRange(state, action) {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        },
        setCuisineTypeFilter: (state, action) => {
            const { cuisineId, isParent } = action.payload;
            const updatedCuisines = state.getCateringCuisines.map((cuisine) => {
                if (cuisine.id === cuisineId) {
                    // Toggle selectedweb of parent cuisine
                    const updatedCuisine = {
                        ...cuisine,
                        selectedweb: cuisine.selectedweb === 1 ? 0 : 1
                    };
        
                    // Toggle selectedweb of all children based on parent's selectedweb
                    const updatedChildren = updatedCuisine.children.map(childCuisine => ({
                        ...childCuisine,
                        selectedweb: updatedCuisine.selectedweb
                    }));
        
                    return {
                        ...updatedCuisine,
                        children: updatedChildren
                    };
                } else {
                    // If the selected cuisine is a child, update its selectedweb directly
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
            });
            state.getCateringCuisines = updatedCuisines;
        },
        setOccasionTypes: (state, action) => {
            const updatedOccasions = state.getOccasionCateringTypes?.map((occasion) => {
                if (occasion.occasion_id === action.payload) {
                    return { ...occasion, selectedweb: occasion.selectedweb === 1 ? 0 : 1 };
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
                state.getCateringPriceRanges = payload;
            })
            .addCase(fetchPriceRanges.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCateringFoodTypes
            .addCase(fetchCateringFoodTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringFoodTypes.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringFoodTypes = payload;
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
                state.isLoading = false;
                state.occasionCount = payload.total_count;
                state.getOccasionCateringTypes = payload.data;
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
                state.getCateringCuisines = payload;
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
            .addCase(fetchCateringSearchCards.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getCateringSearchCards = payload;
            })
            .addCase(fetchCateringSearchCards.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { resetFilters, setShowAllOccasions, setPeople, people, setOccasionTypes, setSelectedLocation, setManualLocation, setLocationPlaceId, setlLocationValuesGlobal, locationPlaceId, manualLocation, selectedLocation, setStartDate, setEndDate, setDateRange, setServiceTypesFilter, setServingTypesFilter, servingFilters, setFoodTypeFilter, foodtypeFilters, setPriceTypeFilter, setCuisineTypeFilter } = cateringFilterSlice.actions

export default cateringFilterSlice.reducer