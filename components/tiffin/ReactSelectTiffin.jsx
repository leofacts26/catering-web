import React, { useEffect } from 'react'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllSortOrders } from '@/app/features/user/cateringFilterSlice';
import { fetchtiffinSearchCards } from '@/app/features/tiffin/tiffinFilterSlice';

const ReactSelectTiffin = ({ text1, onChange }) => {

  const { isLoading, getAllSortOrders } = useSelector((state) => state.cateringFilter)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllSortOrders())
  }, [])

  const options = getAllSortOrders.map((name) => ({ value: name.sort_text, label: name.name }));

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
    dispatch(fetchtiffinSearchCards())
  };

  return (
    <Select
      className='mt-3'
      options={options}
      isSearchable
      // isMulti
      placeholder={text1}
      onChange={handleChange}
      styles={{
        control: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          borderRadius: '99px',
          padding: '0px 0px',
          border: `2px solid ${isFocused ? '#d9822b' : '#d9822b'}`,
          width: '200px',
          height: '0px',
          fontSize: '12px',
          color: '#d9822b',
          '&:hover': {
            border: `2px solid #d9822b`,
          },
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: '#d9822b',
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          color: '#d9822b',
          backgroundColor: '#d9822b',
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: '#d9822b',
        }),
        option: (baseStyles, { isFocused, isSelected }) => ({
          ...baseStyles,
          backgroundColor: isSelected ? '#d9822b' : isFocused ? '#FADBD8' : 'transparent',
          color: isSelected ? 'white' : '#d9822b',
          fontSize: '12px',
          '&:hover': {
            backgroundColor: isSelected ? '#d9822b' : '#FADBD8',
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: '12px',
        }),
      }}
    />
  )
}

export default ReactSelectTiffin