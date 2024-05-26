import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    vendorId: null,
    accessToken: "",
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
        logoutUser: (state) => {
            state.userData = initialState.userData;
            state.vendorId = initialState.vendorId;
            state.accessToken = initialState.accessToken;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setVendorId, setData, setAccessToken, logoutUser } = userSlice.actions

export default userSlice.reducer