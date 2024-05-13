import React from 'react'
import Select, { components } from 'react-select';
import SearchIcon from '@mui/icons-material/Search';

const names = [
  'Price Low to High',
  'Price High to Low',
  'A - Z',
  'Z - A',
];


// const DropdownIndicator = (props) => {
//     return (
//       <components.DropdownIndicator {...props}>
//         <SearchIcon />
//       </components.DropdownIndicator>
//     );
//   };


const ReactSelectTiffin = ({ text1 }) => {
  const options = names.map((name) => ({ value: name, label: name }));
  return (
    <Select
      className='mt-3'
      options={options}
      isSearchable
      // isMulti
      placeholder={text1}
      // components={{ DropdownIndicator }}
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