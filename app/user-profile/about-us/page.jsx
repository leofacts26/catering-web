"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

const Page = () => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue.toString());
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={parseInt(value, 10)}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#c33332"
                            }
                        }}
                    >
                        <Tab
                            label="About"
                            value="0"
                            sx={{
                                borderBottom: value === '0' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Privacy Policy"
                            value="1"
                            sx={{
                                borderBottom: value === '1' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Security Policy"
                            value="2"
                            sx={{
                                borderBottom: value === '2' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Terms & Conditions"
                            value="3"
                            sx={{
                                borderBottom: value === '3' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                        <Tab
                            label="Disclaimer"
                            value="4"
                            sx={{
                                borderBottom: value === '4' ? '3px solid #c33332' : '3px solid transparent',
                                '&.Mui-selected': {
                                    color: '#c33332',
                                    borderBottom: '3px solid #c33332'
                                }
                            }}
                        />
                    </Tabs>
                </Box>
                <TabPanel value="0">
                    <p className='about-para'>About Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                    <p className='about-para mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                </TabPanel>
                <TabPanel value="1">
                    <p className='about-para'>Privacy Policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                    <p className='about-para mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                </TabPanel>
                <TabPanel value="2">
                    <p className='about-para'>Security Policy Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                    <p className='about-para mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                </TabPanel>
                <TabPanel value="3">
                    <p className='about-para'>Terms & Conditions Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                    <p className='about-para mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                </TabPanel>
                <TabPanel value="4">
                    <p className='about-para'> Disclaimer Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                    <p className='about-para mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dicta saepe quaerat accusamus quis non aspernatur impedit eius nulla molestias voluptate veritatis, blanditiis nihil, pariatur rem cumque aperiam cupiditate quasi!</p>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Page;
