import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    userData: null,
    vendorId: null,
    accessToken: "",
    loginUserData: null,
    isLoading: false,
    userDetails: null,
    regData: null,
}

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/get-user-info`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState()?.user?.accessToken}`,
                },
            });
            return response?.data?.data[0];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRegisterData: (state, { payload }) => {
            state.regData = payload;
        },
        setData: (state, action) => {
            state.userData = action.payload;
        },
        setVendorId: (state, action) => {
            state.vendorId = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLoginUserData: (state, action) => {
            state.loginUserData = action.payload;
        },
        logout: (state) => {
            state.token = '';
            localStorage.removeItem('accessToken');
            localStorage.clear();
            window.location.href = '/'; // Redirect after logout
        },
        logoutUser: (state) => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userDetails = payload;
            })
            .addCase(fetchUserData.rejected, (state, { payload }) => {
                state.isLoading = false;
                // toast.error(datavalidationerror(payload));
            })
    }
})





// Action creators are generated for each case reducer function
export const { logout, setVendorId, setData, setAccessToken, logoutUser, setLoginUserData, setRegisterData } = userSlice.actions

export default userSlice.reducer


