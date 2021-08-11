import {
    Grid,
    Backdrop,
    Button,
    CircularProgress,
} from '@material-ui/core'
import authService from '../../services/auth.service';
import { useStyles } from './styles';
import useForm from '../../utils/useForm';
import { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import ReTextField from '../ReTextField/ReTextField.jsx';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validateInfo from './validateInfo';

const LoginPanel = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const initValues = {
        email: '',
        password: '',
    }
    const history = useHistory();

    const handleLogin = () => {
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
    }

    const {
        handleChange,
        values,
        errors,
        setErrors,
        handleSubmit,
    } = useForm(initValues, true, validateInfo, handleLogin);

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
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color='primary' />
            </Backdrop>
        </Fragment >
    )
};

export default LoginPanel;