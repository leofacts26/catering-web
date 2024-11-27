"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CaterInquiries from '@/components/CaterInquiries';
import TiffinInquiries from '@/components/TiffinInquiries';



const page = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabIndicatorColor = value === '1' ? '#c33332' : '#d9822b';

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
                            style: {
                                backgroundColor: tabIndicatorColor
                            }
                        }}>
                            <Tab sx={{
                                width: '50%',
                                color: '#c33332',
                                borderBottom: value === '1' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }} label="Caterers" value="1" />
                            <Tab sx={{
                                width: '50%',
                                color: '#d9822b',
                                borderBottom: value === '2' ? '3px solid #d9822b' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#d9822b',
                                    borderBottom: '3px solid #d9822b'
                                }
                            }} label="Tiffins" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CaterInquiries />
                    </TabPanel>
                    <TabPanel value="2">
                        <TiffinInquiries />
                    </TabPanel>
                </TabContext> */}

                <div className="mt-2">
                <CaterInquiries />
                </div>
                <div className="my-5">
                <TiffinInquiries />
                </div>
            </Box>
        </>
    )
}

export default page