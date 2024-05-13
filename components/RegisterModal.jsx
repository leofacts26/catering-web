import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Link from 'next/link'
import InputAdornment from '@mui/material/InputAdornment';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="contained" className='register-btn' onClick={handleClickOpen}>Register</Button> */}
            <Link href="javascript:void(0)" onClick={handleClickOpen} className="nav-link"
            >Signup</Link>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                style={{ zIndex: '9999', borderRadius: '10px' }}
            >
                <div className="register-desktop-modal register-bg">
                    <DialogTitle> <h2 className='text-center catering-register-title'>Caterings & Tiffins</h2> </DialogTitle>
                    <DialogContent style={{background: "transparent"}}>
                        <DialogContentText id="alert-dialog-slide-description" style={{background: "transparent"}}>
                            <h3 className='register-welcome'>Welcome</h3>
                            <p className='mb-4 register-para'>Login for a seamless experience</p>
                            <TextField
                                id="filled-basic"
                                // label="+91 | Mobile Number"
                                placeholder='Mobile Number'
                                variant="filled"
                                className='register-input-bg'
                                sx={{
                                    width: '100%',
                                    borderBottom: '1px solid #fff',
                                    '& input': {
                                        color: 'white',
                                        '&::placeholder': {
                                            color: 'white'
                                        }
                                    }
                                }}
                                InputLabelProps={{
                                    style: { color: '#ffffff' },
                                }}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start" style={{color: '#ffffff'}}>
                                            +91
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <Stack direction="row" justifyContent='center'>
                        <Button variant="contained" className='login-otp'>Register</Button>
                    </Stack>
                    <p className="text-center text-white cursor-pointer reg-later" onClick={handleClose}>Maybe Later</p>
                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default RegisterModal