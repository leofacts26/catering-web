import { api, BASE_URL } from "@/api/apiConfig";
import { datavalidationerror, successToast } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  isLoading: true,
  startDate: new Date(),
  endDate: new Date(),
  people: "",
  locationPlaceId: null,
  manualLocation: "",
  selectedLocation: "",
  locationValuesGlobal: {},
  showOnMapLocLat: {
    latitude: "",
    longitude: ""
  },
  vendorSearch: "",
  vendorList: [],
  tiffinVendorList: [],
  vendorlistitem: "",
  locBoolean: false,
};

export const fetchAllVendorList = createAsyncThunk(
  "globalnavbar/fetchAllVendorList",
  async (type, thunkAPI) => {
    const state = thunkAPI.getState();
    const vendorSearch = state.globalnavbar.vendorSearch;

    const requestBody = {
      search_term: vendorSearch || '',
      order_by_filter: JSON.stringify([{ id: 2, value: "a_z" }]),
      limit: 100,
      current_page: 1,
      vendor_type: "Caterer",
      app_type: "web",
      shuffled: 0
    };

    try {
      const response = await api.post(
        `${BASE_URL}/search-vendors-list`,
        requestBody,
        {
          headers: {
            authorization: `Bearer ${state?.user?.accessToken}`,
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.msg || "Something went wrong");
    }
  }
);


export const fetchAllTiffinVendorList = createAsyncThunk(
  "globalnavbar/fetchAllTiffinVendorList",
  async (type, thunkAPI) => {
    const state = thunkAPI.getState();
    const vendorSearch = state.globalnavbar.vendorSearch;

    const requestBody = {
      search_term: vendorSearch || '',
      order_by_filter: JSON.stringify([{ id: 2, value: "a_z" }]),
      limit: 100,
      current_page: 1,
      vendor_type: "Tiffin",
      app_type: "web",
      shuffled: 0
    };

    try {
      const response = await api.post(
        `${BASE_URL}/search-vendors-list`,
        requestBody,
        {
          headers: {
            authorization: `Bearer ${state?.user?.accessToken}`,
          },
        }
      );
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.msg || "Something went wrong");
    }
  }
);


export const globalNavSlice = createSlice({
  name: "globalnavbar",
  initialState,
  reducers: {
    setShowOnMapLocLat: (state, action) => {
      state.showOnMapLocLat = action.payload;
    },
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    setVendorSearch: (state, action) => {
      state.vendorSearch = action.payload;
    },
    setVendorListItem: (state, action) => {
      state.vendorlistitem = action.payload;
    },
    setLocationPlaceId(state, action) {
      state.locationPlaceId = action.payload;
    },
    setManualLocation(state, action) {
      state.manualLocation = action.payload;
      state.locBoolean = true;
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    setLocBoolean(state, action) {
      state.locBoolean = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      // fetchFaq
      .addCase(fetchAllVendorList.pending, (state) => { })
      .addCase(fetchAllVendorList.fulfilled, (state, { payload }) => {
        state.vendorList = payload;
      })
      .addCase(fetchAllVendorList.rejected, (state, { payload }) => {
        // toast.error(datavalidationerror(payload));
      })
      // fetchAllTiffinVendorList
      .addCase(fetchAllTiffinVendorList.pending, (state) => { })
      .addCase(fetchAllTiffinVendorList.fulfilled, (state, { payload }) => {
        state.tiffinVendorList = payload;
      })
      .addCase(fetchAllTiffinVendorList.rejected, (state, { payload }) => {
        // toast.error(datavalidationerror(payload));
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowOnMapLocLat,
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
  setVendorSearch,
  setVendorListItem,
  setLocBoolean,
  locBoolean,
} = globalNavSlice.actions;

export default globalNavSlice.reducer;
