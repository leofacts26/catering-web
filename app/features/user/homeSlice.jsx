import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    isLoading: false,
    faqs: [],
    homeOccasions: [],
    getAllCities: [],
    popularCaterer: [],
}

export const fetchFaq = createAsyncThunk(
    'homepage/fetchFaq',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/faq?current_page=1&limit=5&type=vendor`, {
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

export const fetchHomepageOccasions = createAsyncThunk(
    'homepage/fetchHomepageOccasions',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=12`, {
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

export const fetchAllCities = createAsyncThunk(
    'homepage/fetchAllCities',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-all-cities?current_page=1&limit=6`, {
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

export const fetchPopularCaterers = createAsyncThunk(
    'homepage/fetchPopularCaterers',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-vendors-home-page?vendor_type=Tiffin&subscription_type_id=1`, {
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

export const homeSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        // setData: (state, action) => {
        //     state.userData = action.payload;
        // },

    },
    extraReducers: (builder) => {
        builder
        // fetchFaq 
            .addCase(fetchFaq.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFaq.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.faqs = payload;
            })
            .addCase(fetchFaq.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchHomepageOccasions
            .addCase(fetchHomepageOccasions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchHomepageOccasions.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.homeOccasions = payload;
            })
            .addCase(fetchHomepageOccasions.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            }) 
            // fetchAllCities 
            .addCase(fetchAllCities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCities.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getAllCities = payload;
            })
            .addCase(fetchAllCities.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            }) 
            // fetchPopularCaterers 
            .addCase(fetchPopularCaterers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPopularCaterers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.popularCaterer = payload;
            })
            .addCase(fetchPopularCaterers.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            }) 
    }
})





// Action creators are generated for each case reducer function
export const { } = homeSlice.actions

export default homeSlice.reducer


