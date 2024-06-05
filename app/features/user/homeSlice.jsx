import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    isLoading: false,
    faqs: [],
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
    }
})





// Action creators are generated for each case reducer function
export const { } = homeSlice.actions

export default homeSlice.reducer


