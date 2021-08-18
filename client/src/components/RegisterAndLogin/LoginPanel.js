import {
    Grid,
    Backdrop,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { useStyles } from './styles';
import useForm from '../../utils/useForm';
import { Fragment, useEffect } from 'react';
import ReTextField from '../ReTextField';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validateInfo from './validateInfo';
import { useSelector, useDispatch } from 'react-redux'
import {
    authActions, authSelector
} from '../../store/features/auth/authSlice';

const LoginPanel = () => {
    const classes = useStyles();
    const { logging, isLoggedIn, isError, errorMessage } = useSelector(
        authSelector
    );
    const initValues = {
        email: '',
        password: '',
    }

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(authActions.login({
            Email: values.email,
            Password: values.password,
        }))
    }

    /*const handleLogin = () => {
        setLoading(true);
        authService.login({
            Email: values.email,
            Password: values.password,
        }).then((response) => {
            setLoading(false);
            history.goBack();
        }).catch(error => {
            setLoading(false);
            const splitted = error.message.toString().split('-');
            setErrors({ ...errors, [splitted[0]]: splitted[1] })
        }
        );
    }*/


    const {
        handleChange,
        values,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleLogin);

    useEffect(() => {
        console.log('efff');
        if (isLoggedIn) {
            dispatch(authActions.clearState())
        }
        if (isError) {
            const [type, message] = errorMessage.split('-');
            setErrors({ ...errors, [type]: message })
            dispatch(authActions.clearState())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, isError])

    return (
        <Fragment>
            <Grid
                container
                spacing={3}
                alignItems='center'
                className={classes.registerRoot}
            >
                <form onSubmit={handleSubmit}>
                    <Grid
                        item
                        xs={12}
                        className={classes.registerForm}
                    >
                        <Button
                            startIcon={<MailOutlineRoundedIcon />}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Continue with google
                        </Button>

                        <ReTextField
                            name='email'
                            label='Email'
                            placeholder="name@mail.com"
                            startIcon={<MailOutlineRoundedIcon />}
                            value={values.email}
                            onChange={handleChange('email')}
                            error={errors.email}
                            type='email'
                        />

                        <ReTextField
                            name='password'
                            label='Password'
                            placeholder='Enter your password'
                            startIcon={<LockOutlinedIcon />}
                            value={values.password}
                            onChange={handleChange('password')}
                            error={errors.password}
                            type='password'
                        />
                        <Button
                            className={classes.forgetButton}
                            color='primary'
                        >
                            Forget password?</Button>
                        <Button
                            variant='outlined'
                            color='primary'
                            size='large'
                            fullWidth
                            type='submit'
                        >
                            Login
                        </Button>

                    </Grid>
                </form>

            </Grid >
            <Backdrop className={classes.backdrop} open={logging}>
                <CircularProgress color='primary' />
            </Backdrop>
        </Fragment >
    )
};

export default LoginPanel;