import React, { memo } from 'react'
import Select, { components } from 'react-select';
import SearchIcon from '@mui/icons-material/Search';

const names = [
   {
    id:1,
    name: 'Price Low to High',
    value: 'low_to_high',
   },
   {
    id:2,
    name: 'Price High to Low',
    value: 'hign_to_low',
   },
   {
    id:3,
    name: 'A - Z',
    value: 'a_z',
   },
   {
    id:4,
    name: 'Z - A',
    value: 'z_a',
   },
];



const ReactSelectRed = ({ text1, onChange }) => {
  const options = names.map((name) => ({ value: name.value, label: name.name }));

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