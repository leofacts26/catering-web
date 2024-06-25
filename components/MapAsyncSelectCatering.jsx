import React from 'react';
import AsyncSelect from 'react-select/async';
import { useSelector } from 'react-redux';

const MapAsyncSelectCatering = ({ onSelect }) => {
    const { getCateringMapviewSearchCards } = useSelector((state) => state.cateringFilter);

    const defaultOptions = getCateringMapviewSearchCards.map((card) => ({
        value: card.id,
        label: card.catering_service_name,
        lat: card.latitude,
        lng: card.longitude,
        vendor_id: card.vendor_id,
        branch_id: card.id
    }))

    const filterOptions = (inputValue) => {
        if (!getCateringMapviewSearchCards) {
            return [];
        }
        return getCateringMapviewSearchCards.filter((card) =>
            card.catering_service_name.toLowerCase().includes(inputValue.toLowerCase())
        ).map((card) => ({
            value: card.id,
            label: card.catering_service_name,
            lat: card.latitude,
            lng: card.longitude,
            vendor_id: card.vendor_id,
            branch_id: card.id
        }));
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            const filteredOptions = filterOptions(inputValue);
            callback(filteredOptions);
        }, 1000); // Simulating asynchronous behavior with setTimeout
    };

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            onChange={onSelect}
            placeholder="Search by Catering Service Name"
            className='map-search-input'
        />
    );
};

export default MapAsyncSelectCatering;
