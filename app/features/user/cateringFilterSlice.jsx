import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


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
    people: "",
    // left filters  
    selectedPriceRanges: []
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
        console.log(occasionCount, "occasionCount");
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
        console.log(data, "data");
        const { people, locationValues, formattedPriceRanges } = data;
        try {
            const response = await api.get(`${BASE_URL}/search-vendors?search_term=${people}&order_by=distance&limit=100&current_page=1&occasions_filter=[{"id":1,"selected":1},{"id":2,"selected":1},{"id":3,"selected":1}]&latitude=${locationValues?.latitude || ""}&longitude=${locationValues?.longitude || ""}&city=${locationValues?.city?.long_name || ""}&pincode=${locationValues?.pincode || ""}&place_id=${locationValues?.place_id || ''}&start_date=2024-05-01&end_date=2024-05-07&save_filter=1`, {
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
        setShowAllOccasions: (state, action) => {
            state.occasionCount = action.payload;
        },
        setPeople: (state, action) => {
            state.people = action.payload;
        },
        updatePriceRanges(state, action) {
            const { price } = action.payload;
            const index = state.selectedPriceRanges.findIndex(range => areEqualRanges(range, price));
            if (index !== -1) {
                state.selectedPriceRanges.splice(index, 1);
            } else {
                state.selectedPriceRanges.push(price);
            }
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
export const { setShowAllOccasions, setPeople, updatePriceRanges, people  } = cateringFilterSlice.actions

export default cateringFilterSlice.reducer


export const areEqualRanges = (range1, range2) => {
    return range1.start_price === range2.start_price && range1.end_price === range2.end_price;
  };