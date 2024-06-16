import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { fetchUserData, setAccessToken } from './userSlice';
// import { fetchUserData } from './userSlice';

const initialState = {
    isLoading: true,
    caterWishlist: [],
    editProfileData: null,
    showOtp: true,
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
            toast.success(successToast(response))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const sendUpdateProfileOTP = createAsyncThunk(
    'user/sendUpdateProfileOTP',
    async (data, thunkAPI) => {
        const newData = {
            ...data,
            phone_extension: '+91'
        }
        // console.log(newData, "newData");
        try {
            const response = await api.post(`${BASE_URL}/send-update-profile-otp`, newData, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            thunkAPI.dispatch(setShowOtp(false));
            toast.success(successToast(response))
        } catch (error) {
            toast.error(datavalidationerror(error))
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const sendUpdateUserProfile = createAsyncThunk(
    'user/sendUpdateUserProfile',
    async (data, thunkAPI) => {
        const { editProfileData, otp } = data;
        const { username, phone_number, phone_extension } = editProfileData;
        const newOTP = otp.join('');
        const updatedData = {
            name: username,
            phone_number: phone_number,
            phone_extension: phone_extension,
            otp: newOTP,
        }
        console.log(updatedData, "5+6956845 newData");
        try {
            const response = await api.post(`${BASE_URL}/update-user-profile`, updatedData, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            // console.log(response.data.data.updated_token, "response.data.updated_token response.data.updated_token");
            thunkAPI.dispatch(setAccessToken(response?.data?.data?.updated_token));
            thunkAPI.dispatch(setShowOtp(true));
            toast.success(successToast(response))
            thunkAPI.dispatch(fetchUserData());
        } catch (error) {
            toast.error(datavalidationerror(error))
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setEditProfile: (state, { payload }) => {
            state.editProfileData = payload;
        },
        setShowOtp: (state, { payload }) => {
            state.showOtp = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchWishlist 
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
export const { setEditProfile, setShowOtp } = settingSlice.actions

export default settingSlice.reducer