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
        logoutUser: (state) => {
            state.userData = initialState.userData;
            state.vendorId = initialState.vendorId;
            state.accessToken = initialState.accessToken;
            state.loginUserData = initialState.loginUserData;
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
                toast.error(datavalidationerror(payload));
            })
    }
})





// Action creators are generated for each case reducer function
export const { setVendorId, setData, setAccessToken, logoutUser, setLoginUserData } = userSlice.actions

export default userSlice.reducer


