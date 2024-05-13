import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import MyLocationIcon from '@mui/icons-material/MyLocation';


const CssOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    '& fieldset': {
        border: '2px solid #C33332',
        width: '100%',
        borderRadius: '10px'
    },
    '&:hover fieldset': {
        border: '2px solid #C33332',
        
    },
    '&.Mui-focused fieldset': {
        border: '2px solid #C33332',
        
    },
    '& input': {
        fontSize: '16px',
        padding: '15px 20px',
        
    },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
                zIndex: 9999
    };
}

export default function SearchLocation() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={personName}
                    onChange={handleChange}
                    input={<CssOutlinedInput />}
                    MenuProps={MenuProps}
                    InputProps={{
                        style: {
                            backgroundColor: '#f4f4fc6b',
                            borderRadius: '50px'
                        },
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                onClick={() => console.log('Adornment clicked')}
                            >
                                <MyLocationIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}