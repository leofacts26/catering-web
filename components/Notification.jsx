"use client"
import * as React from 'react';
import Slide from '@mui/material/Slide';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Notification = () => {
    // dropdown 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <React.Fragment>
                <div style={{ position: 'relative', marginLeft: '10px' }}>
                    <div className="notification-bg"
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <NotificationsNoneIcon className='notification' />
                    </div>

                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                            elevation: 0,
                            style: {
                                zIndex: 9999,
                            },
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="space-between"
                            sx={{ marginBottom: '10px', padding: '30px 20px 10px 20px' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <NotificationsIcon />
                                <h2 className='notification-modal-heading'>Notification</h2>
                            </Stack>
                            <p className='notification-mark'>Mark all as read</p>
                        </Stack>
                        <Divider sx={{ marginBottom: '30px' }} />
                        {[1, 2, 3, 4].map((item, index) => (
                            <div style={{ padding: '10px', width: '400px' }} key={index}>

                                <Stack direction="row" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://mui.com/static/images/avatar/1.jpg"
                                            sx={{ width: 40, height: 40 }}
                                        />
                                        <Stack direction="row" flexDirection="column">
                                            <p className='text-dark notification-name'>Andrew Hernandez</p>
                                            <p className='notification-username'>@username</p>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <p className='notification-date'>Jan. 28th, 4:30pm</p> <span className="notification-red-dot"></span>
                                    </Stack>
                                </Stack>
                                <p className='notification-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum error distinctio eligendi! Dolores iure odio in voluptatibus natus officiis repellendus.</p>
                            </div>
                        ))}

                    </Menu>
                </div>



            </React.Fragment>
        </>
    )
}

export default Notification