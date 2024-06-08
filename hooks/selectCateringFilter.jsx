import { createSelector } from '@reduxjs/toolkit';

const selectFilterState = (state) => state.cateringFilter;

export const selectCateringFilter = createSelector(
    [selectFilterState],
    (cateringFilter) => ({
        startDate: cateringFilter.startDate,
        endDate: cateringFilter.endDate,
        cateringSortBy: cateringFilter.cateringSortBy,
        getCateringPriceRanges: cateringFilter.getCateringPriceRanges,
        getCateringFoodTypes: cateringFilter.getCateringFoodTypes,
        getCateringServingTypes: cateringFilter.getCateringServingTypes,
        getCateringServiceTypes: cateringFilter.getCateringServiceTypes,
        getCateringCuisines: cateringFilter.getCateringCuisines,
        getOccasionCateringTypes: cateringFilter.getOccasionCateringTypes,
        people: cateringFilter.people,
        locationValuesGlobal: cateringFilter.locationValuesGlobal,
        subscriptionTypes: cateringFilter.subscriptionTypes
    })
);
