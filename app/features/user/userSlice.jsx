import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    vendorId: null,
    accessToken: "",
    loginUserData: null,
}

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
})

// Action creators are generated for each case reducer function
export const { setVendorId, setData, setAccessToken, logoutUser, setLoginUserData } = userSlice.actions

export default userSlice.reducer