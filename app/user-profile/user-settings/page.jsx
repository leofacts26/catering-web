"use client"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link'
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Select, { components } from 'react-select';

const names = [
    'English',
    'Tamil',
    'Kannada',
    'Malayalam',
    'Hindi',
    'Telugu'
];

const ReactSelect = ({ text1 }) => {
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
                    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                    borderRadius: '8px',
                    padding: '5px 0px',
                    border: `2px solid ${isFocused ? 'rgba(27, 31, 35, 0.15)' : 'rgba(27, 31, 35, 0.15)'}`,
                    width: '300px',
                    color: '#FFFFFF',
                    '&:hover': {
                        border: `2px solid rgba(27, 31, 35, 0.15)`,
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
                    '&:hover': {
                        backgroundColor: isSelected ? '#C33332' : '#FADBD8',
                    },
                }),
            }}
        />
    )
}


const page = () => {
    return (
        <>
            <h2 className="user-profile-title" style={{ marginTop: '30px', fontSize: '22px' }}>Settings</h2>

            <div className="">
                <h2 className="user-profile-title">Change Language</h2>
                <ReactSelect />
            </div>
            <div className="" style={{ marginTop: '50px' }}>
                <h2 className="user-profile-title">Change Theme Color</h2>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" style={{ textTransform: 'capitalize', backgroundColor: '#000000', padding: '5px 25px', borderRadius: '8px' }}>
                        <Brightness2Icon className='mode-icon' /> <span className='mode-font'>Dark</span> </Button>
                    <Button variant="contained" style={{ textTransform: 'capitalize', backgroundColor: '#FFFFFF', padding: '5px 25px', color: '#000000', borderRadius: '8px' }}> <WbSunnyIcon className='mode-icon' /> <span className='mode-font'>Light</span> </Button>
                </Stack>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2 className="user-settings-title">About</h2>

                <ul className='settings-links'>
                    <li> <Link href="/" className='text-decoration-none'>Privacy Policy</Link></li>
                    <li> <Link href="/" className='text-decoration-none'>Terms and Conditions</Link></li>
                    <li> <Link href="/" className='text-decoration-none'> {`[Version Details]`} </Link></li>
                </ul>
            </div>
        </>
    )
}

export default page