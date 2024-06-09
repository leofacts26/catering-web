import React, { memo, useEffect } from 'react'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetAllSortOrders } from '@/app/features/user/cateringFilterSlice';



const ReactSelectRed = ({ text1, onChange }) => {
  const { isLoading, getAllSortOrders } = useSelector((state) => state.cateringFilter)
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(fetchGetAllSortOrders())
  }, [])

  const options = getAllSortOrders.map((name) => ({ value: name.sort_text, label: name.name }));

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
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
          border: `2px solid ${isFocused ? '#C33332' : '#C33332'}`,
          width: '200px',
          height: '0px',
          fontSize: '12px',
          color: '#C33332',
          '&:hover': {
            border: `2px solid #C33332`,
          },
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: '#C33332',
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          color: '#C33332',
          backgroundColor: '#C33332',
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: '#C33332',
        }),
        option: (baseStyles, { isFocused, isSelected }) => ({
          ...baseStyles,
          backgroundColor: isSelected ? '#C33332' : isFocused ? '#FADBD8' : 'transparent',
          color: isSelected ? 'white' : '#C33332',
          fontSize: '12px',
          '&:hover': {
            backgroundColor: isSelected ? '#C33332' : '#FADBD8',
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

export default memo(ReactSelectRed)