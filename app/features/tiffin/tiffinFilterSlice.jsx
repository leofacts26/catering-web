import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import moment from 'moment';


const initialState = {
    isLoading: false,
    getTiffinPriceRanges: [],
    getTiffinFoodTypes: [],
    getTiffinMealTypes: [],
    getTiffinServiceTypes: [],
    getTiffinKitchenTypes: []
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


export const tiffinFilterSlice = createSlice({
    name: 'tiffinFilter',
    initialState,
    reducers: {

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
    }
})

// Action creators are generated for each case reducer function
export const { } = tiffinFilterSlice.actions

export default tiffinFilterSlice.reducer
