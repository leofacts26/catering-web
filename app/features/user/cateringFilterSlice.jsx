import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
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
    getCateringMapviewSearchCards: [],
    occasionCount: 5,
    occasionTotalCount: 5,
    cateringSortBy: [],
    getAllSortOrders: [],
    subscriptionTypes: [],
    current_page: 1,
    limit: 7,
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
    // Filters 
    // left filters  
    // selectedPriceRanges: [],
}

export const clearFilters = createAsyncThunk(
    'user/clearFilters',
    async (user, thunkAPI) => {
        try {
            const response = await api.post(`${BASE_URL}/clear-all-filters-web`, { is_notification_allowed: 1 }, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            toast.success(successToast(response))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


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
            const response = await api.get(`${BASE_URL}/user-get-subscription-types?current_page=1&limit=2`, {
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

export const fetchCateringSearchCards = createAsyncThunk(
    'user/fetchCateringSearchCards',
    async (data, thunkAPI) => {
        // const { locationValuesGlobal } = data;
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const cateringSortBy = thunkAPI.getState().cateringFilter?.cateringSortBy;
        const getCateringPriceRanges = thunkAPI.getState().cateringFilter?.getCateringPriceRanges;
        const getCateringFoodTypes = thunkAPI.getState().cateringFilter?.getCateringFoodTypes;
        const getCateringServingTypes = thunkAPI.getState().cateringFilter?.getCateringServingTypes;
        const getCateringServiceTypes = thunkAPI.getState().cateringFilter?.getCateringServiceTypes;
        const getCateringCuisines = thunkAPI.getState().cateringFilter?.getCateringCuisines;
        const getOccasionCateringTypes = thunkAPI.getState().cateringFilter?.getOccasionCateringTypes;
        const subscriptionTypes = thunkAPI.getState().cateringFilter?.subscriptionTypes;
        const current_page = thunkAPI.getState().cateringFilter?.current_page;
        const limit = thunkAPI.getState().cateringFilter?.limit;
        const total_count = thunkAPI.getState().cateringFilter?.total_count;

        // console.log(cateringSortBy, "cateringSortBy ppppppppppppppppppppppppp");
        // console.log(data, "data22334455");
        // console.log(getCateringPriceRanges, "getCateringPriceRanges");

        // cateringSortBy_filter
        const cateringSortBy_filter = JSON.stringify(cateringSortBy)

        // occasions_filter_formatted 
        const occasions_filter_formatted_selected = getOccasionCateringTypes?.filter(occasion => occasion?.selected === 1);
        const occasions_filter_formatted = occasions_filter_formatted_selected.map(occasion => ({
            id: occasion.occasion_id,
            selected: occasion.selected
        }));

        // cuisinetype_filter_formatted 
        function extractChildrenData(data) {
            return data.flatMap(item => item.children.map(({ id, selected }) => ({ id, selected })));
        }
        const cuisinetype_filter_Data = extractChildrenData(getCateringCuisines);

        // console.log(JSON.stringify(cuisinetype_filter_Data), "cuisinetype_filter_Data cuisinetype_filter_Data");

        // service_filter_formatted
        const service_filter_formatted = getCateringServiceTypes.map(service => ({
            id: service.id,
            selected: service.selected
        }));

        // serving_filter_formatted 
        const serving_filter_formatted = getCateringServingTypes.map(serving => ({
            id: serving.id,
            selected: serving.selected
        }))

        // foodtype_filter_formatted 
        const foodtype_filter_formatted = getCateringFoodTypes.map(foodType => ({
            id: foodType.id,
            selected: foodType.selected
        }))

        // subscription_Types_formatted 
        const subscriptionTypes_formatted = subscriptionTypes.map(subscriptionType => ({
            subscription_type_id: subscriptionType.id,
            selected: subscriptionType.selected
        }))

        // pricetype_filter_formatted 
        const selectedPriceRanges = getCateringPriceRanges?.filter(price => price?.selected === 1);
        const updatedPriceTypes_formatted = selectedPriceRanges.map(price => {
            return { id: price.id, start_price: parseFloat(price.start_price), end_price: parseFloat(price.end_price) };
        });

        // &cuisines_filter=${JSON.stringify(cuisinetype_filter_Data)} 

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=${(current_page * limit)}&save_filter=1&vendor_type=Caterer&app_type=web&service_types_filter=${JSON.stringify(service_filter_formatted)}&order_by_filter=${cateringSortBy_filter}&serving_types_filter=${JSON.stringify(serving_filter_formatted)}&subscription_types_filter=${JSON.stringify(subscriptionTypes_formatted)}&occasions_filter=${JSON.stringify(occasions_filter_formatted)}&price_ranges=${JSON.stringify(updatedPriceTypes_formatted)}&food_types_filter=${JSON.stringify(foodtype_filter_formatted)}&cuisines_filter=${JSON.stringify(cuisinetype_filter_Data)}&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
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

export const fetchCateringMapviewSearchCards = createAsyncThunk(
    'user/fetchCateringMapviewSearchCards',
    async (data, thunkAPI) => {
        // const { locationValuesGlobal } = data;
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;
        const current_page = thunkAPI.getState().cateringFilter?.current_page;
        const limit = thunkAPI.getState().cateringFilter?.limit;
        const total_count = thunkAPI.getState().cateringFilter?.total_count;

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&save_filter=1&vendor_type=Caterer&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`, {
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


export const fetchCatererSimilarCaterer = createAsyncThunk(
    'user/fetchCatererSimilarCaterer',
    async (data, thunkAPI) => {
        // const { locationValuesGlobal } = data;
        const startDate = thunkAPI.getState().globalnavbar?.startDate;
        const endDate = thunkAPI.getState().globalnavbar?.endDate;
        const people = thunkAPI.getState().globalnavbar?.people;
        const locationValuesGlobal = thunkAPI.getState().globalnavbar?.locationValuesGlobal;

        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&save_filter=1&vendor_type=Caterer&app_type=web&latitude=${locationValuesGlobal?.latitude || ""}&longitude=${locationValuesGlobal?.longitude || ""}&city=${locationValuesGlobal?.city?.long_name || ""}&pincode=${locationValuesGlobal?.pincode || ""}&place_id=${locationValuesGlobal?.place_id || ''}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}&shuffled=1`, {
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


export const cateringFilterSlice = createSlice({
    name: 'cateringFilter',
    initialState,
    reducers: {
        resetFilters: (state) => {
            state = initialState;
        },
        incrementPage(state) {
            state.current_page += 1;
        },

        setShowAllOccasions: (state, action) => {
            state.occasionCount = action.payload;
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
            const { cuisineId, isParent } = action.payload;
            const updatedCuisines = state.getCateringCuisines.map((cuisine) => {
                if (cuisine.id === cuisineId) {
                    // Toggle selected of parent cuisine
                    const updatedCuisine = {
                        ...cuisine,
                        selected: cuisine.selected === 1 ? 0 : 1
                    };

                    // Toggle selected of all children based on parent's selected
                    const updatedChildren = updatedCuisine.children.map(childCuisine => ({
                        ...childCuisine,
                        selected: updatedCuisine.selected
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
                                    selected: childCuisine.selected === 1 ? 0 : 1
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
                    return { ...occasion, selected: occasion.selected === 1 ? 0 : 1 };
                } else {
                    return occasion;
                }
            });
            state.getOccasionCateringTypes = updatedOccasions;
        },
        setServiceTypesFilter: (state, action) => {
            const updatedServiceTypes = state.getCateringServiceTypes.map((serviceType) => {
                if (serviceType.id === action.payload) {
                    return { ...serviceType, selected: serviceType.selected === 1 ? 0 : 1 }
                } else {
                    return serviceType;
                }
            })
            state.getCateringServiceTypes = updatedServiceTypes;
        },
        setServingTypesFilter: (state, action) => {
            const updatedServingTypes = state.getCateringServingTypes.map((servingType) => {
                if (servingType.id === action.payload) {
                    return { ...servingType, selected: servingType.selected === 1 ? 0 : 1 }
                } else {
                    return servingType;
                }
            })
            state.getCateringServingTypes = updatedServingTypes;
        },
        setFoodTypeFilter: (state, action) => {
            const updatedFoodTypes = state.getCateringFoodTypes.map((foodType) => {
                if (foodType.id === action.payload) {
                    return { ...foodType, selected: foodType.selected === 1 ? 0 : 1 }
                } else {
                    return foodType;
                }
            })
            state.getCateringFoodTypes = updatedFoodTypes;
        },
        setPriceTypeFilter: (state, action) => {
            const updatedPriceRanges = state.getCateringPriceRanges.map((priceRange) => {
                if (priceRange.id === action.payload) {
                    return { ...priceRange, selected: priceRange.selected === 1 ? 0 : 1 }
                } else {
                    return priceRange;
                }
            })

            state.getCateringPriceRanges = updatedPriceRanges;
        },
        setSubscriptionFilter: (state, action) => {
            const updatedSubscriptionFilter = state.subscriptionTypes.map((subscription) => {
                if (subscription.id === action.payload) {
                    return { ...subscription, selected: subscription.selected === 1 ? 0 : 1 }
                } else {
                    return subscription;
                }
            })

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
                state.occasionTotalCount = payload.total_count;
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


    setServiceTypesFilter,
    setServingTypesFilter,
    servingFilters,
    setFoodTypeFilter,
    foodtypeFilters,
    setPriceTypeFilter,
    setCuisineTypeFilter,
    setCateringSort,
    setSubscriptionFilter
} = cateringFilterSlice.actions

export default cateringFilterSlice.reducer
