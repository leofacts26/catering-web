import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    isLoading: false,
    faqs: [],
    homeOccasions: [],
    getAllCities: [],
    popularCaterer: [],
    recentSearches: [],
    brandedList: [],
    tiffinList: [],
    popularTiffins: [],
    getAllcuisines: [],
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
            const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=1002`, {
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
            const response = await api.get(`${BASE_URL}/list-explore-cities?current_page=1&limit=10000`, {
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

export const fetchRecentSearches = createAsyncThunk(
    'homepage/fetchRecentSearches',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-user-recent-searches?limit=10&current_page=1&vendor_type=Caterer`, {
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

export const fetchBrandedCaterers = createAsyncThunk(
    'homepage/fetchBrandedCaterers',
    async (data, thunkAPI) => {
        const { latitude, longitude } = data;
        try {
            const response = await api.get(`${BASE_URL}/get-vendors-home-page?vendor_type=Caterer&latitude=${latitude ? latitude : ''}&longitude=${longitude ? longitude : ''}&subscription_type_id=3`, {
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

export const fetchBrandedTiffins = createAsyncThunk(
    'homepage/fetchBrandedTiffins',
    async (data, thunkAPI) => {
        const { latitude, longitude } = data;
        try {
            const response = await api.get(`${BASE_URL}/get-vendors-home-page?vendor_type=Tiffin&latitude=${latitude ? latitude : ''}&longitude=${longitude ? longitude : ''}&subscription_type_id=6`, {
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
    async (data, thunkAPI) => {
        const { latitude, longitude } = data;
        try {
            const response = await api.get(`${BASE_URL}/get-vendors-home-page?vendor_type=Caterer&latitude=${latitude ? latitude : ''}&longitude=${longitude ? longitude : ''}&subscription_type_id=2`, {
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


export const fetchPopularTiffins = createAsyncThunk(
    'homepage/fetchPopularTiffins',
    async (data, thunkAPI) => {
        const { latitude, longitude } = data;
        try {
            const response = await api.get(`${BASE_URL}/get-vendors-home-page?vendor_type=Tiffin&latitude=${latitude ? latitude : ''}&longitude=${longitude ? longitude : ''}&subscription_type_id=5`, {
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


export const fetchCuisines = createAsyncThunk(
    'homepage/fetchCuisines',
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

// user-subscribe-email 
export const userSubscribeEmail = createAsyncThunk(
    'homepage/userSubscribeEmail',
    async (email, thunkAPI) => {
        const data = {
            email: email
        }
        try {
            const response = await api.post(`${BASE_URL}/user-subscribe-email`, data, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            toast.success(successToast(response))
        } catch (error) {
            toast.error(datavalidationerror(error))
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
            // fetchRecentSearches 
            .addCase(fetchRecentSearches.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRecentSearches.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.recentSearches = payload;
            })
            .addCase(fetchRecentSearches.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchBrandedCaterers 
            .addCase(fetchBrandedCaterers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBrandedCaterers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.brandedList = payload;
            })
            .addCase(fetchBrandedCaterers.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchBrandedTiffins 
            .addCase(fetchBrandedTiffins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBrandedTiffins.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.tiffinList = payload;
            })
            .addCase(fetchBrandedTiffins.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchPopularTiffins 
            .addCase(fetchPopularTiffins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPopularTiffins.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.popularTiffins = payload;
            })
            .addCase(fetchPopularTiffins.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCuisines 
            .addCase(fetchCuisines.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCuisines.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.getAllcuisines = payload;
            })
            .addCase(fetchCuisines.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // userSubscribeEmail 
            .addCase(userSubscribeEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userSubscribeEmail.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(userSubscribeEmail.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})





// Action creators are generated for each case reducer function
export const { } = homeSlice.actions

export default homeSlice.reducer