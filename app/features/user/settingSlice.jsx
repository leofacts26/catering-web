import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { fetchUserData, setAccessToken } from './userSlice';
// import { fetchUserData } from './userSlice';

const initialState = {
    isLoading: true,
    caterWishlist: [],
    tiffinWishlist: [],
    editProfileData: null,
    showOtp: true,
    enquiryList: [],
    userNotifications: []
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

export const fetchWishlistTiffin = createAsyncThunk(
    'user/fetchWishlistTiffin',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-wishlist?limit=10&current_page=1&vendor_type=Tiffin`, {
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
        const { branchId, whishlistStatus, vendor_type } = data;
        let body = {
            branch_id: branchId,
            status: whishlistStatus,
            vendor_type: vendor_type
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


export const removeAllWishlist = createAsyncThunk(
    'user/removeAllWishlist',
    async (data, thunkAPI) => {
        let body = {
            status: 0
        }
        try {
            const response = await api.post(`user-remove-all-wishlist`, body, {
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

export const fetchEnquiryList = createAsyncThunk(
    'user/fetchEnquiryList',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/user-get-enquiries?limit=5000&current_page=1&order_by=newest_first`, {
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


export const geUserNotifications = createAsyncThunk(
    'user/geUserNotifications',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-user-notifications?current_page=1&limit=10`, {
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
                // toast.error(datavalidationerror(payload));
            })
            // fetchWishlistCaterer 
            .addCase(fetchWishlistTiffin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWishlistTiffin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.tiffinWishlist = payload;
            })
            .addCase(fetchWishlistTiffin.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
            // removeAllWishlist 
            .addCase(removeAllWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeAllWishlist.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(removeAllWishlist.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchEnquiryList 
            .addCase(fetchEnquiryList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEnquiryList.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.enquiryList = payload;
            })
            .addCase(fetchEnquiryList.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // geUserNotifications 
            .addCase(geUserNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(geUserNotifications.fulfilled, (state, { payload }) => {
                console.log(payload, "payloadpayloadpayload");
                
                state.isLoading = false;
                state.userNotifications = payload;
            })
            .addCase(geUserNotifications.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })

    }
})


// Action creators are generated for each case reducer function
export const { setEditProfile, setShowOtp } = settingSlice.actions

export default settingSlice.reducer