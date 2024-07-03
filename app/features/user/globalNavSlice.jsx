import { api, BASE_URL } from '@/api/apiConfig';
import { datavalidationerror, successToast } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    startDate: new Date(),
    endDate: new Date(),
    people: "",
    locationPlaceId: null,
    manualLocation: "",
    selectedLocation: "",
    locationValuesGlobal: {},
}


export const globalNavSlice = createSlice({
    name: 'globalnavbar',
    initialState,
    reducers: {
        setPeople: (state, action) => {
            state.people = action.payload;
        },
        setLocationPlaceId(state, action) {
            state.locationPlaceId = action.payload;
        },
        setManualLocation(state, action) {
            state.manualLocation = action.payload;
        },
        setSelectedLocation(state, action) {
            state.selectedLocation = action.payload;
        },
        setlLocationValuesGlobal: (state, action) => {
            state.locationValuesGlobal = action.payload;
        },
        setStartDate(state, action) {
            state.startDate = action.payload;
        },
        setEndDate(state, action) {
            state.endDate = action.payload;
        },
        setDateRange(state, action) {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        },
    }
})


// Action creators are generated for each case reducer function
export const {
    setPeople,
    people,
    setSelectedLocation,
    setManualLocation,
    setLocationPlaceId,
    setlLocationValuesGlobal,
    locationPlaceId,
    manualLocation,
    selectedLocation,
    setStartDate,
    setEndDate,
    setDateRange,
} = globalNavSlice.actions

export default globalNavSlice.reducer


