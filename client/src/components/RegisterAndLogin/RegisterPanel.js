import { useState, Fragment } from 'react';
import useForm from '../../utils/useForm';
import authService from '../../services/auth.service';
import {
    Grid,
    Button,
    CircularProgress,
    Backdrop,
} from '@material-ui/core';

import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './styles';
import validateInfo from './validateInfo';
import { SuccessForm } from './ConfirmSignup';
import ReTextField from '../ReTextField/ReTextField.jsx';




const RegisterPanel = ({ value, index }) => {
    const classes = useStyles();
    const initValues = {
        email: '',
        name: '',
        password: '',
    }
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = () => {
        setIsPending(true);
        authService.register({
            Email: values.email,
            Name: values.name,
            Password: values.password
        }).then(response => {
            setIsPending(false);
            setSuccess(true);
        }).catch(error => {
            setIsPending(false);
            setErrors({ ...errors, email: error.message });
        }
        );
    }

    const {
        handleChange,
        values,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleRegister);

    return (
        <Fragment>
            <Grid
                container
                spacing={3}
                alignItems='center'
                className={classes.registerRoot}
            >
                {success
                    ? <SuccessForm />
                    : <form onSubmit={handleSubmit}>
                        <Grid
                            item
                            xs={12}
                            className={classes.registerForm}
                        >
                            <Button
                                startIcon={<MailOutlineRoundedIcon />}
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                Continue with google
                            </Button>
                            <ReTextField
                                name='email'
                                label="Email"
                                placeholder="email@email.com"
                                value={values.email}
                                onChange={handleChange('email')}
                                error={errors.email}
                                startIcon={<MailOutlineRoundedIcon />}
                                type='email'
                            />
                            <ReTextField
                                name='name'
                                label="Full name"
                                placeholder="Enter your full name"
                                value={values.name}
                                onChange={handleChange('name')}
                                error={errors.name}
                                startIcon={<PermIdentityRoundedIcon />}
                            />
                            <ReTextField
                                name='password'
                                label="Password"
                                placeholder="Create password"
                                value={values.password}
                                onChange={handleChange('password')}
                                error={errors.password}
                                startIcon={<LockOutlinedIcon />}
                                type='password'
                            />

                            <Button
                                variant="outlined"
                                color="primary"
                                size='large'
                                fullWidth
                                disabled={isPending}
                                type='submit'
                            >
                                Register
                            </Button>

                        </Grid>
                    </form>}

            </Grid >
            <Backdrop className={classes.backdrop} open={isPending}>
                <CircularProgress color='primary' />
            </Backdrop>
        </Fragment>
    )
};

export default RegisterPanel;