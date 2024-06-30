"use client"
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import AllowLocation from '@/components/AllowLocation';


const label = { inputProps: { 'aria-label': 'Color switch demo' } };


const page = () => {




  return (
    <>
      <h2 className="user-profile-title" style={{ marginTop: '30px' }}>Notification Settings</h2>

      <Stack direction="row" justifyContent="space-between" alignItems="center" className='notification-width' style={{ marginBottom: '20px' }}>
        <p className='notification-font'>Disable All Notification</p>
        <Switch
          defaultChecked
          color="warning"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#D9822B',
            },
            '& .Mui-checked': {
              color: '#D9822B',
            },
            '& .MuiSwitch-thumb': {
              color: '#D9822B',
            },
          }}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" className='notification-width' style={{ marginBottom: '20px' }}>
        <p className='notification-font'>Disable Push Notification</p>
        <Switch
          defaultChecked
          color="warning"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#D9822B',
            },
            '& .Mui-checked': {
              color: '#D9822B',
            },
            '& .MuiSwitch-thumb': {
              color: '#D9822B',
            },
          }}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" className='notification-width' style={{ marginBottom: '20px' }}>
        <p className='notification-font'>Enable Caterers Notification</p>
        <Switch
          color="warning"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#D9822B',
            },
            '& .Mui-checked': {
              color: '#D9822B',
            },
            '& .MuiSwitch-thumb': {
              color: '#D9822B',
            },
          }}
        />
      </Stack>


      <Stack direction="row" justifyContent="space-between" alignItems="center" className='notification-width' style={{ marginBottom: '20px' }}>
        <p className='notification-font'>Enable Tiffin Providers Notification</p>
        <Switch
          color="warning"
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#D9822B',
            },
            '& .Mui-checked': {
              color: '#D9822B',
            },
            '& .MuiSwitch-thumb': {
              color: '#D9822B',
            },
          }}
        />
      </Stack>


      <AllowLocation />


    </>
  )
}

export default page