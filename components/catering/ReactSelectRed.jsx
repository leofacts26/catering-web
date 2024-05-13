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


const ReactSelectRed = ({ text1 }) => {
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

export default ReactSelectRed