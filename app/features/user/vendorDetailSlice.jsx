import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    isLoading: false,
    reviewsList: [],
}

export const fetchReviews = createAsyncThunk(
    'user/fetchReviews',
    async (slug, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-vendor-reviews?limit=10&current_page=1&vendor_id=${slug}&order_by=newest_first`, {
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

export const addReviews = createAsyncThunk(
    'user/addReviews',
    async (data, thunkAPI) => {
        // const { vendor_id, rating, review_text } = data;
        try {
            const response = await api.post(`${BASE_URL}/user-create-vendor-review`, data, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            toast.success(successToast(response))
            window.location.reload();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const vendorDetailsSlice = createSlice({
    name: 'vendorDetails',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviewsList = payload;
            })
            .addCase(fetchReviews.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // addReviews 
            .addCase(addReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReviews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(addReviews.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})



// Action creators are generated for each case reducer function
export const {  } = vendorDetailsSlice.actions

export default vendorDetailsSlice.reducer


