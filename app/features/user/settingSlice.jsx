import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    caterWishlist: [],
}

export const fetchWishlist = createAsyncThunk(
    'user/fetchWishlist',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-wishlist?limit=10&current_page=1&vendor_type=Caterer`, {
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

export const addchWishlist = createAsyncThunk(
    'user/addchWishlist',
    async (data, thunkAPI) => {
        const { branchId, whishlistStatus } = data;
        let body = {
            branch_id: branchId,
            status: whishlistStatus
        }
        try {
            const response = await api.post(`${BASE_URL}/user-add-update-wishlist`, body, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            // console.log(response, "response wishlist");
            toast.success(successToast(response))
            // return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // setWishList: (state, { payload }) => {

        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.caterWishlist = payload;
            })
            .addCase(fetchWishlist.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})





// Action creators are generated for each case reducer function
export const { } = settingSlice.actions

export default settingSlice.reducer


